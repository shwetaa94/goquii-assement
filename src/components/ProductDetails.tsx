import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { fetchProductById } from "../state-management/atoms";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";

const ProductDetails: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("user-data") ?? "{}");
  const navigate = useNavigate();
  const keys: string[] = Object.keys(userData);

  if (keys.length === 0) {
    navigate("/");
  }

  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id??'1', 10);

  // Fetching product details using Recoil selector
  const productLoadable = useRecoilValueLoadable(fetchProductById(productId));

  useEffect(() => {
    if (productLoadable.state === "loading") {
      console.log("Loading product details...");
    } else if (productLoadable.state === "hasError") {
      console.error("Error loading product details:", productLoadable.contents);
    }
  }, [productLoadable]);

  if (
    productLoadable.state === "loading" ||
    productLoadable.state === "hasError"
  ) {
    return <div>Loading...</div>;
  }

  const product = productLoadable.contents;

  if (!product) {
    return <div>Product not found</div>;
  }

  const printStar = (rating: number) => {
    let stars = "";
    for (let i = 1; i <= rating; i++) {
      stars += "⭐";
    }
    return stars;
  };

  return (
    <div className="h-screen px-6 sm:p-4 md:p-8 bg-blue-50">
      <Link
        to="/all"
        className="my-8 bg-blue-500 text-white mb-4 inline-block p-3 rounded-md clicked"
      >
        <span className="flex items-center">
          <MdOutlineArrowBack className="text-xl mr-2" /> Back{" "}
        </span>
      </Link>
      <div className="flex flex-col md:flex-row bg-white p-8 rounded shadow">
        <div className="md:w-1/3 flex items-center justify-center bg-gray-100 mr-2 sm:mr-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full object-contain mb-4"
          />
        </div>
        <div className="mt-3">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-blue-600 mb-2 font-bold italic">
            ₹{product.price}
          </p>
          <p className="text-gray-700 mb-2">
            Category: {product.category.toUpperCase()}
          </p>
          <p className="text-gray-700 mb-4">{product.shortDescription}</p>
          <h3 className="text-xl font-bold pb-2 mb-4 border-b">User Reviews</h3>
          <div className="space-y-4">
            {product.reviews.map((review:any, index:number) => (
              <div key={index} className="border border-gray-300 p-4 rounded">
                <div className="flex gap-4 items-center">
                  <FaRegUserCircle className="text-2xl text-gray-400" />
                  <span className="text-gray-400 text-lg">
                    {review.reviewerName}
                  </span>
                  <span> {printStar(review.rating)}</span>
                </div>
                <p className="ml-10"> {review.comment} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;