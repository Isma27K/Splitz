import React, { useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';


declare global {
  interface Window {
    LoginApi: {
      login: (credentials: { email: string; password: string }) => Promise<any>;
      firstRun: () => Promise<boolean>;
    };
    electronAPI: {
      notify: (title: string, body: string) => void;
    };
  }
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();


  useEffect(() => {
    window.LoginApi.firstRun().then((isFirstRun) => {
        console.log('Is first run:', isFirstRun);
        if (isFirstRun) {
            nav('/dashboard');
            console.log('First run detected, navigating to dashboard.');
        }
    }).catch((err) => { console.error('Error checking first run:', err);})
  }, [])


  const validate = () => {
    if (!email) return 'Email is required';
    // simple email regex
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!re.test(email)) return 'Please enter a valid email';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');
    setLoading(true);
    // simulate async login
    setTimeout(async () => {
      setLoading(false);
      // placeholder: replace with IPC call or real auth
      const result = await window.LoginApi.login({ email, password });

      if (result.success) {
        // successful login - you can emit IPC event here
        console.log('login success');
        nav('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    }, 900);
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={onSubmit} noValidate>
        <h1 className="login-title">Welcome Back</h1>

        <label className="field">
          <span className="label-text">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input"
            aria-label="Email"
            required
          />
        </label>

        <label className="field">
          <span className="label-text">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input"
            aria-label="Password"
            required
          />
        </label>

        {error && <div className="error">{error}</div>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="login-help">
          <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;