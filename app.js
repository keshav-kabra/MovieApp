const express = require('express');
const request = require('request')
const app = express()

// ejs -> embeded javascript --middleware and a templating engine
app.set('view engine', "ejs");


/*
Routing 
*/
app.get('/', (req, res)=>{
    res.render('home');
});



app.get('/result', (req,res)=>{
    // res.send('The movie to search is ' + req.query.movieName);
    const url = `http://www.omdbapi.com/?apikey=cfd672ef&s=${req.query.movieName}`;
    request(url , (err , response , body)=>{
        if(!err && res.statusCode === 200)
        {
            const data = JSON.parse(body)
            // res.send(data);
            res.render('result', {movieDump:data});
        }
        else {
            res.send('Something went Wrong !')
        }
    })

})


app.get('/result/:id', (req, res)=>{
    
    const url = `http://www.omdbapi.com/?apikey=cfd672ef&i=${req.params.id}`;
    request(url , (err , response , body)=>{
        if(!err && res.statusCode === 200)
        {
            const data = JSON.parse(body)
            // res.send(data);
            res.render("detail" , {data : data});
        }
        else {
            res.send('Something went Wrong !')
        }
    })

})


app.get('*', (req, res)=>{
    res.send('Page not Found error 404 !!')
} )

//r
app.listen(3000, ()=>{
        console.log('the server has started')
})

