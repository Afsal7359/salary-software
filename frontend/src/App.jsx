import React,{lazy,Suspense } from 'react';
import Header from './Components/Header/Header';
import Notificationbox from './Components/Notificationbox';
import Sidebar from './Components/Sidebar/Sidebar';
const AddEmployeemaster = lazy(() => import('./Components/EmployeeMaster/AddEmployeemaster'));
const Dashboardpage = lazy(() => import('./Pages/Dashboardpage'));
const AddPostmaster = lazy(() => import('./Pages/AddPostmaster'));
const Employeetypepage = lazy(() => import('./Pages/Employeetypepage'));
const Departmentpage = lazy(() => import('./Pages/Departmentpage'));
const Unitpage = lazy(() => import('./Pages/Unitpage'));
const Designationpage = lazy(() => import('./Pages/Designationpage'));
const Bankmasterpage = lazy(() => import('./Pages/Bankmasterpage'));
const Bankaccountpage = lazy(() => import('./Pages/Bankaccountpage'));
const Salarycreationpage = lazy(() => import('./Pages/Salarycreationpage'));
const Purposepage = lazy(() => import('./Pages/Purposepage'));
const Typepage = lazy(() => import('./Pages/Typepage'));
const Operationalpage = lazy(() => import('./Pages/Operationalpage'));
const Accounttypepage = lazy(() => import('./Pages/Accounttypepage'));
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
const App = () => {
  return (
        <Router>
      
    <div className="main-wrapper">
       <Header/>
       <Sidebar/>
       <div className="page-wrapper">
       <div className="content">
       <Suspense fallback={<div>Loading...</div>}>
       <Routes>
       <Route path="/" element={<Dashboardpage/>} />
       <Route path="/add-employee-master" element={<AddEmployeemaster/>} />
       <Route path="/add-post-master" element={<AddPostmaster/>} />
       <Route path="/add-employeetype" element={<Employeetypepage/>} />
       <Route path="/add-Department" element={<Departmentpage/>} />
       <Route path="/add-unit" element={<Unitpage/>} />
       <Route path="/add-Designation" element={<Designationpage/>} />
       <Route path="/add-Bank-master" element={<Bankmasterpage/>} />
       <Route path="/add-Bankaccount-master" element={<Bankaccountpage/>} />
       <Route path="/add-salary-master" element={<Salarycreationpage/>} />
       <Route path="/add-purpose" element={<Purposepage/>} />
       <Route path="/add-Type" element={<Typepage/>} />
       <Route path="/add-operationalType" element={<Operationalpage/>} />
       <Route path="/add-accounttype" element={<Accounttypepage/>} />
       </Routes>
       </Suspense>
       </div>
      <Notificationbox/>
      </div>
    </div>
    <div className="sidebar-overlay" data-reff=""></div>
  
    </Router>
  );
};

export default App;


