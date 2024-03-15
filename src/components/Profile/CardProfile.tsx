"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { useSession } from "next-auth/react";
import FormEditImageProfile from "./FormEditImageProfile";
import FormEditProfile from "./FormEditProfile";

const CardProfile: React.FC = () => {
  const { data: session, update: sessionUpdate } = useSession();
  return (
    <Card className="bg-white">
      <div className="border-b">
        <FormEditImageProfile
          user={session?.user}
          className="p-6"
          sessionUpdate={sessionUpdate}
        />
      </div>
      <CardContent className="p-6">
        <FormEditProfile user={session?.user} sessionUpdate={sessionUpdate} />
      </CardContent>
    </Card>
  );
};

export default CardProfile;
