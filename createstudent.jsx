import React, { useState } from 'react';

const inputStyle = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 16,
  marginBottom: 12,
  width: '100%',
};
const pageStyle = {
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  boxSizing: 'border-box',
};
const formStyle = {
  maxWidth: 400,
  width: '100%',
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};
const btnStyle = {
  padding: '10px 24px',
  borderRadius: 8,
  border: 'none',
  background: '#43a047',
  color: '#fff',
  fontWeight: 500,
  cursor: 'pointer',
  marginTop: 8,
};

export default function CreateStudent() {
  const [form, setForm] = useState({
    name: '',
    rollnumber: '',
    subjects: '',
    marks: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 201) {
        setMessage('Student result added successfully!');
        setForm({ name: '', rollnumber: '', subjects: '', marks: '' });
      } else {
        setMessage(data.message || 'Failed to add result');
      }
    } catch {
      setMessage('Failed to add result');
    }
    setSubmitting(false);
  };

  return (
    <div style={pageStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ color: '#43a047', marginBottom: 16 }}>Add New Student Result</h2>
        <input name="name" type="text" placeholder="Student Name" required style={inputStyle} value={form.name} onChange={handleChange} />
        <input name="rollnumber" type="text" placeholder="Roll Number" required style={inputStyle} value={form.rollnumber} onChange={handleChange} />
        <input name="subjects" type="text" placeholder="Subject" required style={inputStyle} value={form.subjects} onChange={handleChange} />
        <input name="marks" type="number" placeholder="Marks" required style={inputStyle} value={form.marks} onChange={handleChange} />
        <button type="submit" style={btnStyle} disabled={submitting}>{submitting ? 'Adding...' : 'Add Result'}</button>
        {message && <div style={{ color: message.includes('successfully') ? 'green' : 'red', marginTop: 12 }}>{message}</div>}
      </form>
    </div>
  );
}
