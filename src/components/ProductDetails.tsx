import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineArrowBack } from 'react-icons/md';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    reviews: { reviewerName: string; comment: string; rating: number }[];
}

const ProductDetails: React.FC = () => {
    const userData = JSON.parse(localStorage.getItem('user-data') ?? "{}")
    const navigate = useNavigate();
    const keys:string[] = Object.keys(userData)
    if (keys.length===0) {
      navigate('/')
    }


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
    const printStar=(rating:number)=>{
        let star ='' ; 
        let i=1;
        for( ; i<= rating;i++){ star=star+"⭐"} 
        if(rating<6)star=star+""
        return star;
    }
    
    return (
        <div className="h-screen  p-2 sm:p-4 md:p-8 bg-gray-100">
            <Link to="/all" className="my-8 bg-blue-500 text-white mb-4 inline-block p-3 rounded-md clicked"><span className='flex items-center'><MdOutlineArrowBack className='text-xl mr-2'/> Back </span></Link>
            <div className="flex flex-col  md:flex-row bg-white p-8 rounded shadow">
                <div className='md:w-1/3 flex items-center justify-center bg-gray-100 mr-2 sm:mr-6'>
                <img src={product.imageUrl} alt={product.name} className=" w-full object-contain mb-4" />
                </div>
                <div className='mt-3'>
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <p className="text-xl text-gray-900 mb-2 font-bold italic">₹{product.price}</p>
                    <p className="text-gray-700 mb-2">Category: {product.category.toLocaleUpperCase()}</p>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <h3 className="text-xl font-bold pb-2 mb-4 border-b">User Reviews</h3>
                    <div className="space-y-4"> 
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border border-gray-300 p-4 rounded">
                                <div className='flex gap-4 items-center'>
                                <FaRegUserCircle className='text-2xl text-gray-400' />
                                    <span className='text-gray-400 text-lg'>{review.reviewerName} </span>
                                    <span> {printStar(review.rating)}</span>
                                </div>
                                <p className='ml-10'> {review.comment} </p>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
