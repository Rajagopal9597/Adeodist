import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//import db from './config/db';
import SignInRouter from './routes/signin';
//import FeedRouter from './user/feed';
//import AdminRouter from './user/update';


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/user', SignInRouter);
//app.use('/feed', FeedRouter);
//app.use("/admin",AdminRouter)

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
