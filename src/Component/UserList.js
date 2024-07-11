import React, { useEffect, useState } from 'react';
import { listUsers,deleteUser } from '../Service/userService'; // Adjusted import path
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
const UserList = () => {
    const [users, setUsers] = useState([]);

    const BASE_URL = "http://localhost:3000/users/";
    const navigate = useNavigate();
    useEffect(() => {
        // Fetching users data from userService
        listUsers()
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []); // Empty dependency array to run once on component mount
    console.log(users)

    const handleDelete = (userId) => {
        deleteUser(userId)
            .then(() => {
                setUsers(users.filter(user => user.userId !== userId));
            })
            .catch(error => {
                console.error("There was an error deleting the user!", error);
            });
    };
    
    const handleUpdate = (userId) => {
        navigate(`/update-user/${userId}`); // Navigate to update user page with userId
    }; 

    return (
        <div className='container'>
           <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', padding: '10px', color: '#333' }}>List of Users</h2>

            <button className="btn btn-primary mb-2" onClick={() => navigate('/add-user')}>
                Add User
            </button><br></br>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>View Details</th>
                        <th>Update User</th>
                        <th>Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => ( 
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.address}</td>
                            <td><a className='btn btn-success' href={ BASE_URL + `${user.userId}`}>View</a></td>
                            <td><button className='btn btn-primary' onClick={() => handleUpdate(user.userId)}>Update</button></td>
                            <td><a className='btn btn-danger' onClick={() => handleDelete(user.userId)}>Delete</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
