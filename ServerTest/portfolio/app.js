require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// Routes
const indexRouter = require('./routes/workRoutes');
const indexRouter2 = require('./routes/aboutRoutes')
const indexRouter3 = require('./routes/homeRoutes')
const indexRouter4 = require('./routes/contactMailRoutes')
const workRoutes = require('./routes/workRoutes')
const aboutRoutes = require('./routes/aboutRoutes')
const homeRoutes = require('./routes/homeRoutes')
const contactMailRouter = require('./routes/contactMailRoutes')



const app = express();

const mongoose = require('mongoose')

 // Email
 app.use('/email', require('./routes/contactMailRoutes')); // Defina suas rotas aqui

 // A porra do favico.ico
 app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', indexRouter2)
app.use('/', indexRouter3)
app.use('/', indexRouter4)
app.use('/work', workRoutes);
app.use('/about', aboutRoutes)
app.use('/home', homeRoutes)
app.use('/email', contactMailRouter)

// Arrumando back e front através do cors
const cors = require('cors')
app.use(cors({
  origin: '*'
}));

// Mongo
mongoose.connect(process.env.ATLAS_URI || 'mongodb+srv://erickRS:Beginningisnear1@portfolio.eglq0un.mongodb.net/', {}).
then(()=>{console.log("Server is running on mongo");})
.catch((err)=>{console.error("Error on mongo server", err)})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Capturar solicitações 


app.listen(process.env.PORT, ()=>{console.log(`Server running on port 8000`);})

module.exports = app;
