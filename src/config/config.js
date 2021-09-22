import { config } from 'dotenv';
config();

export default {
    // server
    PORT: process.env.PORT || 3000,
}