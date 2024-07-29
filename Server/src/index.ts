import express from "express"
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'
import router from "./routes/router";

dotenv.config();

const app=express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb_uri';

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to Database ');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

 app.get('/' , (req , res)=>{
  res.send("its working")
 }) 
app.use(router);

app.listen(PORT , ()=>{
    console.log(`server is live at ${PORT}`)
})