import express, { Application } from 'express';
import router from './routes/routes';
import path from 'path';
import MongoClient from 'mongoose';
import bodyParser from 'body-parser';

const port: number = 8000;
// Create new application
const app: Application = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Require static assets from public folder
app.use(express.static('public'))
// Set 'views' directory for any views 
// being rendered res.render()
app.set('views/', path.join(__dirname, 'views'));

MongoClient.connect("mongodb://127.0.0.1:27017/Liberamente")
  .then(() => {
    console.log("Connected to Database");
})

// Middleware per il parsing del corpo delle richieste in formato JSON
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.disable('x-powered-by');

// Routing
app.use('/',router);

app.listen(port, () => {
    console.log(`App is listening on port ${port} !`)
});