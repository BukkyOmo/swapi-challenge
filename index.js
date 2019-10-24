import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
dotenv.config();

const port = 3000 || process.env.PORT;

app.get('/', (request, response) => {
    response.send('Hello Swapi')
});

app.all('*', (request, response) => {
    response.status(404).json({
		status: 404,
		error: 'The route you are trying to access does not exist'
	});
})

app.listen(port, () => {
    console.log(`Application running on port ${port}`)
});