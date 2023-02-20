require('./db');
require('./schemas/Profile');
const express = require ('express');
const bodyParser = require('body-parser')
const port = 3000;
const app = express();
const profileRoutes = require('./routes/profileRoutes');
//app.use(bodyParser.urlencoded({
   // extended: true
//}));
app.use(bodyParser.json());

app.use(profileRoutes);

//requireToken skipped

app.get('/', (req, res)=>{
    res.send("hello3s world");
})

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
})