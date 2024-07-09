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
  useEffect(() => {
    axios.get('https://api.unsplash.com/photos?client_id=ACCESS_KEY')
      .then(response => {
        const productData = response.data.map((item: any) => ({
          id: item.id,
          name: item.alt_description || 'No name',
          price: Math.random() * 100,  // Random price for demo
          shortDescription: item.description || 'No description',
          imageUrl: item.urls.thumb,
        }));
        setProducts(productData);
      });
  }, []);

 

  return (
    <div className="container mx-auto p-4">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover mb-4" />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-700">${product.price.toFixed(2)}</p>
              <p className="text-gray-500">{product.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
