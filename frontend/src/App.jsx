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
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Salarycreationpage from './Pages/Salarycreationpage';
import Purposepage from './Pages/Purposepage';
import Typepage from './Pages/Typepage';
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


