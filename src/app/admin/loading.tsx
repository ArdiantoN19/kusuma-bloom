import React, { FunctionComponent } from "react";

const Loading: FunctionComponent = () => {
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
