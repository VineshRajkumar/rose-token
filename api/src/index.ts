import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

require('dotenv').config();




const app = express();
const server = http.createServer(app);
const PORT = 3000 ;

app.use(cookieParser()); 

app.use("/",authRoutes);
app.use("/", userRoutes);


server.listen(PORT,()=>{
     console.log(`🚀 Server running at http://localhost:${PORT}`);
});