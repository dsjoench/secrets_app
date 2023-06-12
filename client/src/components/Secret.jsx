import React, { useState, useEffect } from "react";

function Secret() {
  const [usersWithSecret, setUsersWithSecret] = useState([]);

  useEffect(() => {
    fetch("/secrets")
      .then(response => response.json())
      .then(data => {
        setUsersWithSecret(data.foundUsers);

      })
  }, []);

  return (
    <div className="jumbotron text-center">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">You've Discovered My Secret!</h1>

        {usersWithSecret.map(user => (
          <p className="secret-text" key={user._id}>{user.secret}</p>
        ))}

        <a className="btn btn-light btn-lg" href="/" role="button">Log Out</a>
        <a className="btn btn-dark btn-lg" href="/submit" role="button">Submit a Secret</a>
      </div>
    </div>
  );
}

export default Secret;
