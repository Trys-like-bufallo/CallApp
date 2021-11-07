import express from 'express';
import middleWare from './Interface/midleWare.js';
import route from './Interface/route.js';
import connectMongoDB from './MongoDB/connect.js';


const app = express();
const PORT = process.env.PORT || 4000;

middleWare(app);
route(app);
connectMongoDB();

app.listen(PORT);