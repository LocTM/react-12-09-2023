"use client";


import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppButton } from "../Components/app-button";

export default function SignIn() {
const router = useRouter();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!signInData.email) {
        alert("Please input email");
        return;
      }
      if (!signInData.password) {
        alert("Please input password");
        return;
      }
      const auth = getAuth();
      await signInWithEmailAndPassword (
        auth,
        signInData.email,
        signInData.password,
      );
      router.push("/");
    } catch (e) {
      alert(e.message);
      console.error(e);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className="">
            <label htmlFor="email" className="mr-44 inline-block w-20">
              Email
            </label>
          </div>
          <div>
            <input
              className="border border-solid-300 px-3 py-2 rounded w-500 font-bold text-black"
              type="email"
              name="email"
              id="email"
              value={signInData.email}
              onChange={(e) => {
                setSignInData({
                  ...signInData,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="mr-36 inline-block w-20">
              Password
            </label>
          </div>
          <div>
            <input
              className="border border-solid-300 px-3 py-2 rounded w-500 font-bold text-black"
              type="password"
              name="password"
              id="password"
              value={signInData.password}
              onChange={(e) => {
                setSignInData({
                  ...signInData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <AppButton type="submit" className="mt-4 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Sign in
          </AppButton>
        </form>
      </div>
    </div>
  );
}