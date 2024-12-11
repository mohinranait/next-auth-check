"use client";
import { useSession } from "next-auth/react";
import React from "react";

const HomePage = () => {
  const session = useSession();
  console.log(session);

  return <div>HomePage</div>;
};

export default HomePage;
