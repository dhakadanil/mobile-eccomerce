import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";

function Cart() {
  const { cart, loading, increaseQuantity, decreaseQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      <style>{`
        .cart-page {
  min-height: 80vh;
  padding: 15px 20px 70px;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  font-family: Arial, sans-serif;
}

.cart-container {
  max-width: 1180px;
  margin: 0 auto;
}

/* =========================
   TITLE
========================= */

.cart-title {
  font-size: 34px;
  color: #172033;
  margin: 0 0 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* =========================
   MAIN LAYOUT
========================= */

.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 28px;
  align-items: start;
}

.cart-products {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* =========================
   CART ITEM
========================= */

.cart-item {
  background: #ffffff;
  border: 1px solid #e8edf2;
  border-radius: 18px;
  padding: 20px;
  display: grid;
  grid-template-columns: 135px minmax(0, 1fr) auto;
  gap: 22px;
  align-items: center;
  box-shadow: 0 5px 20px rgba(15, 23, 42, 0.05);
  transition: all 0.25s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  border-color: #dce7c3;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

/* =========================
   IMAGE
========================= */

.cart-image-box {
  width: 135px;
  height: 145px;
  background: #f7f9f3;
  border: 1px solid #edf1e6;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.cart-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}

.cart-item:hover .cart-image {
  transform: scale(1.05);
}

/* =========================
   PRODUCT INFO
========================= */

.cart-brand {
  color: #88b121;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 7px;
}

.cart-product-name {
  color: #172033;
  font-size: 21px;
  line-height: 1.3;
  margin: 0 0 10px;
  font-weight: 700;
}

.cart-specs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  color: #64748b;
  font-size: 12px;
  margin-bottom: 12px;
}

.cart-specs span {
  background: #f8fafc;
  border: 1px solid #e9eef3;
  padding: 6px 9px;
  border-radius: 6px;
}

.cart-price {
  color: #76a000;
  font-size: 21px;
  font-weight: 700;
}

/* =========================
   QUANTITY
========================= */

.quantity-box {
  display: inline-flex;
  align-items: center;
  gap: 0;
  margin-top: 14px;
  border: 1px solid #dfe5e9;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.quantity-btn {
  width: 34px;
  height: 34px;
  border: none;
  background: #ffffff;
  color: #334155;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s ease;
}

.quantity-btn:hover {
  background: #88b121;
  color: white;
}

.quantity {
  min-width: 38px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  font-weight: 700;
  color: #1e293b;
}

/* =========================
   REMOVE BUTTON
========================= */

.remove-btn {
  border: 1px solid #fecaca;
  background: #fff5f5;
  color: #dc2626;
  padding: 9px 13px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.remove-btn:hover {
  background: #dc2626;
  color: white;
  border-color: #dc2626;
}

/* =========================
   SUMMARY
========================= */

.summary-box {
  background: #ffffff;
  border: 1px solid #e8edf2;
  border-radius: 18px;
  padding: 26px;
  position: sticky;
  top: 25px;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
}

.summary-title {
  font-size: 22px;
  color: #172033;
  margin: 0 0 24px;
  font-weight: 700;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #64748b;
  font-size: 14px;
}

.summary-row span:last-child {
  color: #1e293b;
  font-weight: 600;
}

.summary-total {
  border-top: 1px solid #e5e7eb;
  padding-top: 18px;
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #172033;
}

.total-price {
  color: #76a000;
  font-size: 23px;
}

/* =========================
   CHECKOUT BUTTON
========================= */

.checkout-btn {
  display: block;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  background: linear-gradient(135deg, #88b121, #719719);
  color: white;
  padding: 15px;
  border-radius: 9px;
  margin-top: 24px;
  font-size: 15px;
  font-weight: 700;
  transition: all 0.25s ease;
  box-shadow: 0 5px 14px rgba(136, 177, 33, 0.25);
}

.checkout-btn:hover {
  background: linear-gradient(135deg, #719719, #5f8214);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(136, 177, 33, 0.3);
}

.continue-btn {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #719719;
  margin-top: 17px;
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s ease;
}

.continue-btn:hover {
  color: #4f6f0f;
}

/* =========================
   EMPTY CART
========================= */

.empty-cart {
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: white;
  border-radius: 20px;
  border: 1px solid #e8edf2;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.05);
  padding: 40px 20px;
}

.empty-cart-icon {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #f4f8e9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  margin-bottom: 20px;
}

.empty-cart h2 {
  color: #172033;
  font-size: 25px;
  margin: 0 0 10px;
}

.empty-cart p {
  color: #64748b;
  margin: 0 0 24px;
  font-size: 14px;
}

.shop-btn {
  display: inline-block;
  text-decoration: none;
  background: linear-gradient(135deg, #88b121, #719719);
  color: white;
  padding: 13px 28px;
  border-radius: 9px;
  font-weight: 600;
  box-shadow: 0 5px 14px rgba(136, 177, 33, 0.22);
  transition: 0.25s ease;
}

.shop-btn:hover {
  background: #5f8214;
  color: white;
  transform: translateY(-1px);
}

/* =========================
   LOADING
========================= */

.loading-cart {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #88b121;
}

.loading-cart h2 {
  font-size: 22px;
  font-weight: 600;
}

/* =========================
   TABLET
========================= */

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .summary-box {
    position: static;
  }

  .summary-box {
    order: -1;
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {
  .cart-page {
    padding: 25px 12px 45px;
  }

  .cart-title {
    font-size: 27px;
    margin-bottom: 20px;
  }

  .cart-item {
    grid-template-columns: 85px minmax(0, 1fr);
    gap: 14px;
    padding: 14px;
    border-radius: 15px;
  }

  .cart-image-box {
    width: 85px;
    height: 105px;
    border-radius: 10px;
  }

  .cart-image {
    padding: 7px;
  }

  .cart-brand {
    font-size: 10px;
  }

  .cart-product-name {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .cart-specs {
    gap: 5px;
    margin-bottom: 8px;
  }

  .cart-specs span {
    font-size: 10px;
    padding: 5px 6px;
  }

  .cart-price {
    font-size: 17px;
  }

  .quantity-box {
    margin-top: 10px;
  }

  .quantity-btn {
    width: 30px;
    height: 30px;
  }

  .quantity {
    height: 30px;
    min-width: 32px;
  }

  .remove-btn {
    grid-column: 1 / -1;
    width: 100%;
    padding: 10px;
  }

  .summary-box {
    padding: 20px;
    border-radius: 15px;
  }

  .summary-title {
    font-size: 20px;
  }

  .summary-total {
    font-size: 18px;
  }

  .total-price {
    font-size: 21px;
  }
}

/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 380px) {
  .cart-item {
    grid-template-columns: 75px minmax(0, 1fr);
    gap: 10px;
  }

  .cart-image-box {
    width: 75px;
    height: 95px;
  }

  .cart-product-name {
    font-size: 15px;
  }

  .cart-price {
    font-size: 16px;
  }
}

      `}</style>

      <div className="cart-page">
        <div className="cart-container">
          {loading ? (
            <div className="loading-cart">
              <h2>
                Cart Loading......
              </h2>
            </div>
          ) : cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                🛒
              </div>

              <h2>Your Cart is Empty </h2>
              <p>Aapne abhi tak koi product cart
                me add nahi kiya hai.
              </p>
              <Link to="/" className="shop-btn">Continue Shopping</Link>
            </div>

          ) : (
            <>
              <h1 className="cart-title">
                🛒 My Cart
              </h1>

              <div className="cart-layout">
                <div className="cart-products">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.id}>
                      <div className="cart-image-box">
                        <img src={item.image} alt={item.name} className="cart-image" />
                      </div>

                      <div>
                        <div className="cart-brand"> {item.brand}
                        </div>
                        <h2 className="cart-product-name">
                          {item.name}
                        </h2>

                        <div className="cart-specs">
                          <span>
                            RAM: {item.ram} GB
                          </span>

                          <span>
                            Storage: {item.storage} GB
                          </span>

                        </div>

                        <div className="cart-price">
                          ₹  {Number(item.price || 0 ).toLocaleString("en-IN")}
                        </div>

                        <div className="quantity-box">
                          <button type="button" className="quantity-btn"
                            onClick={() => decreaseQuantity(item) }>  − </button>

                          <span className="quantity">
                            {item.quantity || 1}
                          </span>

                          <button className="quantity-btn"
                            onClick={() =>increaseQuantity(item)}>+</button>
                        </div>
                      </div>

                      <button className="remove-btn"
                        onClick={() => removeFromCart(item.id)}> 🗑️ Remove</button>
                    </div>
                  ))}
                </div>

                <div className="summary-box">
                  <h2 className="summary-title"> Order Summary</h2>
                  <div className="summary-row">
                    <span> Total Items</span>
                    <span>
                      {cart.reduce((total, item) => total + Number(item.quantity || 1), 0)}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>  Delivery</span>
                    <span> Free   </span>
                  </div>

                  <div className="summary-total">
                    <span>Total</span>
                    <span className="total-price">
                      ₹{Number(cartTotal).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
                  <Link to="/" className="continue-btn">  ← Continue Shopping </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
