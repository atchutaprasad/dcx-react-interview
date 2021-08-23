import React from 'react';

import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
      Welcome to the Home Page! Go to <NavLink activeClassName="active" to="/login">Login</NavLink>
    </div>
  );
}

export default Home;
