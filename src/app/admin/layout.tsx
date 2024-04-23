import { Metadata } from "next";
import React, { FunctionComponent, ReactNode } from "react";
import MainNav from "@/components/MainNav";
import UserNav from "@/components/UserNav";
import MainFooter from "@/components/MainFooter";

interface AdminLayoutProps {
  children: Readonly<ReactNode>;
  modal: ReactNode;
}

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin page of kusuma bloom",
};

export const dynamic = "force-dynamic";

const AdminLayout: FunctionComponent<AdminLayoutProps> = ({
  children,
  modal,
}) => {
  return (
    <>
      <div className="border-b">
        <header className="flex h-16 items-center container">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </header>
      </div>
      <main className="container pt-6 pb-10">
        {children}
        {modal}
      </main>
      <MainFooter />
    </>
  );
};

export default AdminLayout;
