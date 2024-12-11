"use client";
import React, { FormEvent, useState } from "react";
import InputElement from "../elements/InputElement";

import Link from "next/link";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config/accessEnv";
import { Button } from "../ui/button";
export type TUserCreate = {
  name: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  rePassword: string;
  status: string;
};

type TError = Record<string, string | null>;

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<TError>({});
  const [form, setForm] = useState<TUserCreate>({
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
    rePassword: "",
    status: "Pending",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate the form using Yup

      setError({});

      const res = await fetch(`${BASE_URL}/api/user/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (data?.success) {
        toast.success(data?.message);
        router.push("/login");
      } else {
        toast.success(data?.message);
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("Somthing wrong");
    }
  };

  console.log(error);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h1 className="text-2xl text-slate-800 font-semibold">Register</h1>
      <div className="flex flex-col gap-4 mt-4">
        <InputElement
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Enter first name"
          className={` ${error["name.firstName"] && "!border-red-500"}`}
          value={form?.name?.firstName}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              name: { ...form.name, firstName: e },
            }))
          }
          error={error["name.firstName"]}
        />
        <InputElement
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Enter last name"
          className={` border-1 ${error["name.lastName"] && "!border-red-500"}`}
          value={form?.name?.lastName || ""}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              name: { ...form.name, lastName: e },
            }))
          }
          error={error["name.lastName"]}
        />
        <InputElement
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          className={` ${error.email && "!border-red-500"}`}
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              email: e,
            }))
          }
          error={error?.email}
        />
        <InputElement
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          className={` border-1 ${error.password && "!border-red-500"}`}
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              password: e,
            }))
          }
          error={error?.password}
        />
        <InputElement
          label="Re-Password"
          name="rePassword"
          type="password"
          placeholder="Re-enter password"
          className={` border-1 ${error?.rePassword && "!border-red-500"}`}
          value={form.rePassword}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              rePassword: e,
            }))
          }
          error={error?.rePassword}
        />
        <div>
          <Button
            type="submit"
            className="w-full bg-primary text-white rounded-md"
          >
            Register
          </Button>
        </div>
        <p className="text-slate-700 text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;