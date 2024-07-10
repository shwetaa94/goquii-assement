import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { fetchProductList, productListState } from "../state-management/atoms";


export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  imageUrl: string;
  category: string;
  reviews: { reviewerName: string; comment: string; rating: number }[];
}


const ProductList: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("user-data") ?? "{}");
  const navigate = useNavigate();
  const keys: string[] = Object.keys(userData);


  useEffect(() => {
    // Redirect to login if user data is not found
    if (keys.length === 0) {
      navigate("/");
    }
  }, [keys.length, navigate]);


  const products = useRecoilValue(productListState);
  const [searchTerm, setSearchTerm] = useState("");
  const productListLoadable = useRecoilValueLoadable(fetchProductList([]));
  const setProductListState = useSetRecoilState(productListState);


  useEffect(() => {
    if (productListLoadable.state === "hasValue") {
      setProductListState(productListLoadable.contents);
    }
  }, [productListLoadable, setProductListState]);


  const filteredProducts = products.filter((product) => {
    return product.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });


  const onLogout = () => {
    localStorage.removeItem("user-data");
    navigate("/");
  };


  return (
    <div className="w-screen h-screen p-4 bg-blue-50 px-6">
      <div className="flex flex-col justify-around items-center md:flex-row my-6 border-b-2">
        <h1 className="text-4xl font-bold mb-4 italic font-serif">
          Ecommerce store
        </h1>
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-[60%] mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-between w-full md:w-auto md:gap-6">
          <div className="flex justify-center items-center">
            <img
              src={userData.photoURL}
              alt=""
              className="h-14 w-14 rounded-full p-2"
            />
            <div className="flex flex-col">
              <p>Welcome!</p>
              <p className="font-semibold">{userData.displayName}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-24 bg-red-500 text-white h-11 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="md:mx-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="overflow-hidden bg-white p-6 rounded shadow hover:shadow-lg transition duration-300">
              <div className="object-cover w-full flex justify-center bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-[80%] object-cover mb-4"
                />
              </div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="my-1 text-blue-600 italic">₹{product.price}</p>
              <p className="text-gray-500 h-[70px] overflow-hidden">
                {product.shortDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default ProductList;



