const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
const recipeRouter = require('./routes');
const setpassport = require('./passport');
const { requireAuth } = require('./middleware');
const passport = require('passport');
const session = require('express-session');


app.use(express.json());
app.use(cors());
app.use('/api', recipeRouter);







app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})