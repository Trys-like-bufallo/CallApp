import cors from 'cors';
import express from 'express';


const middleWare = (app) => {
    app.use(cors());
    app.use(express.urlencoded({
        extended : true
    }));
    app.use(express.json());
}
export default middleWare;