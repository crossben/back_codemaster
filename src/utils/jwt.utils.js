import crypto from 'crypto';

export const generateJwtSecret = () => {
    console.log(crypto.randomBytes(64).toString('hex'));
};

generateJwtSecret();
