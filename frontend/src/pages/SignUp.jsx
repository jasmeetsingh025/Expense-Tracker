import React from "react";
import { SignUpForm } from "../components/index";

const SignUp = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 bg-zinc-950 backdrop-filter backdrop-blur-lg bg-primary-foreground bg-opacity-10">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
