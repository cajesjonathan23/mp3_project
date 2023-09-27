import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './pages/Admin';
import Homepage from './pages/Homepage';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Report from './pages/Report';
import Dashboard from './pages/admin/Dashboard';
import Myprofile from './pages/public/Myprofile';
import Updateprofile from './pages/public/Updateprofile';
import Announcementedata from './pages/public/Announcementdata';
import Changepassword from './pages/public/Changepassword';
import Announcement from './pages/admin/Announcement';
import Users from './pages/admin/Users';
import Reportdata from './pages/admin/Reportdata';
import Adminprofile from './pages/admin/Adminprofile';
import Reportdatauser from './pages/public/Reportdatauser';
import Changeadminpassword from './pages/admin/Changeadminpassword';
import Announcementadmindata from './pages/admin/Announcementadmindata';
import Updateprofileadmin from './pages/admin/Updateprofileadmin';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
function App() {
  return (
   <>
      <Router>
          
          <Routes>
              <Route path="/" Component={Welcome}/>
              <Route  path="/CMS/login" Component={Login}/>
              <Route  path="/CMS/register" Component={Register}/>
              <Route path="/CMS/admin/" Component={Admin}/>
              <Route path="/CMS/admin/homepage" Component={Homepage}/>
              <Route path="/CMS/home" Component={Home}/>
              <Route path="/CMS/home/report" Component={Report}/>
              <Route path="/CMS/admin/dashboard" Component={Dashboard}/>
              <Route path="/CMS/home/myprofile" Component={Myprofile}/>
              <Route path="/CMS/home/updateprofile" Component={Updateprofile}/>
              <Route path="/CMS/home/announcementdata" Component={Announcementedata}/>
              <Route path="/CMS/home/changepassword" Component={Changepassword}/>
              <Route path="/CMS/admin/announcement" Component={Announcement}/>
              <Route path="/CMS/admin/users" Component={Users}/>
              <Route path="/CMS/admin/reportdata" Component={Reportdata}/>
              <Route path="/CMS/admin/myprofile" Component={Adminprofile}/>
              <Route path="/CMS/home/reportdatauser" Component={Reportdatauser}/>
              <Route path="/CMS/admin/changepassword" Component={Changeadminpassword}/>
              <Route path="/CMS/admin/announcementadmindata" Component={Announcementadmindata}/>
              <Route path="/CMS/admin/updateprofileadmin" Component={Updateprofileadmin}/>
              <Route path="/CMS/about" Component={About}/>
              <Route path="/CMS/contact" Component={Contact}/>
          </Routes>
      </Router>
   </>
  );
}

export default App;
