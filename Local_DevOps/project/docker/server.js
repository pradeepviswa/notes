 const express = require('express');
 const app = express();
 const PORT = process.env.PORT || 3000;
 
 app.get('/health', (req, res) => {
   res.status(200).json({ status: 'UP', timestamp: new Date() });
 });
 
 app.get('/', (req, res) => {
   res.send('Hello from Local DevOps Lab App!');
 });
 
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });

