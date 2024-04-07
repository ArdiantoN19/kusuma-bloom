import React, { FunctionComponent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rupiahFormatter } from "@/utils";

interface ItemOverviewProps {
  title: string;
  total: number;
  icon: React.ReactNode;
  isMoney?: boolean;
}

const ItemOverview: FunctionComponent<ItemOverviewProps> = ({
  title,
  total,
  icon,
  isMoney = false,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="size-4 text-sm">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {isMoney ? rupiahFormatter(total) : total}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemOverview;
