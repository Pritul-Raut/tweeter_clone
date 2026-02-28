import crypto from 'crypto';

// The algorithm used for simple, fast encryption
const ALGORITHM = 'aes-256-cbc';

// Helper to reliably get a 32-byte key from environment variables
const getSecretKey = () => {
    // Ideally, provide process.env.ENCRYPTION_KEY in .env.local
    // We fall back to hashing the Supabase Anon Key to ensure the key remains consistent across reloads without crashing
    const secret = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'default-dev-secret-key-12345';
    return crypto.createHash('sha256').update(secret).digest();
};

/**
 * Encrypts a plain text string into a hex format that includes the IV.
 * @param text The string to encrypt
 * @returns iv:encryptedText
 */
export function encryptText(text: string): string {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(ALGORITHM, getSecretKey(), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Store IV along with the encrypted data so we can decrypt it later
    return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts a previously encrypted hash.
 * @param hash The encrypted string in format iv:encryptedText
 * @returns The original plain text
 */
export function decryptText(hash: string): string {
    try {
        const parts = hash.split(':');
        // Fallback for returning raw text if it wasn't encrypted (e.g., old data before encryption was added)
        if (parts.length !== 2) return hash;

        const [ivHex, encryptedHex] = parts;
        const iv = Buffer.from(ivHex, 'hex');

        const decipher = crypto.createDecipheriv(ALGORITHM, getSecretKey(), iv);
        let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        // If decryption fails abruptly, return the original text
        return hash;
    }
}
