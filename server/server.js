const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
const recipeRouter = require('./routes');
//const {setpassport} = require('./passport');
//const passport = require('passport');
//const session = require('express-session');

/*app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly: true},
}));*/
//app.use(passport.initialize());
//app.use(passport.session());
//setpassport(passport);
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use('/api', recipeRouter);







app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})