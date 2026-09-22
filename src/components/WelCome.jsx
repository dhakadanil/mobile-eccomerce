
import React, { useState } from 'react';
import { Link } from 'react-router';
import { usemobiles } from '../hooks/usemobiles';

function WelCome() {
  const { mobiles, loading } = usemobiles();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMobiles = mobiles
    ? mobiles.filter((mobile) => {
        const search = searchTerm.toLowerCase();

        const nameMatch = (mobile.name || '')
          .toLowerCase()
          .includes(search);

        const brandMatch = (mobile.brand || '')
          .toLowerCase()
          .includes(search);

        return nameMatch || brandMatch;
      })
    : [];

  return (
    <div style={styles.container}>

      <style>{`
        .store-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .store-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            #00adb5,
            #6366f1,
            #a855f7
          );
        }

        .store-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(15, 23, 42, 0.13);
          border-color: #cbd5e1 !important;
        }


        .image-container {
          position: relative;
          overflow: hidden;
        }

        .store-image {
          transition: transform 0.35s ease;
        }

        .store-card:hover .store-image {
          transform: scale(1.06);
        }



        .view-details-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #00adb5,
            #008f96
          );
          color: white;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          transition: all 0.25s ease;
          box-shadow: 0 4px 10px rgba(0, 173, 181, 0.20);
          white-space: nowrap;
        }

        .view-details-btn:hover {
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 7px 15px rgba(0, 173, 181, 0.28);
          background: linear-gradient(
            135deg,
            #008f96,
            #00777d
          );
        }

        .loading-text {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
          font-size: 15px;
        }

        .loading-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          background: #00adb5;
          border-radius: 50%;
          margin-left: 4px;
          animation: loading 1s infinite;
        }

        @keyframes loading {
          0% {
            opacity: 0.2;
            transform: translateY(0);
          }

          50% {
            opacity: 1;
            transform: translateY(-3px);
          }

          100% {
            opacity: 0.2;
            transform: translateY(0);
          }
        }

        .intro-header {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          margin-bottom: 25px;
          padding: 10px 30px;
        }

        .intro-content {
          flex: 1;
          min-width: 0;
          text-align: left;
        }

        .search-bar-wrapper {
          width: 500px;
          max-width: 500px;
          flex-shrink: 0;
          margin: 0;
          padding: 0;
        }

        .premium-search-input {
          width: 100%;
          padding: 14px 20px;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          outline: none;
          font-size: 14px;
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .premium-search-input:focus {
          border-color: #00adb5;
          box-shadow: 0 4px 15px rgba(0, 173, 181, 0.12);
        }



        @media (max-width: 900px) {

          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .intro-header {
            gap: 20px;
            padding: 10px 20px;
          }

          .search-bar-wrapper {
            width: 380px;
            max-width: 380px;
          }

          .main-heading {
            font-size: 22px !important;
          }

          .sub-heading {
            font-size: 13px !important;
          }
        }


        @media (max-width: 600px) {
          .intro-header {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            padding: 10px 15px;
          }

          .intro-content {
            width: 100%;
            text-align: center;
          }

          .main-heading {
            font-size: 26px !important;
          }

          .sub-heading {
            font-size: 12px !important;
          }

          .search-bar-wrapper {
            width: 100%;
            max-width: 100%;
          }

          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
        }

      `}</style>


      {/* =========================
          TOP HEADER
      ========================= */}

      <div className="intro-header">

        {/* LEFT SIDE TEXT */}

        <div className="intro-content">

          <div style={styles.topBadge}>
            ✨ Latest Smartphones
          </div>

          <h1
            className="main-heading"
            style={styles.mainHeading}
          >
            <span style={styles.headingIcon}>
              📱
            </span>

            Premium Smart Store
          </h1>

          <p
            className="sub-heading"
            style={styles.subHeading}
          >
            Discover the latest smartphones, powerful performance
            and amazing technology.
          </p>

        </div>


        {/* RIGHT SIDE SEARCH */}

        <div className="search-bar-wrapper">

          <input
            type="text"
            placeholder="🔍 Search smartphones by name or brand manufacturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="premium-search-input"
          />

        </div>

      </div>


      {/* =========================
          LOADING / PRODUCTS
      ========================= */}

      {loading ? (

        <div className="loading-text">

          Fetching latest smartphones

          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>

        </div>

      ) : (

        <div
          className="product-grid"
          style={styles.grid}
        >

          {filteredMobiles.length === 0 ? (

            <div style={styles.emptyBox}>

              <div style={styles.emptyIcon}>
                📱
              </div>

              <h3 style={styles.emptyTitle}>
                No Results Found
              </h3>

              <p style={styles.emptyText}>
                Try searching for another smartphone model or
                brand manufacturer.
              </p>

            </div>

          ) : (

            filteredMobiles.map((mobile) => (

              <div
                key={mobile._id || mobile.id}
                className="store-card"
                style={styles.card}
              >

                {/* IMAGE */}

                <div
                  className="image-container"
                  style={styles.imageContainer}
                >

                  <div style={styles.imageBrand}>
                    {mobile.brand}
                  </div>

                  <img
                    src={mobile.image}
                    alt={mobile.name}
                    className="store-image"
                    style={styles.img}
                  />

                </div>


                {/* CONTENT */}

                <div style={styles.content}>

                  <span style={styles.brandBadge}>
                    {mobile.brand}
                  </span>

                  <h3 style={styles.mobileTitle}>
                    {mobile.name}
                  </h3>


                  {/* BATTERY + CAMERA */}

                  <div style={styles.specContainer}>

                    <span style={styles.specItem}>
                      🔋 {mobile.battery}
                    </span>
                  </div>


                  {/* RAM + STORAGE */}

                  <div style={styles.extraSpecs}>

                    <span>
                      RAM: {mobile.ram}
                    </span>

                    <span>
                      Storage: {mobile.storage}
                    </span>

                  </div>


                  {/* PRICE + BUTTON */}

                  <div style={styles.footerRow}>

                    <div>

                      <small style={styles.priceLabel}>
                        Starting from
                      </small>

                      <div style={styles.priceText}>
                        ₹
                        {Number(
                          mobile.price || 0
                        ).toLocaleString('en-IN')}
                      </div>

                    </div>

                  <Link
      to={`/product/${mobile._id || mobile.id}`}
      className="view-details-btn"
    >
      View Details →
    </Link>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      )}

    </div>
  );
}
const styles = {

  container: {
    fontFamily: '"Inter","Segoe UI",Arial, sans-serif',
    background:
      'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
    minHeight: '100vh'
  },


  topBadge: {
    display: 'inline-block',
    background:
      'linear-gradient(135deg, #e0f2fe, #ede9fe)',
    color: '#475569',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    marginBottom: '8px',
    border: '1px solid #e2e8f0'
  },


  mainHeading: {
    margin: 0,
    fontSize: '32px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.8px'
  },


  headingIcon: {
    display: 'inline-block',
    marginRight: '7px'
  },


  subHeading: {
    maxWidth: '600px',
    margin: '7px 0 0',
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#64748b'
  },


  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fill, minmax(245px, 1fr))',
    gap: '25px',
    padding: '0 24px 50px 24px',
    maxWidth: '1200px',
    margin: '0 auto'
  },


  card: {
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column'
  },


  imageContainer: {
    background: '#f8fafc',
    padding: '30px 20px 20px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '180px',
    position: 'relative'
  },


  imageBrand: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    fontSize: '10px',
    fontWeight: 'bold',
    background: '#e2e8f0',
    padding: '2px 8px',
    borderRadius: '4px',
    color: '#475569',
    textTransform: 'uppercase'
  },


  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  },


  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },


  brandBadge: {
    alignSelf: 'flex-start',
    background: '#e0f2fe',
    color: '#0369a1',
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase'
  },


  mobileTitle: {
    margin: '10px 0 6px 0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b'
  },


  specContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '6px'
  },

  extraSpecs: {
    display: 'flex',
    gap: '10px',
    fontSize: '11px',
    color: '#94a3b8',
    marginBottom: '20px'
  },


  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  },


  priceLabel: {
    fontSize: '10px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    display: 'block'
  },


  priceText: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    marginTop: '2px'
  },


  emptyBox: {
    gridColumn: '1/-1',
    textAlign: 'center',
    padding: '50px 20px',
    color: '#94a3b8'
  },


  emptyIcon: {
    fontSize: '48px',
    marginBottom: '10px'
  },


  emptyTitle: {
    margin: '0 0 6px 0',
    fontSize: '18px',
    color: '#475569',
    fontWeight: '700'
  },


  emptyText: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b'
  }

};

export default WelCome;

