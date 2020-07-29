import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

app.use(cors(/*{origin: 'http://myapp.com'}*/));
app.use(express.json()); // to it can't use JSON in the body
app.use(routes); // use the routes of the file routes
app.use(errors());

export default app;