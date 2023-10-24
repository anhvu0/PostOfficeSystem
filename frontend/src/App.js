import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './customer_handle/loginpage.jsx';
import MainPage from './main_page/mainpage.jsx';
import CustomerMainPage from './main_page/c_mainpage.jsx'
import DataTable from './customer_handle/customer_packages.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/customer_login" element={<LoginForm/>} />
        <Route exact path="/" element={<MainPage/>} />
        <Route exact path="/customer_mainpage" element={<CustomerMainPage/>} />
        <Route exact path="/customer_packages" element={<DataTable/>} />
      </Routes>
    </Router>
  );
}

export default App;
