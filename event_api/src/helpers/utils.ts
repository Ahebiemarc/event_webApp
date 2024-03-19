import crypto from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY


export const hashedPwd = (salt: string, password: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(password + salt + SECRET_KEY);
  return hash.digest('hex');
};

export const random = () => crypto.randomBytes(128).toString('base64');