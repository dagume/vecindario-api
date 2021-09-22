import express, { json } from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import helmet from 'helmet';

//importing routes
import postRoutes from './routes/posts.routes';

const app = express();

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// settings
app.set('pkg', pkg);

// middleware
app.use(morgan('dev'));
app.use(json());
app.use(helmet());

const os = require("os");
const hostname = os.hostname();

// welcome routes
app.get('/', (req, res) => {
  res.json({
      author: app.get('pkg').author,
      name: app.get('pkg').name,
      description: app.get('pkg').description,
      version: app.get('pkg').version, 
      hostname: hostname
  })
})

// routes
app.use('/api/post', postRoutes);

export default app;