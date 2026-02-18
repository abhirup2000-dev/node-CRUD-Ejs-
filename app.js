const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const rateLimit = require('./app/utils/limiter')

const DatabaseConnect = require('./app/config/dbcon')
DatabaseConnect()

app.use(rateLimit)
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use("uploads", express.static(path.join(__dirname, "/uploads")));
app.use('/uploads', express.static('uploads'));

const employeeEjsRoute = require('./app/routes/employeeEjsRoute')
app.use(employeeEjsRoute)

const joiRouter = require('./app/routes/joiRoute');
app.use(joiRouter)


const Port = 5500
app.listen(Port, ()=>{
  console.log(`server running on http://localhost:${Port}/employee/list`)
})