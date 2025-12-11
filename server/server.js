const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) =>{
    res.send("Welcome RS");
});






app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})