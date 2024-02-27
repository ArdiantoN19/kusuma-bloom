import { teams } from "@/utils/data";
import React from "react";
import TeamItem from "./TeamItem";

const TeamSection = () => {
  return (
    <section className="mb-28 mt-5 lg:mt-10">
      <div className="container">
        <div className="mb-16">
          <p className="tracking-wider text-lg text-center md:text-xl text-myOrange mb-2">
            TEAM KAMI
          </p>
          <h3 className="text-center font-bold text-2xl md:text-3xl text-primary mb-2 ">
            Kusuma Bloom <span className="text-myOrange">Team</span>
          </h3>
          <p className="text-sm text-center text-muted mb-4">
            Beberapa team yang berdedikasi
          </p>
          <div className="w-32 mx-auto">
            <div className="line bg-myOrange"></div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center lg:justify-start xl:justify-center gap-10 xl:gap-5">
          {teams.map((team: Record<string, any>) => (
            <TeamItem {...team} key={team.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
