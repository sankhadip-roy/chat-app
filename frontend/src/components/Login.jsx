import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userloggedin } from "../atom/userAtom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userloggedin);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://sankha-chatappb-serveit.codecult.tech/login",
        //.post("http://localhost:3001/login", //for local development
        {
          name,
          password,
        }
      )
      .then((result) => {
        if (result.data.stat === "Success") {
          // console.log(result); //log
          setUser(result.data.name);
          // localStorage.setItem('user', JSON.stringify(user)); // locally storing the logged in user
          navigate("/");
          alert("Login successful: " + result.data.name); //using result.data.name instead of user because useRecoilState is a asyncronous function taking time in updating the user variable
        } else {
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          Login to your account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mt-4">
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
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Login
              </button>
              <Link
                to="/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Don't have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
