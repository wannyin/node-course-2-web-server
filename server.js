const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleware
//without next - won't move forward
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFileSync('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append.');
        }
    });

    console.log(log);
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    //res.send('<h1>hello express</h1>');

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, ()=>{
    console.log('server is up on port 3000.');
});