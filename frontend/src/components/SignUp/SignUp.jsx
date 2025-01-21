import React, { useState } from "react";
import { use } from "react";

const SignUp = () => {
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmitBtn = async () => {
    try {
      const responce = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role: "user" }),
      });
      const data = await responce.json();
      console.log(data);
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        alert("Sign Up Failed");
      }
    } catch (error) {}
  };
  return (
    <section className="grid text-center h-screen items-center ">
      <div class="relative flex flex-col rounded-xl bg-transparent">
        <h4 class="block text-2xl font-bold text-slate-800 pb-10">Sign Up</h4>
        <p class="text-slate-500 font-light pb-6">
          Nice to meet you! Enter your details to register.
        </p>
        <form class="mx-auto max-w-[24rem] text-left w-80">
          <div class="mb-1 flex flex-col gap-6">
            <div class="w-full max-w-sm min-w-[200px]">
              <label class="block mb-2 text-sm text-slate-600">Your Name</label>
              <input
                type="text"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Name"
                name="username"
                value={username}
                onChange={(e) => setuserName(e.target.value)}
              />
            </div>
            <div class="w-full max-w-sm min-w-[200px]">
              <label class="block mb-2 text-sm text-slate-600">Email</label>
              <input
                type="email"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="w-full max-w-sm min-w-[200px]">
              <label class="block mb-2 text-sm text-slate-600">Password</label>
              <input
                type="password"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div class="inline-flex items-center mt-2">
            <label
              class="flex items-center cursor-pointer relative"
              for="check-2"
            >
              <input
                type="checkbox"
                class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                id="check-2"
              />
              <span class="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              class="cursor-pointer ml-2 text-slate-600 text-sm"
              for="check-2"
            >
              Remember Me
            </label>
          </div>
          <button
            class="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleSubmitBtn}
          >
            Sign Up
          </button>
          <p class="flex justify-center mt-6 text-sm text-slate-600">
            Don&apos;t have an account?
            <a
              href="#signup"
              class="ml-1 text-sm font-semibold text-slate-700 underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
