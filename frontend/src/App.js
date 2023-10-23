
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './customer_handle/loginpage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/customer_login" element={<LoginForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
