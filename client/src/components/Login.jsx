import React from 'react';

function Login() {
  return (
    <div className="container mt-5">
      <h1>Login</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">

              <form action="/login" method="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" name="username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" />
                </div>
                <button type="submit" className="btn btn-dark">Login</button>
              </form>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
