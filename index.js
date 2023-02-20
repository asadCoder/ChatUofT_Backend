require('./db');
require('./schemas/User');
const bodyParser = require('body-parser');
require('./schemas/Profile');
const express = require ('express');
const authRoutes = require('./routes/authRoutes');
const port = 3000;
const app = express();

//requireToken skipped

app.use(bodyParser.json());
app.use(authRoutes);

//I dont think we need these, just listen works??
// app.get('/', (req, res)=>{
//     res.send("hello get");
// })

// app.post('/', (req, res)=>{
//     res.send("hello post");
// })

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
})
();
const profileRoutes = require('./routes/profileRoutes');
//app.use(bodyParser.urlencoded({
   // extended: true
//}));

app.use(profileRoutes);

//requireToken skipped

require('./db')

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
})