import React from 'react';
import { useAddMobile } from '../../hooks/useAddMobile';

function CancelButton({ onClick, text }) {
  return (
    <button onClick={onClick} type="button" className="premium-cancel-btn">
      {text}
    </button>
  );
}

function AddMobile() {
  const { formData, loading, isEditMode, handleChange, handleSubmit, handleBack } = useAddMobile();
    
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTextGroup}>
          <h2 style={styles.title}>{isEditMode ? '✏️ Modify Device Specifications' : '📱 Register New Device'}</h2>
          <p style={styles.subtitle}>Insert technical parameters to update the global network catalog.</p>
        </div>
        <CancelButton onClick={handleBack} text="← Back" />
      </div>

      <form onSubmit={handleSubmit} className="premium-responsive-form" style={styles.form}>
        
        <div className="form-section-title">01. Core Identity</div>
        <div className="responsive-form-row">
          <div className="responsive-form-col">
            <label style={styles.label}>Device Model Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. iPhone 17 Pro" style={styles.input} />
          </div>
          <div className="responsive-form-col">
            <label style={styles.label}>Brand Manufacturer</label>
            <input type="text" name="brand" required value={formData.brand} onChange={handleChange} placeholder="e.g. Apple" style={styles.input} />
          </div>
        </div>

        <div className="form-section-title">02. Commercial Matrix</div>
        <div className="responsive-form-row">
          <div className="responsive-form-col">
            <label style={styles.label}>Retail Price (INR)</label>
            <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="99999" style={styles.input} />
          </div>
          <div className="responsive-form-col">
            <label style={styles.label}>Warehouse Stock Quantity</label>
            <input type="number" name="stock" required value={formData.stock} onChange={handleChange} placeholder="15" style={styles.input} />
          </div>
        </div>

        <div className="form-section-title">03. Hardware Matrix Specs</div>
        <div className="responsive-form-row">
          <div className="responsive-form-col">
            <label style={styles.label}>RAM Configuration</label>
            <input type="text" name="ram" required value={formData.ram} onChange={handleChange} placeholder="e.g. 12GB LPDDR5X" style={styles.input} />
          </div>
          <div className="responsive-form-col">
            <label style={styles.label}>Storage Capacity</label>
            <input type="text" name="storage" required value={formData.storage} onChange={handleChange} placeholder="e.g. 256GB NVMe" style={styles.input} />
          </div>
        </div>

        <div className="responsive-form-row">
          <div className="responsive-form-col">
            <label style={styles.label}>Camera Setup Sensors</label>
            <input type="text" name="camera" required value={formData.camera} onChange={handleChange} placeholder="e.g. 50MP Triple Matrix" style={styles.input} />
          </div>
          <div className="responsive-form-col">
            <label style={styles.label}>Battery & Charging</label>
            <input type="text" name="battery" required value={formData.battery} onChange={handleChange} placeholder="e.g. 5200 mAh" style={styles.input} />
          </div>
        </div>

        <div className="form-section-title">04. Storefront Media Assets</div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Display Image URL</label>
          <input type="url" name="image" required value={formData.image} onChange={handleChange} placeholder="Paste live image content link" style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Device Summary / Marketing Description</label>
          <textarea name="description" required value={formData.description} onChange={handleChange} placeholder="Write a precise design statement..." style={styles.textarea} />
        </div>

        <div style={styles.actionRow}>
          <button type="submit" disabled={loading} className="premium-submit-btn" style={loading ? styles.submitBtnDisabled : null}>
            {loading ? (
              <div style={styles.loaderContainer}>
                <span style={styles.spinner}></span> Syncing Registry...
              </div>
            ) : (isEditMode ? 'Update Product Data ✨' : 'Commit Registry 🚀')}
          </button>
        </div>
      </form>

      <style>{`
        @keyframes dynamicSlideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .responsive-form-row { display: flex; gap: 28px; margin-bottom: 24px; width: 100%; }
        .responsive-form-col { flex: 1; display: flex; flex-direction: column; }

        .form-section-title {
          font-size: 11px; font-weight: 700; color: #00adb5; text-transform: uppercase;
          letter-spacing: 1.5px; margin: 10px 0 20px 0; display: flex; align-items: center;
        }
        .form-section-title::after { content: ''; flex: 1; height: 1px; background: #f1f5f9; margin-left: 15px; }

        @media (max-width: 680px) {
          .premium-responsive-form { padding: 24px 16px !important; border-radius: 16px !important; }
          .responsive-form-row { flex-direction: column !important; gap: 16px !important; margin-bottom: 16px !important; }
          .premium-submit-btn { width: 100% !important; padding: 14px !important; }
        }

        .premium-cancel-btn {
          background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
          color: white; border: none; padding: 10px 22px; border-radius: 12px; cursor: pointer;
          font-weight: 700; font-size: 13px; box-shadow: 0 4px 15px rgba(255, 75, 43, 0.25);
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .premium-cancel-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 6px 20px rgba(255, 75, 43, 0.4); }

        .premium-submit-btn {
          padding: 12px 32px;
          background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
          color: white; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .premium-submit-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 6px 22px rgba(79, 172, 254, 0.45); }
        
        input:focus, textarea:focus { border-color: #00adb5 !important; background: #ffffff !important; box-shadow: 0 0 0 3px rgba(0, 173, 181, 0.1) !important; }
      `}</style>
    </div>
  );
}

const styles = {
  container: { maxWidth: '820px', margin: '0 auto 40px auto', fontFamily: '"Inter", sans-serif', padding: '0 24px', animation: 'dynamicSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '20px', paddingTop: '10px' },
  headerTextGroup: { display: 'flex', flexDirection: 'column' },
  title: { margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.75px' },
  subtitle: { margin: '5px 0 0 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' },
  form: { background: '#ffffff', padding: '40px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.035), 0 0 2px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' },
  formGroup: { marginBottom: '24px', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '13px' },
  input: { padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', outline: 'none', background: '#f8fafc', color: '#0f172a' },
  textarea: { padding: '14px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', outline: 'none', background: '#f8fafc', color: '#0f172a', minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' },
  actionRow: { display: 'flex', justifyContent: 'flex-end', marginTop: '35px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' },
  submitBtnDisabled: { background: '#cbd5e1', color: '#94a3b8', cursor: 'not-allowed', boxShadow: 'none', transform: 'none' },
  loaderContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  spinner: { width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }
};

export default AddMobile;
