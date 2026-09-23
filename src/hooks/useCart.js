import { useEffect, useState } from "react";
import API from "../service/API";
import { useNavigate } from "react-router";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await API.get("/cart");
      setCart(response.data || []);
    } catch (error) {
      console.log("Cart fetch karne me error", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  const addToCart = async (mobile) => {
  if (!mobile) {
    return;
  }
  setLoading(true);
  try {
    const existingProduct = cart.find((item) =>item.productId ===(mobile._id || mobile.id)
    );
    if (existingProduct) {
      await API.patch(`/cart/${existingProduct.id}`,{quantity:(existingProduct.quantity || 1) + 1 }
      );
      navigate("/cart");
    } else {
      const cartProduct = {
        productId: mobile._id || mobile.id,
        name: mobile.name,
        brand: mobile.brand,
        image: mobile.image,
        price: mobile.price,
        ram: mobile.ram,
        storage: mobile.storage,
        camera: mobile.camera,
        battery: mobile.battery,
        quantity: 1
       };

      const response = await API.post("/cart",cartProduct);
      console.log("Cart POST response:",response.data);
      alert("Product cart me add ho gaya 🛒");
      navigate("/cart");
    }
    await fetchCart();
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR RESPONSE:",error.response);
    console.log("ERROR DATA:",error.response?.data);
    console.log("ERROR STATUS:",error.response?.status);
    alert(error.response?.data?.message ||"Product cart me add nahi hua");
  } finally {
    setLoading(false);
  }
};

const increaseQuantity = async (item) => {
  const newQuantity = (item.quantity || 1) + 1;
  try {
    await API.patch(`/cart/${item.id}`, {
      quantity: newQuantity
    });
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity }: cartItem)
    );
  } catch (error) {
    console.log("Quantity increase karne me error", error);
  }
};

const decreaseQuantity = async (item) => {
  const currentQuantity = item.quantity || 1;
  if (currentQuantity <= 1) {
    return;
  }
  const newQuantity = currentQuantity - 1;
  try {
    await API.patch(`/cart/${item.id}`, {
      quantity: newQuantity
    });
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity }: cartItem )
    );
  } catch (error) {
    console.log("Quantity decrease karne me error", error);
  }
};


  const removeFromCart = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      alert("Product cart se remove ho gaya");
      await fetchCart();
    } catch (error) {
      console.log("Product remove karne me error",error);
    }
  };

  const cartTotal = cart.reduce((total, item) => {
      return (total + Number(item.price || 0) * Number(item.quantity || 1));
    },0
  );

  return {
    cart,
    loading,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal
  };
};