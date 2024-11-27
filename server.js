const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const users = require('./routes/users');
const port = 3001;

app.use(bodyParser.json())
app.use("/users", users);
app.use((req, res, next) => {
    res.status(404).json({ status: 404 , message: 'Not Found' })
    next();
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({  status: 500 , message: 'Internal Server Error' })
});

app.listen(port, () => console.log(`Server runs on the port number : ${port}`));

