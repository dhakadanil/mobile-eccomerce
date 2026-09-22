import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router";
import { useCheckout } from "../../hooks/useCheckout";

function Checkout() {
  // =========================
  // CART DATA
  // =========================

  const {
    cart,
    loading: cartLoading,
    cartTotal,
  } = useCart();

  // =========================
  // CHECKOUT DATA
  // =========================

  const {
    user,
    address,
    loading,
    handleUserChange,
    handleAddressChange,
    placeOrder,
  } = useCheckout(cart, cartTotal);

  const navigate = useNavigate();

  // =========================
  // CART LOADING
  // =========================

  if (cartLoading) {
    return (
      <div className="checkout-loading">
        <h2>Checkout Loading......</h2>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <>
        <style>{`

          .empty-checkout {
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-family: Arial, sans-serif;
          }

          .empty-checkout-icon {
            font-size: 60px;
            margin-bottom: 15px;
          }

          .empty-checkout h2 {
            color: #172033;
            margin-bottom: 8px;
          }

          .empty-checkout p {
            color: #64748b;
            margin-bottom: 20px;
          }

          .shop-btn {
            border: none;
            background: #88b121;
            color: white;
            padding: 12px 25px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          }

        `}</style>

        <div className="empty-checkout">

          <div className="empty-checkout-icon">
            🛒
          </div>

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            Checkout karne ke liye
            pehle product cart me add karein.
          </p>

          <button
            className="shop-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>
      </>
    );
  }

  // =========================
  // CHECKOUT UI
  // =========================

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        .checkout-page {
          min-height: 100vh;
          background: #f6f8fa;
          border-radius:10px;
          padding: 20px 20px 40px;
          font-family: Arial, sans-serif;
        }

        .checkout-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* =========================
           TITLE
        ========================= */

        .checkout-title {
          font-size: 32px;
          color: #172033;
          margin: 0 0 28px;
          font-weight: 700;
        }

        /* =========================
           LAYOUT
        ========================= */

        .checkout-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            380px;

          gap: 25px;

          align-items: start;
        }

        /* =========================
           LEFT BOX
        ========================= */

        .checkout-box {
          background: #ffffff;

          border: 1px solid #e5e7eb;

          border-radius: 15px;

          padding: 25px;

          box-shadow:
            0 5px 20px
            rgba(0, 0, 0, 0.05);

          margin-bottom: 20px;
        }

        .box-title {
          font-size: 20px;

          font-weight: 700;

          color: #172033;

          margin:
            0 0 22px;
        }

        /* =========================
           FORM
        ========================= */

        .form-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 17px;
        }

        .form-group {
          display: flex;

          flex-direction: column;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 13px;

          font-weight: 600;

          color: #334155;

          margin-bottom: 7px;
        }

        .form-group input,
        .form-group textarea {

          width: 100%;

          padding: 12px 13px;

          border: 1px solid #d9dee5;

          border-radius: 8px;

          outline: none;

          font-size: 14px;

          font-family: Arial, sans-serif;

          transition: 0.2s;
        }

        .form-group textarea {

          min-height: 100px;

          resize: vertical;
        }

        .form-group input:focus,
        .form-group textarea:focus {

          border-color: #88b121;

          box-shadow:
            0 0 0 3px
            rgba(136, 177, 33, 0.10);
        }

        /* =========================
           SUMMARY
        ========================= */

        .summary-box {

          background: #ffffff;

          border: 1px solid #e5e7eb;

          border-radius: 15px;

          padding: 24px;

          position: sticky;

          top: 20px;

          box-shadow:
            0 5px 20px
            rgba(0, 0, 0, 0.05);
        }

        .summary-title {

          font-size: 21px;

          font-weight: 700;

          color: #172033;

          margin:
            0 0 20px;
        }

        /* =========================
           PRODUCTS
        ========================= */

        .product-row {

          display: flex;

          gap: 12px;

          padding: 13px 0;

          border-bottom:
            1px solid #edf0f2;
        }

        .product-image {

          width: 65px;

          height: 65px;

          border-radius: 8px;

          background: #f7f9f3;

          object-fit: contain;

          padding: 5px;

          flex-shrink: 0;
        }

        .product-info {

          flex: 1;

          min-width: 0;
        }

        .product-name {

          font-size: 14px;

          font-weight: 700;

          color: #172033;

          margin-bottom: 5px;

          line-height: 1.3;
        }

        .product-qty {

          font-size: 12px;

          color: #64748b;
        }

        .product-price {

          font-size: 14px;

          font-weight: 700;

          color: #76a000;

          white-space: nowrap;
        }

        /* =========================
           SUMMARY ROW
        ========================= */

        .summary-row {

          display: flex;

          justify-content:
            space-between;

          margin-top: 15px;

          color: #64748b;

          font-size: 14px;
        }

        .summary-row strong {

          color: #172033;
        }

        /* =========================
           TOTAL
        ========================= */

        .total-row {

          border-top:
            1px solid #e5e7eb;

          margin-top: 18px;

          padding-top: 18px;

          display: flex;

          justify-content:
            space-between;

          font-size: 20px;

          font-weight: 700;

          color: #172033;
        }

        .total-price {

          color: #76a000;
        }

        /* =========================
           CONFIRM BUTTON
        ========================= */

        .place-order-btn {
          width: 100%;
          border: none;
          background:linear-gradient( 135deg,#88b121, #719719);
          color: white;
          padding: 15px;
          border-radius: 9px;
          margin-top: 22px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s;
        }

        .place-order-btn:hover {

          background:
            linear-gradient(
              135deg,
              #719719,
              #5f8214
            );

          transform:
            translateY(-1px);
        }

        .place-order-btn:disabled {

          opacity: 0.6;

          cursor: not-allowed;

          transform: none;
        }

        /* =========================
           BACK BUTTON
        ========================= */

        .back-cart-btn {
          width: 100%;
          border: none;
          background: transparent;
          color: #719719;
          padding: 12px;
          margin-top: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .back-cart-btn:hover {

          color: #4f6f0f;
        }

        /* =========================
           LOADING
        ========================= */

        .checkout-loading {

          min-height: 70vh;

          display: flex;

          justify-content: center;

          align-items: center;

          color: #88b121;

          font-family: Arial, sans-serif;
        }

        /* =========================
           TABLET
        ========================= */


@media (max-width: 900px) {

  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .summary-box {
    position: static;
    order: -1;
  }

  /* Confirm Order - Left */
  .place-order-btn {
    width: 40%;
    display: inline-block;
    margin-top: 22px;
  }

  /* Back to Cart - Right */
  .back-cart-btn {
    width: 30%;
    display: inline-block;
    margin-top: 22px;
    padding: 15px 5px;
    text-align: center;
    float: right;
  }
 .back-cart-btn  {
          border: none;
          background:linear-gradient( 135deg,#88b121, #11ccc3);
          color: white;
          border-radius: 9px;
          margin-top: 22px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s;
        }
}

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {


  .checkout-title {
    font-size: 27px;
    margin-bottom: 20px;
  }

  .checkout-box {
    padding: 18px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full {
    grid-column: auto;
  }

  .summary-box {
    padding: 18px;
  }

  .summary-title {
    font-size: 20px;
  }

  /* Confirm Order - Center */
  .place-order-btn {
    width: 80%;
    display: block;
    margin: 22px auto 0;
  }

  /* Back to Cart - Center */
  .back-cart-btn {
    width: 80%;
    display: block;
    margin: 10px auto 0;
    padding: 12px 5px;
    font-size: 16px;
    text-align: center;
    float: none;
  }

}

      `}</style>


      <div className="checkout-page">

        <div className="checkout-container">

          {/* =========================
              PAGE TITLE
          ========================= */}

          <h1 className="checkout-title">
            🛍️ Checkout
          </h1>


          <div className="checkout-layout">

            {/* =================================
                LEFT SIDE
            ================================= */}

            <div>

              {/* =========================
                  CUSTOMER DETAILS
              ========================= */}

              <div className="checkout-box">

                <h2 className="box-title">
                  👤 Customer Details
                </h2>

                <div className="form-grid">

                  {/* NAME */}

                  <div className="form-group">

                    <label>
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleUserChange}
                      placeholder="Enter your full name"
                    />

                  </div>


                  {/* MOBILE */}

                  <div className="form-group">

                    <label>
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={user.mobile}
                      onChange={handleUserChange}
                      placeholder="10 digit mobile number"
                      maxLength={10}
                    />

                  </div>


                  {/* EMAIL */}

                  <div className="form-group full">

                    <label>
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleUserChange}
                      placeholder="example@gmail.com"
                    />

                  </div>

                </div>

              </div>


              {/* =========================
                  DELIVERY ADDRESS
              ========================= */}

              <div className="checkout-box">

                <h2 className="box-title">
                  📍 Delivery Address
                </h2>

                <div className="form-grid">

                  {/* HOUSE */}

                  <div className="form-group">

                    <label>
                      House / Flat No. *
                    </label>

                    <input
                      type="text"
                      name="houseNo"
                      value={address.houseNo}
                      onChange={handleAddressChange}
                      placeholder="House / Flat No."
                    />

                  </div>


                  {/* CITY */}

                  <div className="form-group">

                    <label>
                      City *
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                    />

                  </div>


                  {/* COMPLETE ADDRESS */}

                  <div className="form-group full">

                    <label>
                      Complete Address *
                    </label>

                    <textarea
                      name="address"
                      value={address.address}
                      onChange={handleAddressChange}
                      placeholder="Street, Colony, Landmark..."
                    />

                  </div>


                  {/* STATE */}

                  <div className="form-group">

                    <label>
                      State *
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      placeholder="State"
                    />

                  </div>


                  {/* PINCODE */}

                  <div className="form-group">

                    <label>
                      Pincode *
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      placeholder="6 digit pincode"
                      maxLength={6}
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* =================================
                RIGHT SIDE
            ================================= */}

            <div className="summary-box">

              <h2 className="summary-title">
                Order Summary
              </h2>


              {/* =========================
                  CART PRODUCTS
              ========================= */}

              {cart.map((item) => (

                <div
                  className="product-row"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />


                  <div className="product-info">

                    <div className="product-name">
                      {item.name}
                    </div>

                    <div className="product-qty">
                      Qty: {item.quantity || 1}
                    </div>

                  </div>


                  <div className="product-price">

                    ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    ).toLocaleString("en-IN")}

                  </div>

                </div>

              ))}


              {/* =========================
                  TOTAL ITEMS
              ========================= */}

              <div className="summary-row">

                <span>
                  Total Items
                </span>

                <strong>

                  {cart.reduce(
                    (total, item) =>
                      total +
                      Number(item.quantity || 1),
                    0
                  )}

                </strong>

              </div>


              {/* =========================
                  DELIVERY
              ========================= */}

              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <strong>
                  Free
                </strong>

              </div>


              {/* =========================
                  TOTAL
              ========================= */}

              <div className="total-row">

                <span>
                  Total
                </span>

                <span className="total-price">

                  ₹
                  {Number(cartTotal).toLocaleString(
                    "en-IN"
                  )}

                </span>

              </div>


              {/* =========================
                  CONFIRM ORDER
              ========================= */}

              <button
                type="button"
                className="place-order-btn"
                disabled={loading}
                onClick={placeOrder}
              >

                {loading
                  ? "Confirming Order..."
                  : "Confirm Order 🛒"}

              </button>


              {/* =========================
                  BACK TO CART
              ========================= */}

              <button
                type="button"
                className="back-cart-btn"
                onClick={() => navigate("/cart")}
              >
                ← Back to Cart
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Checkout;
