import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const pageStyle = {
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)',
  boxSizing: 'border-box',
};
const cardStyle = {
  maxWidth: 400,
  width: '100%',
  background: 'linear-gradient(135deg, #f0f4ff 0%, #e0f7fa 100%)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(80,80,160,0.15)',
  padding: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1.5px solid #e0e7ff',
};
const headerStyle = {
  textAlign: 'center',
  marginBottom: 24,
};
const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,
  margin: '48px 0',
};
const navBtnStyle = {
  padding: '14px 36px',
  borderRadius: 10,
  border: 'none',
  background: '#1976d2',
  color: '#fff',
  fontWeight: 600,
  fontSize: 20,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(25,118,210,0.10)',
  marginBottom: 0,
  transition: 'background 0.2s',
};
const formStyle = {
  display: 'flex',
  gap: 16,
  marginBottom: 32,
  flexWrap: 'wrap',
  alignItems: 'center',
};
const inputStyle = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 16,
};
const addBtnStyle = {
  ...navBtnStyle,
  background: '#43a047',
};
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: 32,
};
const thStyle = {
  background: '#1976d2',
  color: '#fff',
  padding: '12px 8px',
  fontWeight: 600,
};
const tdStyle = {
  padding: '10px 8px',
  borderBottom: '1px solid #eee',
  textAlign: 'center',
};
const actionBtnStyle = {
  ...navBtnStyle,
  background: '#ffa000',
  marginRight: 8,
};
const deleteBtnStyle = {
  ...navBtnStyle,
  background: '#d32f2f',
};
const footerStyle = {
  textAlign: 'center',
  color: '#888',
  marginTop: 40,
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    rollnumber: '',
    subjects: '',
    marks: '',
    total: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchStudents = () => {
    setLoading(true);
    fetch('http://localhost:5000/aread')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 201) {
        setForm({ name: '', rollnumber: '', subjects: '', marks: '', total: '' });
        fetchStudents();
      } else {
        setError(data.message || 'Failed to add result');
      }
    } catch {
      setError('Failed to add result');
    }
    setSubmitting(false);
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <img
          src="https://sasi.ac.in/wp-content/uploads/2024/08/SASI-LOGO-960x188-1-800x157-1.png"
          alt="Sasi Institute of Technology & Engineering"
          style={{ width: 180, marginBottom: 8 }}
        />
        <h1 style={{ fontSize: 32, margin: 0, color: '#1976d2' }}>Administrator Portal</h1>
        <p style={{ color: '#333', fontSize: 18, marginTop: 8 }}>Results Management</p>
      </div>


      {/* Navigation */}
      <nav style={navStyle}>
        <button style={navBtnStyle} onClick={() => navigate('/admin/create')}>Add</button>
        <button style={navBtnStyle} onClick={() => navigate('/admin/read')}>View</button>
        <button style={navBtnStyle} onClick={() => navigate('/admin/update')}>Update</button>
        <button style={navBtnStyle} onClick={() => navigate('/admin/delete')}>Delete</button>
      </nav>

      {/* Footer */}
      <footer style={footerStyle}>
        <p>© 2025 Sasi College | Administrator Portal</p>
      </footer>
      </div>
    </div>
  );
};

export default AdminPage;