import React, { lazy, Suspense } from "react";
import Header from "./Components/Header/Header";
import Notificationbox from "./Components/Notificationbox";
import Sidebar from "./Components/Sidebar/Sidebar";
// const Header= lazy(() => import('./Components/Header/Header'));
// const Sidebar= lazy(() => import('./Components/Sidebar/Sidebar'));
// const Notificationbox= lazy(() => import('./Components/Notificationbox'));
const AddEmployeemaster = lazy(() =>
  import("./Components/EmployeeMaster/AddEmployeemaster")
);
const Dashboardpage = lazy(() => import("./Pages/Dashboardpage"));
const AddPostmaster = lazy(() => import("./Pages/AddPostmaster"));
const Employeetypepage = lazy(() => import("./Pages/Employeetypepage"));
const Departmentpage = lazy(() => import("./Pages/Departmentpage"));
const Unitpage = lazy(() => import("./Pages/Unitpage"));
const Designationpage = lazy(() => import("./Pages/Designationpage"));
const Bankmasterpage = lazy(() => import("./Pages/Bankmasterpage"));
const Bankaccountpage = lazy(() => import("./Pages/Bankaccountpage"));
const Salarycreationpage = lazy(() => import("./Pages/Salarycreationpage"));
const Purposepage = lazy(() => import("./Pages/Purposepage"));
const Typepage = lazy(() => import("./Pages/Typepage"));
const Operationalpage = lazy(() => import("./Pages/Operationalpage"));
const Accounttypepage = lazy(() => import("./Pages/Accounttypepage"));
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {selectAuth} from "./Store/AuthSlice";
import AdminLogin from "./Components/Admin/AdminLogin";
import AddAdmin from "./SuperAdmin/AddAdmin";
const SuperDashboard = lazy(() => import("./SuperAdmin/SuperDashboard"));
const Login = lazy(() => import("./SuperAdmin/Login"));
const Bankreport = lazy(() => import("./Components/Report/Bankreport"));
const Salaryreport = lazy(() => import("./Components/Report/Salaryreport"));
const Esi = lazy(() => import("./Components/Report/Esi"));
const Salarybill = lazy(() => import("./Components/Salary Bill/Salarybill"));
const AddCompany = lazy(() => import("./Components/CompanyMaster/AddCompany"));
const Salaryview = lazy(() => import("./Components/Salary Bill/Salaryview"));
const SalaryvoucherPrint = lazy(() =>
  import("./Components/Salary Bill/Salaryview")
);
const Pf = lazy(() => import("./Components/Report/Pf"));

const App = () => {
  const { token, isLoggedIn } = useSelector(selectAuth);
  console.log(token, "tockewn");

  const {admintoken} = useSelector((state)=>state.admin)

  return (
  
    <>
      <Router>
        <div className="main-wrapper">

        {token || admintoken ? (
            <>
              <Header />
              <Sidebar />
            </>
          ) : null}

          
          <div className="page-wrapper">
            <div className="content">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={admintoken?<Dashboardpage />:<Navigate to={"/admin-login"}/>} />
                  <Route path="/admin-login" element={<AdminLogin/>} />
                  <Route path="/company-master" element={admintoken?<AddCompany />:<Navigate to={"/admin-login"}/>} />
                  <Route
                    path="/employee-master"
                    element={admintoken?<AddEmployeemaster />:<Navigate to={"/admin-login"}/>}
                  />
                  <Route path="/add-post-master" element={<AddPostmaster />} />
                  <Route
                    path="/add-employeetype"
                    element={admintoken?<Employeetypepage />:<Navigate to={"/admin-login"}/>}
                  />
                  <Route path="/add-Department" element={admintoken?<Departmentpage />:<Navigate to={"/admin-login"}/>} />
                  <Route path="/add-unit" element={admintoken?<Unitpage />:<Navigate to={"/admin-login"}/>} />
                  <Route
                    path="/add-Designation"
                    element={admintoken?<Designationpage />:<Navigate to={"/admin-login"}/>}
                  />
                  <Route path="/add-Bank-master" element={admintoken?<Bankmasterpage />:<Navigate to={"/admin-login"}/>} />
                  <Route
                    path="/add-Bankaccount-master"
                    element={admintoken?<Bankaccountpage />:<Navigate to={"/admin-login"}/>}
                  />
                  <Route
                    path="/add-salary-master"
                    element={admintoken?<Salarycreationpage />:<Navigate to={"/admin-login"}/>}
                  />
                  <Route path="/add-purpose" element={admintoken?<Purposepage />:<Navigate to={"/admin-login"}/>} />
                  <Route path="/add-Type" element={admintoken?<Typepage />:<Navigate to={"/admin-login"}/>} />
                  <Route
                    path="/add-operationalType"
                    element={admintoken?<Operationalpage />:<Navigate to={"/admin-login"}/>}
                  />
                  <Route
                    path="/add-accounttype"
                    element={admintoken?<Accounttypepage />:<Navigate to={"/admin-login"}/>}
                  />
                  <Route path="/salary-bill" element={admintoken?<Salarybill />:<Navigate to={"/admin-login"}/>} />
                  <Route path="/salary" element={admintoken?<Salaryview />:<Navigate to={"/admin-login"}/>} />
                  <Route
                    path="/salary-voucher"
                    element={admintoken?<SalaryvoucherPrint />:<Navigate to={"/admin-login"}/>}
                  />
                  <Route path="/pf-report" element={admintoken?<Pf />:<Navigate to={"/admin-login"}/>} />
                  <Route path="/esi-report" element={admintoken?<Esi />:<Navigate to={"/admin-login"}/>} />
                  <Route path="/salary-report" element={admintoken?<Salaryreport />:<Navigate to={"/admin-login"}/>} />
                  <Route path="/bank-report" element={admintoken?<Bankreport />:<Navigate to={"/admin-login"}/>} />

                  <Route
              path="/superadmin-login"
              element={token ? <Navigate to={"/superadmin"} /> : <Login />}
                  />
          <Route
              path="/superadmin"
              element={
                token ? (
                  <SuperDashboard />
                ) : (
                  <Navigate to={"/superadmin-login"} />
                )
              }
            />
              <Route
              path="/add-admin"
              element={
                token == null ? (
                  <Navigate to={"/superadmin-login"} />
                 
                ) : (
                  <AddAdmin />
                )
              }
            />
                </Routes>
              </Suspense>
            </div>
            <Notificationbox />
          </div>
        </div>

        <div className="sidebar-overlay" data-reff=""></div>
      </Router>
    
    </>
  );
};

export default App;
