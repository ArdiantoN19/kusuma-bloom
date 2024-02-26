import { Check, Info, X } from "@phosphor-icons/react/dist/ssr";
import React, { FunctionComponent, ReactNode } from "react";

export enum AlertType {
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
}

interface AlertProps {
  type: AlertType;
  children: ReactNode;
}

const Alert: FunctionComponent<AlertProps> = ({
  type = AlertType.SUCCESS,
  children,
}) => {
  if (type === AlertType.ERROR) {
    return (
      <div className="bg-red-100/30 border border-red-400 p-4 text-red-500 text-xs rounded mb-4 flex items-center gap-x-2">
        <X size={20} />
        {children}
      </div>
    );
  }
  if (type === AlertType.WARNING) {
    return (
      <div className="bg-orange-100/30 border border-orange-400 p-4 text-orange-500 text-xs rounded mb-4 flex items-center gap-x-2">
        <Info size={20} />
        {children}
      </div>
    );
  }
  if (type === AlertType.INFO) {
    return (
      <div className="bg-blue-100/30 border border-blue-400 p-4 text-blue-500 text-xs rounded mb-4 flex items-center gap-x-2">
        <Info size={20} />
        {children}
      </div>
    );
  }
  return (
    <div className="bg-green-100/30 border border-green-400 p-4 text-green-500 text-xs rounded mb-4 flex items-center gap-x-2">
      <Check size={20} />
      {children}
    </div>
  );
};

export default Alert;
