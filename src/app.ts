
import express,{Express,Response, Request} from 'express'
import helmet from 'helmet';
import dotenv from 'dotenv';
import MetricsController from './metrics.controller';
import {swaggerDocs} from './swaggerdocs'
import swaggerUI from 'swagger-ui-express'
import swaggerJsdoc  from "swagger-jsdoc"



dotenv.config();


const app: Express = express();

const specs = swaggerJsdoc(swaggerDocs);

app.use(helmet());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

const metricsController = new MetricsController()

app.post('/data',metricsController.saveData);


app.get('/data', metricsController.getData);
app.get('/', (req:Request, res:Response) => res.json({message: `Powerxai metrics server version 1. Visit 'http://localhost:3000/api-docs' to view open api docs and endpoints`}));


export default app;

