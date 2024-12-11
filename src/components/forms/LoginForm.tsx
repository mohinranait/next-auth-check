"use client";
import React, { FormEvent, useState } from "react";
import InputElement from "../elements/InputElement";

import Link from "next/link";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    try {
      // setIsLoading(true);
      const res = await signIn("credentials", { ...form, redirect: false });
      console.log(res);
      if (res?.ok) {
        toast.success("Login successfull");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h1 className="text-2xl text-slate-800 font-semibold">Login </h1>
      <div className="flex flex-col gap-4 mt-4">
        <InputElement
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          className="!border-slate-300 border-1"
          value={form?.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e }))}
        />
        <InputElement
          label="Password"
          name="password"
          type="password"
          placeholder="Enter Password"
          className="!border-slate-300 border-1"
          value={form?.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e }))}
        />
        <div>
          <Button
            type="submit"
            className="w-full bg-primary text-white rounded-md"
          >
            Login
          </Button>
        </div>
        <p className="text-slate-700 text-center">
          Create a new account{" "}
          <Link href={"/register"} className="text-primary hover:underline ">
            Register
          </Link>{" "}
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
