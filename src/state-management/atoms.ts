import axios from "axios";
import { atom, selectorFamily } from "recoil";
import { Product } from "../components/ProductDetails";


// Atom for product list
export const productListState = atom<Product[]>({
  key: "productListState",
  default: [],
});

// Selector to fetch product list
export const fetchProductList = selectorFamily<Product[], void>({
  key: "fetchProductList",
  get: () => async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const productData = response.data.products.map((item: any) => ({
        id: item.id,
        name: item.title || "No name",
        price: item.price,
        shortDescription: item.description || "No description",
        imageUrl: item.thumbnail,
        category: item.category,
        reviews: item.reviews,
      }));
      return productData;
    } catch (error) {
      console.error("Error fetching product list:", error);
      return [];
    }
  },
});

// Selector for individual product by ID
export const fetchProductById = selectorFamily<Product | undefined, number>({
  key: "fetchProductById",
  get:
    (productId: number) =>
    ({ get }) => {
      const productList = get(productListState);
      return productList.find((p) => p.id === productId);
    },
});