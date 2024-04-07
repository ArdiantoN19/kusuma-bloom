import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../../ui/badge";
import { ResponseTransaction } from "@/types/transactionAction";
import { cn } from "@/lib/utils";

const statusColor = {
  success: "bg-primary hover:bg-primary",
  failure: "bg-red-400 hover:bg-red-400",
  pending: "bg-myOrange hover:bg-myOrange",
};

const TransactionItem: React.FC<ResponseTransaction> = ({ user, status }) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={user.image} alt="Avatar" />
        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none capitalize">
          {user.name}
        </p>
        <p className="md:text-sm text-muted-foreground text-xs max-w-16 md:max-w-max truncate">
          {user.email}
        </p>
      </div>
      <div className="ml-auto">
        <Badge
          className={cn(
            "text-xs",
            statusColor[status.toLowerCase() as keyof typeof statusColor]
          )}
        >
          {status}
        </Badge>
      </div>
    </div>
  );
};

export default TransactionItem;
