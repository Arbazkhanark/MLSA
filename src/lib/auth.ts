import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}


interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: { id: string; email: string; role: string }): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}


export function verifyToken(token: string): JwtPayload {
  try {
    // jwt.verify returns string | object, so cast to JwtPayload
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    throw new AuthError('Invalid or expired token');
  }
}


export function setTokenCookie(token: string): string {
  return `adminToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800; ${
    process.env.NODE_ENV === 'production' ? 'Secure' : ''
  }`;
}

export function clearTokenCookie(): string {
  return `adminToken=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${
    process.env.NODE_ENV === 'production' ? 'Secure' : ''
  }`;
}







