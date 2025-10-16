import React, { useState, useEffect } from 'react';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /.{6,}/; 

function FormValidation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (email === '') {
      setEmailError('');
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
    if (password === '') {
      setPasswordError('');
    } else if (!PASSWORD_REGEX.test(password)) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
    const valid = email !== '' && password !== '' && EMAIL_REGEX.test(email) && PASSWORD_REGEX.test(password);
    setIsFormValid(valid);

  }, [email, password]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      console.log('Form Submitted Successfully!', { email, password });
      alert(`Submission successful!\nEmail: ${email}`);
    } else {

      console.error('Form has validation errors.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login Form Validation</h2>
      <form onSubmit={handleSubmit}>
        
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
         
          {emailError && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {emailError}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
          {passwordError && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {passwordError}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            padding: '10px 15px',
            backgroundColor: isFormValid ? 'blue' : 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
        >
          Submit
        </button>
        {!isFormValid && (
             <p style={{ color: 'orange', fontSize: '14px', marginTop: '10px' }}>
                Fill out the form correctly to enable submission.
             </p>
        )}
      </form>
    </div>
  );
}


export default FormValidation;
