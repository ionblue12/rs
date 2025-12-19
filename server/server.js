const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
const recipeRouter = require('./routes');

app.use(express.json());
app.use(cors());
app.use('/api', recipeRouter);







app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})