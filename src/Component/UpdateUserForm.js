import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../Service/userService';

const UpdateUserForm = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        getUserById(id).then(response => {
            setUser(response.data);
        }).catch(error => {
            console.error("There was an error fetching the user details!", error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(id, user)
            .then(response => {
                console.log("User updated successfully", response.data);
                navigate('/users'); // Redirect to user list page or any other page
            })
            .catch(error => {
                console.error("There was an error updating the user!", error);
            });
    };

    return (
        <div className="container">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" className="form-control" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" className="form-control" name="address" value={user.address} onChange={handleChange} required />
                </div><br></br>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default UpdateUserForm;
