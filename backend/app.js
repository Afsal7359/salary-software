const express = require('express');
const app = express();
const cors =require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose');

const  UserRouters = require('./routes/userRouter');
const  employeeRouters = require('./routes/EmployeeRouter');
const  DepartmentRouter = require('./routes/DepartmentRouter');
const  UnitRouter = require('./routes/UnitRouter');
const  DesignationRouter = require('./routes/DesignationRouter');
const  PurposeRouter = require('./routes/PurposeRouter');
const  TypeRouter = require('./routes/TypeRoter');
dotenv.config()


const port = process.env.PORT;
app.use(express.json());
const corsOptions = {
  origin: [
      'http://localhost:4111'
  ],
  methods: ['GET', 'POST'],
  preflightContinue: true, 
};

app.use(cors());

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', UserRouters)
app.use('/api/employee',employeeRouters)
app.use('/api/Department',DepartmentRouter)
app.use('/api/Unit',UnitRouter)
app.use('/api/Designation',DesignationRouter)
app.use('/api/purpose',PurposeRouter)
app.use('/api/Type',TypeRouter)










mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected");
    }).catch((error)=>{
      console.log(`database connection error${error}`);
    })
 
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });