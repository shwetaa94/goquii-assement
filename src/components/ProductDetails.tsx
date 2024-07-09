import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  reviews: { reviewerName  : string; comment: string; rating: number }[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        console.log(response.data);
        const productData = {
          id: response.data.id,
          name: response.data.title || 'No name',
          price: response.data.price,  
          description: response.data.description || 'No description',
          imageUrl: response.data.thumbnail,
          category: response.data.category, 
          reviews: response.data.reviews
        };
        setProduct(productData);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">Back to List</Link>
      <div className="bg-white p-4 rounded shadow">
        <img src={product.imageUrl} alt={product.name} className="h-64 w-full object-cover mb-4" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-xl text-gray-700 mb-2">₹{product.price}</p>
        <p className="text-gray-700 mb-2">Category: {product.category}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <h3 className="text-xl font-bold mb-2">User Reviews</h3>
        <div className="space-y-4">
          {product.reviews.map((review, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded">
              <p className="text-gray-700"><strong>{review.reviewerName}:</strong> {review.comment}</p>
              <p className="text-yellow-500">Rating: {review.rating}/5</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
