import crypto from 'crypto';

export default class UserService {
    public static async encryptAiKey(aiKey: string): Promise<string> {
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(aiKey, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return `${iv.toString('hex')}:${encrypted}`;
    }

    public static async decryptAiKey(encryptedAiKey: string): Promise<string> {
        const algorithm = 'aes-256-cbc';
        const [ivHex, encrypted] = encryptedAiKey.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const key = crypto.randomBytes(32);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}