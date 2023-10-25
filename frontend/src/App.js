
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './customer_handle/loginpage.jsx';
import RegistrationForm from './customer_handle/sgnup.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/customer_login" element={<LoginForm/>} />
        <Route exact path="/customer_signup" element={<RegistrationForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
