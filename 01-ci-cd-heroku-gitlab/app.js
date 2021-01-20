/*
 * Module dependencies.
 */
const express = require('express');
 
const app = express();
 
const port = process.env.PORT || 1200;


app.get('/', function (req, res) {
    res.send("Wow! It works!!!! ");
   
});

app.get('/mypage/:id', function (req, res) {
    
    res.send(`welcome ${req.params.id} in my page of simple express application !!!! `);
}); 


const server = app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
 
