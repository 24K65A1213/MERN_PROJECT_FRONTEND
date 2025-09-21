import React, { useEffect, useState } from 'react';

const pageStyle = {
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  boxSizing: 'border-box',
};
const cardStyle = {
  maxWidth: 700,
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

export default function ReadStudent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/aread')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#1976d2', marginBottom: 16 }}>All Student Results</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Roll No</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Marks</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={tdStyle}>Loading...</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan={5} style={tdStyle}>No data available</td></tr>
            ) : (
              students.map(student => (
                <tr key={student._id}>
                  <td style={tdStyle}>{student.name}</td>
                  <td style={tdStyle}>{student.rollnumber}</td>
                  <td style={tdStyle}>{student.subjects || '-'}</td>
                  <td style={tdStyle}>{student.marks}</td>
                  <td style={tdStyle}>{student.total || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
