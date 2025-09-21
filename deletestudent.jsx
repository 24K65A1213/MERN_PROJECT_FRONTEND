import React, { useState } from 'react';

const formStyle = {
  maxWidth: 400,
  margin: '40px auto',
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const inputStyle = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 16,
  marginBottom: 12,
  width: '100%',
};
const btnStyle = {
  padding: '10px 24px',
  borderRadius: 8,
  border: 'none',
  background: '#d32f2f',
  color: '#fff',
  fontWeight: 500,
  cursor: 'pointer',
  marginTop: 8,
};

export default function DeleteStudent() {
  const [rollnumber, setRollnumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollnumber }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setMessage('Student deleted successfully!');
        setRollnumber('');
      } else {
        setMessage(data.message || 'Failed to delete student');
      }
    } catch {
      setMessage('Failed to delete student');
    }
    setSubmitting(false);
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{ color: '#d32f2f', marginBottom: 16 }}>Delete Student Result</h2>
      <input name="rollnumber" type="text" placeholder="Roll Number" required style={inputStyle} value={rollnumber} onChange={e => setRollnumber(e.target.value)} />
      <button type="submit" style={btnStyle} disabled={submitting}>{submitting ? 'Deleting...' : 'Delete Student'}</button>
      {message && <div style={{ color: message.includes('successfully') ? 'green' : 'red', marginTop: 12 }}>{message}</div>}
    </form>
  );
}
