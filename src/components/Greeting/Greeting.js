import React from "react";
const token = localStorage.getItem("token");

function Greeting() {
  return (
    <div>
      <p className="my-2">Welcome, User 👋</p>
    </div>
  );
}

export default Greeting;
