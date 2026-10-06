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
      ...prev,[name]: value,
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

    // 1. Pehle pure order ka data structure taiyar karein
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
        // Aapke dashboard me main key 'id' hai, cart me shayad productId ya id ho
        productId: item.productId || item.id, 
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

    // 2. 🔥 STEP 1: Pehle products ka stock database me kam karein (Order create hone se PEHLE)
    console.log("Stock update process shuru ho raha hai...", cart);
    
    for (const item of cart) {
      // Cart item me se original mobile product id ko extract karein
      const targetMobileId = item.productId || item.id;

      if (!targetMobileId) {
        console.error("⚠️ Is cart item ki Product ID nahi mili:", item.name);
        continue;
      }

      try {
        // API endpoint check: Dashboard /mobiles use kar raha hai toh yahan bhi /mobiles hoga
        const productRes = await API.get(`/mobiles/${targetMobileId}`);
        const currentMobileData = productRes.data;

        const currentStock = Number(currentMobileData.stock || 0);
        const orderedQty = Number(item.quantity || 1);
        const newStock = currentStock - orderedQty;

        // DB me live update karein (Hum string conversion kar rhe hain as per schema requirement)
        await API.patch(`/mobiles/${targetMobileId}`, {
          stock: String(newStock >= 0 ? newStock : 0)
        });

        console.log(`✅ ${item.name} ka stock update ho gaya. New Stock: ${newStock}`);
      } catch (stockError) {
        console.error(`❌ ${item.name} ka stock kam karne me dikkat aayi:`, stockError.message);
      }
    }

    // 3. STEP 2: Stock kam hone ke baad orders database me data post karein
    const response = await API.post("/orders", orderData);
    console.log("Order Table successfully created:", response.data);

    // 4. STEP 3: Sab kuch sahi hone ke baad hi cart se delete karein
    for (const item of cart) {
      if (item.id) {
        await API.delete(`/cart/${item.id}`);
      }
    }

    alert("🎉 Order successfully confirm ho gaya aur stock kam kar diya gaya hai!");
    
    // Success screen par navigate karein
    navigate("/order-success", {
      state: { order: response.data },
    });

  } catch (error) {
    console.error("Order process failure:", error);
    alert(error.response?.data?.message || "Order complete nahi ho paya.");
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
