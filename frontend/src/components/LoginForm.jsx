import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import classNames from "classnames";
import { fetchUserlogin } from "../axios/apiService";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const response = await fetchUserlogin(userData);
      console.log(response);
      if (response) {
        dispatch(login(response.user));
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while logging in";
      setErrors({
        message: errorMessage,
        status: error.response?.data?.statusCode || 500,
      });
      console.error("Login error:", {
        message: errorMessage,
        status: error.response?.status,
        error,
      });
    }
  };

  return (
    <form
      className={classNames("flex flex-col gap-6", className)}
      onSubmit={handleLogin}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.message}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Link
              to="#"
              className="ml-auto text-text text-sm underline-offset-4 hover:underline hover:text-white"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-8 -translate-y-1/5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm">
          <span className="relative z-10 bg-[#09090b] px-2 text-muted-foreground">
            Or continue with
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>
        <Button type="submit" variant="outline" className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 inline-block mx-2 m"
          >
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
