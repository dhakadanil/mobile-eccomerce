import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useCart } from "../../hooks/useCart";
import API from "../../service/API";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { addToCart } = useCart();

  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/mobiles/${id}`);
        setMobile(response.data);
      } catch (error) {
        console.log("data fetch karne me error", error);
        alert("Mobile ka data nahi mila");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <>
      <style>{`
        .product-page {
          width: 100%;
          min-height: 80vh;
          font-family: Arial, sans-serif;
        }

        .product-container {
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: 45% 55%;
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.10);
        }

        .product-image-section {
          background: #f7f8f5;
          min-height: 550px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }

        .product-image {
          width: 100%;
          max-width: 380px;
          height: 470px;
          object-fit: contain;
          transition: 0.3s;
        }

        .product-image:hover {
          transform: scale(1.05);
        }

        .product-details {
          padding: 45px;
        }

        .brand {
          color: #88b121;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .product-name {
          font-size: 38px;
          color: #222;
          margin: 10px 0 15px;
          line-height: 1.2;
        }

        .description {
          color: #666;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .price {
          font-size: 32px;
          font-weight: bold;
          color: #88b121;
          margin-bottom: 30px;
        }

        .spec-title {
          font-size: 20px;
          color: #222;
          margin-bottom: 15px;
        }

        .specifications {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 30px;
        }

        .spec-box {
          background: #f7f8f5;
          border: 1px solid #eeeeee;
          padding: 15px;
          border-radius: 10px;
        }

        .spec-label {
          display: block;
          color: #777;
          font-size: 13px;
          margin-bottom: 6px;
        }

        .spec-value {
          color: #222;
          font-size: 16px;
          font-weight: bold;
        }

        .cart-btn {
          display: inline-block;
          text-decoration: none;
          background: #ff9800;
          color: white;
          padding: 13px 25px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: 0.3s;
          margin-right: 10px;
        }

        .cart-btn:hover {
          background: #e68900;
          color: white;
          transform: translateY(-2px);
        }

        .back-btn {
          display: inline-block;
          text-decoration: none;
          background: #88b121;
          color: white;
          padding: 13px 25px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          transition: 0.3s;
        }

        .back-btn:hover {
          background: #719719;
          color: white;
        }

        .loading-container {
          min-height: 70vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loading-container h2 {
          color: #88b121;
        }

        .not-found {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 15px;
        }

        .not-found h2 {
          color: #333;
        }

        @media (max-width: 800px) {
          .product-container {
            grid-template-columns: 1fr;
          }

          .product-image-section {
            min-height: 400px;
          }

          .product-image {
            height: 350px;
          }

          .product-details {
            padding: 30px;
          }

          .product-name {
            font-size: 30px;
          }
        }

        @media (max-width: 500px) {
          .product-page {
            padding: 15px 0 40px;
          }

          .product-image-section {
            min-height: 320px;
            padding: 20px;
          }

          .product-image {
            height: 280px;
          }

          .product-details {
            padding: 20px;
          }

          .product-name {
            font-size: 26px;
          }

          .price {
            font-size: 26px;
          }

          .specifications {
            grid-template-columns: 1fr;
          }

          .cart-btn,
          .back-btn {
            padding: 12px 18px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="product-page">
        {loading ? (
          <div className="loading-container">
            <h2>
              Data Loading......
            </h2>
          </div>
        ) : !mobile ? (
          <div className="not-found">
            <h2>
              Mobile Not Found
            </h2>

            <Link
              to="/"
              className="back-btn"
            >
              ← Go Back
            </Link>
          </div>
        ) : (
          <div className="product-container">

            <div className="product-image-section">
              <img
                src={mobile.image}
                alt={mobile.name}
                className="product-image"
              />
            </div>

            <div className="product-details">

              <span className="brand">
                {mobile.brand}
              </span>

              <h1 className="product-name">
                {mobile.name}
              </h1>

              <p className="description">
                {mobile.description}
              </p>

              <div className="price">
                ₹
                {Number(
                  mobile.price || 0
                ).toLocaleString("en-IN")}
              </div>

              <h3 className="spec-title">
                Mobile Specifications
              </h3>

              <div className="specifications">

                <div className="spec-box">
                  <span className="spec-label">
                    RAM
                  </span>

                  <span className="spec-value">
                    {mobile.ram} GB
                  </span>
                </div>

                <div className="spec-box">
                  <span className="spec-label">
                    Storage
                  </span>

                  <span className="spec-value">
                    {mobile.storage} GB
                  </span>
                </div>

                <div className="spec-box">
                  <span className="spec-label">
                    Camera
                  </span>

                  <span className="spec-value">
                    {mobile.camera}
                  </span>
                </div>

                <div className="spec-box">
                  <span className="spec-label">
                    Battery
                  </span>

                  <span className="spec-value">
                    {mobile.battery}
                  </span>
                </div>

              </div>


              <button
                onClick={() => addToCart(mobile)}
                className="cart-btn"
              >
                🛒 Add to Cart
              </button>

              <Link
                to="/"
                className="back-btn"
              >
                ← Go Back
              </Link>

            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
