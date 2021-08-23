import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3001/login', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      if(response.data.error){
        setError("Something went wrong. Please try again later with Username: test and Password: test ");
      }else{
        setUserSession(response.data.token, response.data.user);
        props.history.push('/dashboard');
      }
      
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong, Check API services..");
    });
  }

  return (
    <div className="container"> 

      <form method="post" className="loginForm">
      <div className="mb-3">
          <h4>DCX Login details</h4>
        </div>
        <div className="mb-3">
          <label  className="form-label">Username</label>
          <input type="text" className="form-control" {...username} autoComplete="new-password" placeholder="user name"/>
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input type="password" className="form-control" {...password} autoComplete="new-password"  placeholder="password"/>
        </div>
        <div className="mb-3">
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <div className="form-group">
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} className="btn btn-primary btn-block btn-lg"/>
          </div>
        </div>
				</form>

      
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;