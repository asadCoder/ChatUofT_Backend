require('./db');
require('./schemas/User');
const bodyParser = require('body-parser');
require('./schemas/Profile');
const express = require ('express');
const authRoutes = require('./routes/authRoutes');
const port = 3002;
const app = express();
const profileRoutes = require('./routes/profileRoutes');

//requireToken skipped

app.use(bodyParser.json());
app.use(authRoutes);
app.use(profileRoutes);

//I dont think we need these, just listen works??
// app.get('/', (req, res)=>{
//     res.send("hello get");
// })

// app.post('/', (req, res)=>{
//     res.send("hello post");
// })


//app.use(bodyParser.urlencoded({
   // extended: true
//}));

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});

