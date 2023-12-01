const express = require('express');
const app = express();
const cors =require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose');

const  UserRouters = require('./routes/userRouter');
const  EmployeeTypeRouter = require('./routes/EmployeetypeRouter');
const  DepartmentRouter = require('./routes/DepartmentRouter');
const  UnitRouter = require('./routes/UnitRouter');
const  DesignationRouter = require('./routes/DesignationRouter');
const  PurposeRouter = require('./routes/PurposeRouter');
const  TypeRouter = require('./routes/TypeRoter');
const  OperationalTypeRouter = require('./routes/OperationaltypeRouter');
const  AccountTypeRouter = require('./routes/AccountTypeRouter');
const  PostRouter = require('./routes/PostRouter');
const  BankRouter = require('./routes/BankRouter');
const salary = require('./routes/SalarymasterRouter');
const employeeRouters = require('./routes/EmployeeRouter')
const BankaccountRouter = require('./routes/BankaccountRouter')
const SalaryBill = require('./routes/SalaryBill');
const CompanyRouter = require('./routes/Company');

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
app.use('/api/employeetype',EmployeeTypeRouter)
app.use('/api/Department',DepartmentRouter)
app.use('/api/Unit',UnitRouter)
app.use('/api/Designation',DesignationRouter)
app.use('/api/purpose',PurposeRouter)
app.use('/api/Type',TypeRouter)
app.use('/api/operatonaltype',OperationalTypeRouter)
app.use('/api/accounttype',AccountTypeRouter)
app.use('/api/post',PostRouter)
app.use('/api/bank',BankRouter)
app.use('/api/salary',salary)
app.use('/api/employee',employeeRouters)
app.use('/api/BankAccount',BankaccountRouter)
app.use('/api/salarybill',SalaryBill)
app.use('/api/company',CompanyRouter);






mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected");
    }).catch((error)=>{
      console.log(`database connection error${error}`);
    })
 
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });