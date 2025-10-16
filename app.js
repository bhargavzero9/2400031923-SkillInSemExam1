import React, { useState, useEffect } from 'react';

// Regular expressions for basic validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /.{6,}/; // Simple check: password must be at least 6 characters

function FormValidation() {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // State to track if the form is valid
  const [isFormValid, setIsFormValid] = useState(false);

  // useEffect Hook to run validation whenever email or password changes
  useEffect(() => {
    // 1. Validate Email
    if (email === '') {
      // Don't show an error initially, but mark form as invalid
      setEmailError('');
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }

    // 2. Validate Password
    if (password === '') {
      // Don't show an error initially, but mark form as invalid
      setPasswordError('');
    } else if (!PASSWORD_REGEX.test(password)) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }

    // 3. Update Form Validity State
    // The form is valid only if BOTH fields are not empty AND there are no errors.
    const valid = email !== '' && password !== '' && EMAIL_REGEX.test(email) && PASSWORD_REGEX.test(password);
    setIsFormValid(valid);

  }, [email, password]); // Dependency array: Re-run this effect when email or password changes

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      // Log for demonstration (e.g., this is where you'd send data to a server)
      console.log('Form Submitted Successfully!', { email, password });
      alert(`Submission successful!\nEmail: ${email}`);

      // Optional: Clear form after successful submission
      // setEmail('');
      // setPassword('');

    } else {
      // This case shouldn't happen if the button is disabled, but good for security
      console.error('Form has validation errors.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login Form Validation</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Email Input Field */}
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
          {/* Show error message if emailError state is set */}
          {emailError && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {emailError}
            </p>
          )}
        </div>

        {/* Password Input Field */}
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
          {/* Show error message if passwordError state is set */}
          {passwordError && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {passwordError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          // Button is disabled if isFormValid is false
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
        {/* Optional: Status message */}
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