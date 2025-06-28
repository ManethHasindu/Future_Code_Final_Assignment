
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get('http://localhost:5000/api/products/' + id, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }).then(res => {
        setName(res.data.name);
        setPrice(res.data.price);
        setQuantity(res.data.quantity);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, price, quantity };

    if (id) {
      await axios.put('http://localhost:5000/api/products/' + id, product, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
    } else {
      await axios.post('http://localhost:5000/api/products', product, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
    }
    navigate('/products');
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>{id ? 'Edit' : 'Add'} Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" className="form-control" required value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Quantity</label>
          <input type="number" className="form-control" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <button className="btn btn-primary">{id ? 'Update' : 'Add'} Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
