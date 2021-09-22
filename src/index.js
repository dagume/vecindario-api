import app from './app';
import '@babel/polyfill';
import config from './config/config';

async function main() {
    await app.listen(config.PORT, '0.0.0.0');
    console.log('Server on port 3000')
};

main();