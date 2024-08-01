import express from 'express'
import { Router } from './routes';
import bodyParser from 'body-parser';
import cors from "cors"

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use('/api/v1', Router);

app.listen(3000, () => {
    console.log("Listening on 3000");
})