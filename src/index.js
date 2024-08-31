import dotenv from 'dotenv';
import connectDB from './db/connection.db.js';
import app from './app.js';
dotenv.config();
const port = process.env.PORT || 8000;

// Connect to the database
connectDB()
.then(()=>{
  app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
  })
})
.catch((error)=>{console.log(error)})


