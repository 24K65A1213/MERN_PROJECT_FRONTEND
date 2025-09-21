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
  background: '#1976d2',
  color: '#fff',
  fontWeight: 500,
  cursor: 'pointer',
  marginTop: 8,
};

export default function UpdateStudent() {
  const [form, setForm] = useState({
    rollnumber: '',
    name: '',
    subjects: '',
    marks: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [studentFound, setStudentFound] = useState(false);

  // Fetch student data by rollnumber when field loses focus
  const handleRollBlur = async () => {
    if (!form.rollnumber) return;
    try {
      const res = await fetch(`http://localhost:5000/aread`);
      const students = await res.json();
      const student = students.find(s => s.rollnumber === form.rollnumber || s.name === form.name);
      if (student) {
        setForm({
          rollnumber: student.rollnumber,
          name: student.name,
          subjects: student.subjects || '',
          marks: student.marks || '',
        });
        setStudentFound(true);
        setMessage('Student found. You can update the details.');
      } else {
        setStudentFound(false);
        setMessage('No matching student found. Enter details to update.');
      }
    } catch {
      setStudentFound(false);
      setMessage('Could not fetch student data.');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 200) {
        setMessage('Student result updated successfully!');
      } else {
        setMessage(data.message || 'Failed to update result');
      }
    } catch {
      setMessage('Failed to update result');
    }
    setSubmitting(false);
  };

  return (
    <div style={pageStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Update Student Result</h2>
        <input
          name="rollnumber"
          type="text"
          placeholder="Roll Number"
          required
          style={inputStyle}
          value={form.rollnumber}
          onChange={handleChange}
          onBlur={handleRollBlur}
        />
        <input
          name="name"
          type="text"
          placeholder="Student Name"
          style={inputStyle}
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="subjects"
          type="text"
          placeholder="Subject"
          style={inputStyle}
          value={form.subjects}
          onChange={handleChange}
        />
        <input
          name="marks"
          type="number"
          placeholder="Marks"
          style={inputStyle}
          value={form.marks}
          onChange={handleChange}
        />
        <button type="submit" style={btnStyle} disabled={submitting}>{submitting ? 'Updating...' : 'Update Result'}</button>
        {message && <div style={{ color: message.includes('successfully') ? 'green' : 'red', marginTop: 12 }}>{message}</div>}
      </form>
    </div>
  );
}
