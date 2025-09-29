
// src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://arbaazkhanark23_db_user:NJifbAdwBToMJZd6@cluster0.tnekkhj.mongodb.net/mlsa';

if (!MONGODB_URI) {
  throw new Error(
    '❌ Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Type for global mongoose cache (for hot reload in dev)
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Prevent TypeScript error on global
declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Use existing cache or create new one
const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// 🔌 Connect to MongoDB
async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('🔗 Connecting to MongoDB...');

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('✅ MongoDB connected successfully');

      // ✅ Add event listeners safely after connection
      mongooseInstance.connection.on('connected', () => {
        console.log('✅ Mongoose connected to MongoDB');
      });

      mongooseInstance.connection.on('error', (err) => {
        console.error('❌ Mongoose connection error:', err);
      });

      mongooseInstance.connection.on('disconnected', () => {
        console.log('⚠️ Mongoose disconnected from MongoDB');
      });

      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }

  return cached.conn;
}

// 🧠 Prevent duplicate model registration in development (hot reload fix)
const modelRegistry = new Set<string>();

export function registerModel<T extends mongoose.Document>(
  modelName: string,
  schema: mongoose.Schema<T>
): mongoose.Model<T> {
  if (modelRegistry.has(modelName)) {
    return mongoose.model<T>(modelName);
  }

  if (mongoose.models[modelName]) {
    modelRegistry.add(modelName);
    return mongoose.model<T>(modelName);
  }

  modelRegistry.add(modelName);
  return mongoose.model<T>(modelName, schema);
}

export { connectToDatabase };