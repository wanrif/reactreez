import crypto from 'crypto';

export const encrypt = (data: string, key: string): string => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, key.slice(0, 16));
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

export const decrypt = (data: string, key: string): string => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, key.slice(0, 16));
  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
