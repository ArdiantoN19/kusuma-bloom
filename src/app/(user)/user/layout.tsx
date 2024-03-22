import React, { ReactNode } from "react";
import FlyingNav from "@/components/FlyingNav";

interface UserLayoutProps {
  children: Readonly<ReactNode>;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="lg:max-w-xl mx-auto lg:bg-white h-screen">
      {children}
      <FlyingNav />
    </div>
  );
};

export default UserLayout;
