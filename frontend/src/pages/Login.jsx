import React from "react";
import { LoginForm as LoginComponent } from "../components/index";

function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-zinc-950 backdrop-filter backdrop-blur-lg bg-primary-foreground bg-opacity-10">
      <div className="flex flex-col gap-4 sm:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginComponent />
          </div>
        </div>
      </div>
      <div
        className="hidden lg:flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/path/to/your/image.jpg)" }}
      >
        {/* You can add any content or leave it empty */}
      </div>
    </div>
  );
}

export default Login;
