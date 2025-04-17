import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    apiBaseUrl: process.env.API_BASE_URL || 'https://restcountries.com/v3.1',
    cacheTTL: parseInt(process.env.CACHE_TTL || '3600', 10),
};