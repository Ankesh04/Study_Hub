// src/pages/Login.jsx

import { useState } from 'react';
import './Login.css';
import { auth, provider, db } from '../firebaseConfig';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    studentClass: '',
    branch: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignup) {
        // Signup logic
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await setDoc(doc(db, 'users', user.uid), {
          email: formData.email,
          studentClass: formData.studentClass,
          branch: formData.branch || null,
          progress: {},
        });

        setSuccess("Signup successful! Redirecting...");
      } else {
        // Login logic
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccess("Login successful! Redirecting...");
      }

      setTimeout(() => {
        navigate('/');
        setLoading(false);
      }, 3000); // 3-second delay before redirect
    } catch (err) {
      console.error("Auth Error:", err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        progress: {},
      });

      setSuccess("Google login successful! Redirecting...");
      setTimeout(() => {
        navigate('/');
        setLoading(false);
      }, 3000); // 3-second delay
    } catch (err) {
      console.error("Google Login Error:", err.message);
      setError("Google sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {loading && <p style={{ color: 'blue' }}>Please wait...</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />

        <label>Class</label>
        <select
          name="studentClass"
          required
          value={formData.studentClass}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="">Select Class</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>

        {(formData.studentClass === '11' || formData.studentClass === '12') && (
          <>
            <label>Branch</label>
            <select
              name="branch"
              required
              value={formData.branch}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select Branch</option>
              <option value="PCM">PCM</option>
              <option value="PCB">PCB</option>
            </select>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? (isSignup ? 'Signing Up...' : 'Logging In...') : isSignup ? 'Sign Up' : 'Login'}
        </button>

        {!isSignup && (
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              marginTop: '1rem',
              backgroundColor: '#db4437',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Please wait...' : 'Login with Google'}
          </button>
        )}

        <p style={{ marginTop: '1rem' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
              setSuccess('');
            }}
            disabled={loading}
            style={{
              color: '#db4437',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
