import React, { useEffect, useState } from 'react';
import { getUserById, deleteProduct } from '../Service/userService';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const GetUserById = () => {
    const { id } = useParams();
    const [userResponse, setUserResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(id)
            .then((response) => {
                console.log("API Response:", response.data); // Log the entire response
                setUserResponse(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the user details!", error);
            });
    }, [id]);

    // Log userResponse to see its structure
    useEffect(() => {
        if (userResponse) {
            console.log("User Response:", userResponse);
        }
    }, [userResponse]);
    
    const handleDeleteProduct = (productId) => {
        deleteProduct(productId)
            .then(() => {
                setUserResponse(prevState => ({
                    ...prevState,
                    productDTOList: prevState.productDTOList.filter(product => product.productId !== productId)
                }));
            })
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });
    };
    
    const handleUpdate = (productId) => {
        navigate(`/update-product/${productId}`); // Navigate to update user page with userId
    };
    

    return (
        <div>
            {userResponse ? (
                <div className='container'>
                    <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', padding: '10px', color: '#333' }}>Product Details of the User</h2><br></br>
                   
                     
                    <div>
                        <label>Products:</label><br></br>
                        {userResponse.productDTOList && userResponse.productDTOList.length > 0 ? (
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Product Brand</th>
                                        <th>Product Category</th>
                                        <th>Product Price</th>
                                        <th>Product Quantity</th>
                                        <th>Update Product</th>
                                        <th>Delete Product</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userResponse.productDTOList.map(product => (
                                        <tr key={product.productId}>
                                            <td>{product.productId}</td>
                                            <td>{product.productName}</td>
                                            <td>{product.productBrand}</td>
                                            <td>{product.productCategory}</td>
                                            <td>{product.productPrice}</td>
                                            <td>{product.productQuantity}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
                                            </td>
                                            <td><button className='btn btn-primary' onClick={() => handleUpdate(product.productId)}>Update</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No products found for this user.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default GetUserById;
