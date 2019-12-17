import React from "react";

const Login = () => {
  return (
    <div>
      <div>
        <h1>Login page</h1>
        <form action="http://localhost:3001/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
