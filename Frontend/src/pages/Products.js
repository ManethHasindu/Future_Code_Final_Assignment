
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete('http://localhost:5000/api/products/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <Link to="/add" className="btn btn-success mb-3">Add Product</Link>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Quantity</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.quantity}</td>
              <td>
                <Link className="btn btn-warning btn-sm me-2" to={`/edit/${prod._id}`}>Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(prod._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
