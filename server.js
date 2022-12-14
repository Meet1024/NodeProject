const express = require('express');
const app = express();
const path = require('path');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');




// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// â€˜content-type: application/x-www-form-urlencodedâ€™
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

app.use(cookieParser())
//serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'))

//app.use('/subdir', require('./routes/subdir'))


app.use('/register', require('./routes/register'))

// Route handlers
//auth
app.use('/login', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))

app.use(verifyJWT)

app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));