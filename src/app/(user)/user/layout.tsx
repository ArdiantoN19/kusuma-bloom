import React, { ReactNode } from "react";
import FlyingNav from "@/components/FlyingNav";

export const dynamic = "force-dynamic";

interface UserLayoutProps {
  children: Readonly<ReactNode>;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="lg:max-w-2xl mx-auto lg:bg-white h-screen lg:border lg:shadow-sm">
      <div className="pb-20 lg:pb-0">{children}</div>
      <FlyingNav />
    </div>
  );
};

export default UserLayout;
