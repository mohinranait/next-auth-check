import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="bg-theme">
      <div className="flex items-center justify-center gap-3">
        <Link className="px-3 py-1 rounded bg-slate-800 text-white" href={"/"}>
          Home
        </Link>
        <Link
          className="px-3 py-1 rounded bg-slate-800 text-white"
          href={"/about"}
        >
          About
        </Link>
        <Link
          className="px-3 py-1 rounded bg-slate-800 text-white"
          href={"/protect"}
        >
          Protect
        </Link>
        <Link
          className="px-3 py-1 rounded bg-slate-800 text-white"
          href={"/login"}
        >
          Login
        </Link>
      </div>
      {children}
    </main>
  );
};

export default MainLayout;
