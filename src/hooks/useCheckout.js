import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../service/API";

export const useCheckout = (cart, cartTotal) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [address, setAddress] = useState({
    houseNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,[name]: value,
    }));
  };

  const validateCheckout = () => {
    if (!user.name.trim()) {
      alert("Please Detail Submit");
      return false;
    }

    if (!user.mobile.trim()) {
      alert("Please mobile number enter karein");
      return false;
    }

    if (!/^[0-9]{10}$/.test(user.mobile)) {
      alert("Mobile number 10 digit ka hona chahiye");
      return false;
    }

    if (!user.email.trim()) {
      alert("Please email enter karein");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      alert("Please valid email enter karein");
      return false;
    }

    if (!address.houseNo.trim()) {
      alert("Please house / flat number enter karein");
      return false;
    }

    if (!address.address.trim()) {
      alert("Please complete address enter karein");
      return false;
    }

    if (!address.city.trim()) {
      alert("Please city enter karein");
      return false;
    }

    if (!address.state.trim()) {
      alert("Please state enter karein");
      return false;
    }

    if (!address.pincode.trim()) {
      alert("Please pincode enter karein");
      return false;
    }

    if (!/^[0-9]{6}$/.test(address.pincode)) {
      alert("Pincode 6 digit ka hona chahiye");
      return false;
    }

    return true;
  };

  const placeOrder = async () => {
    if (!cart || cart.length === 0) {
      alert("Cart empty hai");
      navigate("/cart");
      return;
    }
    const isValid = validateCheckout();
    if (!isValid) {
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        customer: {
          name: user.name.trim(),
          mobile: user.mobile.trim(),
          email: user.email.trim(),
        },

        address: {
          houseNo: address.houseNo.trim(),
          address: address.address.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
          pincode: address.pincode.trim(),
        },

        products: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          brand: item.brand,
          image: item.image,
          price: Number(item.price || 0),
          quantity: Number(item.quantity || 1),
          ram: item.ram,
          storage: item.storage,
        })),
        totalItems: cart.reduce((total, item) => total + Number(item.quantity || 1), 0),
        totalAmount: Number(cartTotal),
        orderStatus: "Pending",
        orderDate: new Date().toISOString(),
      };
      const response = await API.post( "/orders",orderData);
      console.log("Order successfully created:",response.data );

      for (const item of cart) {
        await API.delete(`/cart/${item.id}`);
      }
      alert("🎉 Order successfully confirm ho gaya!");
      navigate("/order-success", {
        state: {  order: response.data, },
      });

    } catch (error) {
      console.log("Order place karne me error:",error);
      console.log("Error response:",error.response);
      console.log("Error data:",error.response?.data);
      alert(error.response?.data?.message ||"Order place nahi ho paya");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    address,
    loading,
    handleUserChange,
    handleAddressChange,
    placeOrder,
  };
};
