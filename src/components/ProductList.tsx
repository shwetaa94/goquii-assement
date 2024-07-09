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
    axios.get('https://dummyjson.com/products')
      .then(response => {
        const productData = response.data.products.map((item: any) => ({
          id: item.id,
          name: item.title || 'No name',
          price: item.price ,  
          shortDescription: item.description || 'No description',
          imageUrl: item.thumbnail,
        }));
        setProducts(productData);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 ">
    <div className='flex flex-col justify-between md:flex-row my-6'>
      <h1 className='text-4xl font-bold mb-4 italic font-serif'>Ecommerce store</h1>
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full md:w-[60%] mb-4  p-2 border border-gray-300 rounded"
      />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="h- overflow-hidden bg-white p-6 rounded shadow hover:shadow-lg transition">
              <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover mb-4 bg-gray-100" />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700 my-1 ">₹{product.price}</p>
              <p className="text-gray-500 h-[70px] overflow-hidden  ">{product.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>  
    </div>
  );
};

export default ProductList;
