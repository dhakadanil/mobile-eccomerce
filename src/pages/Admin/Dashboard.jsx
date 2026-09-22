import React from 'react';
import { useDashboard } from '../../hooks/useDashboard ';
import { Link } from 'react-router';

function Dashboard() {
  const { 
    mobiles, loading, handleDelete, navigateToAdd, stats,
    searchTerm, setSearchTerm, selectedBrand, setSelectedBrand, uniqueBrands } = useDashboard();

  return (
    <div className="dashboard-responsive-container" style={styles.container}>
      
      <div className="dashboard-header" style={styles.header}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b', fontWeight: '800' }}>📱 Admin Panel - Inventory Management</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Manage your mobile models, pricing, and live stock registry.</p>
        </div>
        <button onClick={navigateToAdd} className="dashboard-add-btn" style={styles.addBtn}>
          ➕ Add New Mobile
        </button>
      </div>

      <div className="dashboard-stats-grid" style={styles.statsGrid}>
        <div style={{ ...styles.card, borderLeft: '4px solid #00adb5', borderRight: '4px solid #c3cf0f', borderTop: '4px solid #aa0faa' }}>
          <span style={styles.cardLabel}>Total Models</span>
          <span style={styles.cardValue}>{stats?.totalProducts || 0}</span>
        </div>
        <div style={{ ...styles.card, borderLeft: '4px solid #2e7d32', borderRight: '4px solid #c3cf0f', borderTop: '4px solid #d1243b' }}>
          <span style={styles.cardLabel}>Total Stock Quantity</span>
          <span style={styles.cardValue}>{stats?.totalStock || 0} Pcs</span>
        </div>
        <div style={{ ...styles.card, borderLeft: '4px solid #d32f2f', borderRight: '4px solid #c3cf0f', borderTop: '4px solid #21d411' }}>
          <span style={styles.cardLabel}>Out of Stock</span>
          <span style={{ ...styles.cardValue, color: stats?.outOfStock > 0 ? '#d32f2f' : '#1e293b' }}>
            {stats?.outOfStock || 0}
          </span>
        </div>
      </div>

      <div className="filter-bar" style={styles.filterBar}>
        <input 
          type="text" 
          placeholder="🔍 Search mobile model name (e.g. iPhone, SAMSUNG)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Case management hook ke andar automatically .toLowerCase() se handled hai
          style={styles.filterInput}
        />
<select
  value={selectedBrand}
  onChange={(e) => setSelectedBrand(e.target.value)}
  className="responsive-native-select"
  style={styles.filterSelect}
>
  <option value="">All Brands</option>

  {uniqueBrands && uniqueBrands.map((brand) => (
    <option key={brand} value={brand}>
      {brand.length > 15 ? `${brand.substring(0, 15)}...` : brand}
    </option>
  ))}
</select>


      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Loading inventory...</p>
      ) : (
        <div className="table-responsive-wrapper">
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Mobile Name</th>
                <th style={styles.th}>Brand</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {!mobiles || mobiles.length === 0 ? (
                <tr>
                  <td colSpan="6" style={styles.emptyTd}>Koi mobile data nahi mila. Pehle add karein!</td>
                </tr>
              ) : (
                mobiles.map((mobile) => (
                  <tr key={mobile.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <img src={mobile.image} alt={mobile.name} style={styles.img} />
                    </td>
                    <td style={styles.td}>
                      <strong>{mobile.name}</strong>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{mobile.ram} | {mobile.storage}</div>
                    </td>
                    <td style={{ ...styles.td, color: '#555' }}>{mobile.brand}</td>
                    <td style={{ ...styles.td, fontWeight: 'bold', color: '#2e7d32' }}>
                      ₹{mobile.price ? Number(mobile.price).toLocaleString('en-IN') : '0'}
                    </td>
                    <td style={styles.td}>
                      <span style={Number(mobile.stock) === 0 ? styles.badgeOut : styles.stockBadge}>
                        {mobile.stock} Left
                      </span>
                    </td>
                    <td style={styles.actionCell}>
                      <Link to={`/admin/edit/${mobile.id}`} className="premium-edit-btn">
                        Edit ✏️
                      </Link>
                      <button onClick={() => handleDelete(mobile.id)} className="premium-delete-btn">
                        Delete 🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .table-responsive-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          border-radius: 8px;
        }
        .premium-edit-btn {
          background: #c6da1b;
          color: white;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          display: inline-block;
          text-align: center;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .premium-edit-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 4px 10px rgba(198, 218, 27, 0.35);
        }
        .premium-delete-btn {
          background: #ff5252;
          color: white;
          border: none;
          padding: 8px 14px;
          cursor: pointer;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .premium-delete-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 4px 10px rgba(255, 82, 82, 0.35);
        }
        .dashboard-stats-grid {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
          width: 100%;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          border-bottom: 2px solid #eee;
          padding-bottom: 15px;
          gap: 15px;
        }
        .filter-bar {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          width: 100%;
        }
.responsive-native-select {
  width: 100%;
  min-width: 0 !important;
  max-width: 100% !important;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

  .filter-bar { display: flex; gap: 15px; margin-bottom: 20px; width: 100%; }


        @media (max-width: 768px) {
          .dashboard-header {
            display: flex !important;
            justify-content: space-between !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 15px !important;
          }
          .dashboard-add-btn {
            width: 200px !important;
            padding: 12px !important;
            align-self: flex-end !important; 
          }
          .dashboard-stats-grid {
            flex-direction: column !important;
            gap: 15px !important;
          }
           .filter-bar {
    flex-direction: column !important;
    gap: 12px !important;
    width: 100%;
    box-sizing: border-box;
  }
             
  .filter-input,
  .responsive-native-select {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Arial, sans-serif' },
  addBtn: { background: '#00adb5', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 6px rgba(0, 173, 181, 0.2)', transition: 'all 0.2s ease' },
  statsGrid: { display: 'flex', gap: '20px', marginBottom: '25px' },
  card: { flex: 1, background: '#f8fafc', padding: '15px 20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '4px', border: '1px solid #e2e8f0' },
  cardLabel: { fontSize: '12px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' },
  cardValue: { fontSize: '20px', fontWeight: 'bold', color: '#1e293b' },
  filterBar: { display: 'flex', gap: '15px', marginBottom: '20px' },
  filterInput: { flex: 2, padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '14px', background: '#ffffff', boxSizing: 'border-box' },
  filterSelect: {
  flex: 1,
  minWidth: 0,
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  outline: 'none',
  fontSize: '14px',
  background: '#ffffff',
  boxSizing: 'border-box',
  cursor: 'pointer'
},


  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', overflow: 'hidden' },
  tableHeaderRow: { background: '#1e1e24', color: 'white' },
  th: { padding: '15px', whiteSpace: 'nowrap' },
  tableRow: { borderBottom: '1px solid #eee' },
  td: { padding: '15px', whiteSpace: 'nowrap' },
  actionCell: { padding:'25px', display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' },
  emptyTd: { padding: '20px', textAlign: 'center', color: '#888' },
  img: { width: '50px', height: '50px', objectFit: 'contain', borderRadius: '4px', background: '#f9f9f9' },
  
  stockBadge: { background: '#e8f5e9', color: '#2e7d32', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' },
  badgeOut: { background: '#ffebee', color: '#c62828', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }
};

export default Dashboard;
