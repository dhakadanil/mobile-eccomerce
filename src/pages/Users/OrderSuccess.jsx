import React from "react";
import { useLocation, useNavigate } from "react-router";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // hook dwara bheja gaya order data fetch karna
  const order = location.state?.order;

  if (!order) {
    return (
      <div style={errorContainerStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>⚠️</div>
          <h2 style={{ color: "#d32f2f", marginBottom: "15px" }}>Koi order data nahi mila!</h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>Aapne abhi tak koi order place nahi kiya hai.</p>
          <button onClick={() => navigate("/")} style={primaryButtonStyle}>
            Home Page Par Jayein
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Success Header */}
        <div style={headerSectionStyle}>
          <div style={successBadgeStyle}>✓</div>
          <h1 style={titleStyle}>Thank You For Your Order!</h1>
          <p style={subtitleStyle}>Aapka order successfully confirm ho gaya hai.</p>
        </div>

        {/* Order Meta Info */}
        <div style={metaBoxStyle}>
          <div>
            <span style={metaLabelStyle}>Order ID</span>
            <div style={metaValueStyle}>#{order.id || order._id || "N/A"}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={metaLabelStyle}>Status</span>
            <div style={statusBadgeStyle}>{order.orderStatus || "Confirmed"}</div>
          </div>
        </div>

        {/* Items Ordered List */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Items Ordered</h3>
          <div style={productListStyle}>
            {order.products?.map((item, index) => (
              <div key={index} style={productItemStyle}>
                <img 
                  src={item.image || "https://placeholder.com"} 
                  alt={item.name} 
                  style={productImgStyle}
                />
                <div style={{ flex: 1, marginLeft: "12px" }}>
                  <div style={productNameStyle}>{item.name}</div>
                  <div style={productSpecsStyle}>
                    {item.ram && `${item.ram} RAM`} {item.storage && `| ${item.storage} Storage`}
                  </div>
                  <div style={productQtyStyle}>Qty: {item.quantity}</div>
                </div>
                <div style={productPriceStyle}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Order Summary</h3>
          <div style={summaryRowStyle}>
            <span>Total Items</span>
            <span>{order.totalItems} Items</span>
          </div>
          <div style={{ ...summaryRowStyle, borderBottom: "none", paddingBottom: 0 }}>
            <span style={{ fontWeight: "600", color: "#111" }}>Grand Total</span>
            <span style={grandTotalStyle}>₹{Number(order.totalAmount).toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Shipping Address</h3>
          <div style={addressBoxStyle}>
            <div style={{ fontWeight: "600", marginBottom: "4px", color: "#333" }}>
              {order.customer?.name || "Customer"}
            </div>
            <div style={{ color: "#555", lineHeight: "1.5" }}>
              {order.address?.houseNo}, {order.address?.address},<br />
              {order.address?.city}, {order.address?.state} - {order.address?.pincode}
            </div>
            <div style={{ color: "#666", marginTop: "6px", fontSize: "13px" }}>
              📞 {order.customer?.mobile} | ✉️ {order.customer?.email}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button onClick={() => navigate("/")} style={primaryButtonStyle}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// ================= MODERN STYLES =================
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
  backgroundColor: "#f4f6f8",
  padding: "40px 20px",
  fontFamily: "'Segoe UI', Roboto, sans-serif",
};

const errorContainerStyle = { ...containerStyle, minHeight: "80vh" };

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "35px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  maxWidth: "550px",
  width: "100%",
  boxSizing: "border-box",
};

const headerSectionStyle = { textAlign: "center", marginBottom: "25px" };

const successBadgeStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#e8f5e9",
  color: "#2e7d32",
  fontSize: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 15px auto",
  fontWeight: "bold",
};

const titleStyle = { fontSize: "24px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 8px 0" };
const subtitleStyle = { fontSize: "14px", color: "#666", margin: 0 };

const metaBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f8f9fa",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #edf2f7",
  marginBottom: "25px",
};

const metaLabelStyle = { fontSize: "12px", color: "#888", display: "block", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" };
const metaValueStyle = { fontSize: "14px", fontWeight: "600", color: "#2d3748" };
const statusBadgeStyle = { backgroundColor: "#e3f2fd", color: "#0d47a1", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" };
const sectionStyle = { textAlign: "left", marginBottom: "25px" };

const sectionTitleStyle = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#4a5568",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: "0 0 12px 0",
  borderBottom: "2px solid #edf2f7",
  paddingBottom: "6px",
};

const productListStyle = { display: "flex", flexDirection: "column", gap: "12px" };
const productItemStyle = { display: "flex", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #f1f3f5" };
const productImgStyle = { width: "55px", height: "55px", borderRadius: "8px", objectFit: "cover", backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" };
const productNameStyle = { fontSize: "14px", fontWeight: "600", color: "#2d3748", lineHeight: "1.3" };
const productSpecsStyle = { fontSize: "12px", color: "#718096", marginTop: "2px" };
const productQtyStyle = { fontSize: "12px", color: "#a0aec0", marginTop: "2px" };
const productPriceStyle = { fontSize: "14px", fontWeight: "600", color: "#1a202c" };

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  color: "#4a5568",
  paddingBottom: "10px",
  marginBottom: "10px",
  borderBottom: "1px dashed #e2e8f0",
};

const grandTotalStyle = { fontSize: "18px", fontWeight: "700", color: "#2e7d32" };
const addressBoxStyle = { backgroundColor: "#f8f9fa", padding: "14px", borderRadius: "10px", border: "1px solid #edf2f7", fontSize: "14px" };

const primaryButtonStyle = {
  backgroundColor: "#88b121", // Aapke design color se match kiya hua green tone
  color: "#ffffff",
  border: "none",
  padding: "14px 24px",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
  width: "100%",
  boxShadow: "0 4px 12px rgba(136, 177, 33, 0.2)",
};

export default OrderSuccess;
