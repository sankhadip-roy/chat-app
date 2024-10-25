import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(
        "https://sankha-chatappb-serveit.codecult.tech/register",
        // .post("http://localhost:3001/register", //for local development
        { name, email, password }
      )
      .then((result) => {
        console.log(result);
        localStorage.setItem("userData", JSON.stringify(result.data));
        // navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again." + err);
      });
    // localStorage.setItem('userData', JSON.stringify(response));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create an account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-full px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mb-4"
              >
                Sign Up
              </button>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
