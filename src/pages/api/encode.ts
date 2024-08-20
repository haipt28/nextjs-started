import type { NextApiRequest, NextApiResponse } from 'next';

import { ALGORITHM, IV_LENGTH } from '@/constants/crypto';
const crypto = require('crypto-browserify');
// Định nghĩa interface cho ResponseData
interface ResponseData {
    status: string;
    message?: string;
    data?: any;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'POST') {
        const encryptData = (data: any) => {
            const KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY;
            const jsonString = JSON.stringify(data);
            const iv = crypto.randomBytes(IV_LENGTH);
            const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);
            let encrypted = cipher.update(jsonString);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
        };

        try {
            let data: ResponseData = {
                status: 'success',
                message: 'Get encode successfull',
                data: encryptData(req.body),
            };
            res.status(200).json(data);
        } catch (error) {
            let data: ResponseData = {
                status: 'error',
                message: 'Get endcode failed',
                data: error,
            };
            res.status(400).json(data);
        }
    }
}
