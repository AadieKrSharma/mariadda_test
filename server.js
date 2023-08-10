import express from 'express';
import cors from 'cors';
import connect from './connection/connection.js'
import dotenv from 'dotenv'
import morgan from "morgan";
import router from './router/route.js';


dotenv.config({ path: './.env' });
var app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

app.use('/api', router)

connect().then(() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server connected to http://localhost:${process.env.PORT}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})
