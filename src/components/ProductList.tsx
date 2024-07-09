import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  imageUrl: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.unsplash.com/photos?client_id=JdV0PKx6z7BCkR_w8_iZbXYtYnpbcee-tKKYZMgNjM8')
      .then(response => {
        const productData = response.data.map((item: any) => ({
          id: item.id,
          name: item.alt_description || 'No name',
          price: item.likes*20 ,  // given api has no price field so i pick up the likes count 
          shortDescription: item.description || 'No description',
          imageUrl: item.urls.thumb,
        }));
        setProducts(productData);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-col-4">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover mb-4" />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-700">₹{product.price.toFixed(2)}</p>
              <p className="text-gray-500">{product.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
