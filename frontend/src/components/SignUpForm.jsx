import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
// import { signup } from "../store/authSlice";
import { Button, Input } from "./index.js";
import classNames from "classnames";
import { registerUser as fetchUserSignup } from "../axios/apiService";

export function SignUpForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUserSignup(formData);
      console.log(formData);
      if (response) {
        // dispatch(signup(response.user));
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form
      className={classNames("flex flex-col gap-6", className)}
      onSubmit={handleSignup}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Input
            label="Username"
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
