import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserList from './Component/UserList';
import GetUserById from './Component/GetUserById';
import AddUserForm from './Component/AddUserForm';
import UpdateUserForm from './Component/UpdateUserForm'; // Import the new component
import UpdateProductForm from './Component/UpdateProductForm';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<GetUserById />} />
        <Route path='/add-user' element={<AddUserForm />} />
        <Route path='/update-user/:id' element={<UpdateUserForm />} /> 
        <Route path='/update-product/:productId' element={<UpdateProductForm />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
