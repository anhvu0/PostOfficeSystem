import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './customer_handle/loginpage.jsx';
import RegistrationForm from './customer_handle/sgnup.jsx';
import MainPage from './main_page/mainpage.jsx';
import CustomerMainPage from './main_page/c_mainpage.jsx'
import DataTable from './customer_handle/customer_packages.jsx';
import ELoginForm from './employee_handle/e_loginpage.jsx';
import EmployeeMainPage from './main_page/e_mainpage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/customer_login" element={<LoginForm/>} />
        <Route exact path="/" element={<MainPage/>} />
        <Route exact path="/customer_mainpage" element={<CustomerMainPage/>} />
        <Route exact path="/customer_packages" element={<DataTable/>} />
        <Route exact path="/customer_signup" element={<RegistrationForm/>} />
        <Route exact path="/employee_login" element={<ELoginForm/>} />
        <Route exact path="/employee_mainpage" element={<EmployeeMainPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
