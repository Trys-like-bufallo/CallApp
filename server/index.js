import express from 'express';
import middleWare from './Interface/midleWare.js';
import route from './Interface/route.js';
import connectMongoDB from './MongoDB/connect.js';
import socket from './Interface/socket.js';


const app = express();
const PORT = process.env.PORT || 4000;

socket(app, PORT);
middleWare(app);
route(app);
connectMongoDB();