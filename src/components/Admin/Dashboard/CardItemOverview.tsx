import React, { FunctionComponent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rupiahFormatter } from "@/utils";

interface CardItemOverviewProps {
  title: string;
  total: number;
  icon: React.ReactNode;
  omzetPercent: number;
  isMoney?: boolean;
}

const CardItemOverview: FunctionComponent<CardItemOverviewProps> = ({
  title,
  total,
  icon,
  omzetPercent,
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
        <p className="text-xs text-muted-foreground">
          +{omzetPercent} dari bulan lalu
        </p>
      </CardContent>
    </Card>
  );
};

export default CardItemOverview;
