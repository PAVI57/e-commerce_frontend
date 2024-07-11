import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../Service/userService'; // Ensure 'updateProduct' is imported correctly

const UpdateProductForm = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        productId: productId,
        productName: '',
        productBrand: '',
        productCategory: '',
        productPrice: '',
        productQuantity: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            getProductById(productId)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error("Error fetching product details:", error);
                });
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    console.log(productId);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if productId and product are valid
        if (!productId || !product || !product.productName || !product.productBrand || !product.productCategory || !product.productPrice || !product.productQuantity) {
            console.error("Invalid productId or product data.");
            return;
        }
        
        updateProduct(productId, product)
            .then(response => {
                console.log("Product updated successfully", response.data.userId);
                navigate(`/users`); 
            })
            .catch(error => {
                console.error("Error updating product:", error);
                
            });
    };

    return (
        <div className="container">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name:</label>
                    <input type="text" className="form-control" name="productName" value={product.productName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Product Brand:</label>
                    <input type="text" className="form-control" name="productBrand" value={product.productBrand} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Product Category:</label>
                    <input type="text" className="form-control" name="productCategory" value={product.productCategory} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Product Price:</label>
                    <input type="number" className="form-control" name="productPrice" value={product.productPrice} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Product Quantity:</label>
                    <input type="number" className="form-control" name="productQuantity" value={product.productQuantity} onChange={handleChange} required />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default UpdateProductForm;
