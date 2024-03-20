import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_API_AVATAR_URL}?seed=om`}
            alt="Avatar"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="md:text-sm text-muted-foreground text-xs max-w-16 md:max-w-max truncate">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto">
          <Badge className="text-xs bg-primary hover:bg-primary">Sukses</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_API_AVATAR_URL}?seed=jl`}
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="md:text-sm text-muted-foreground text-xs max-w-16 md:max-w-max truncate">
            jackson.lee@email.com
          </p>
        </div>
        <div className="ml-auto">
          <Badge className="text-xs bg-primary hover:bg-primary">Sukses</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_API_AVATAR_URL}?seed=in`}
            alt="Avatar"
          />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="md:text-sm text-muted-foreground text-xs max-w-16 md:max-w-max truncate">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto">
          <Badge className="text-xs bg-primary hover:bg-primary">Sukses</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_API_AVATAR_URL}?seed=wk`}
            alt="Avatar"
          />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="md:text-sm text-muted-foreground text-xs max-w-16 md:max-w-max truncate">
            will@email.com
          </p>
        </div>
        <div className="ml-auto">
          <Badge className="text-xs bg-primary hover:bg-primary">Sukses</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_API_AVATAR_URL}?seed=sd`}
            alt="Avatar"
          />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="md:text-sm text-muted-foreground text-xs max-w-16 md:max-w-max truncate">
            sofia.davis@email.com
          </p>
        </div>
        <div className="ml-auto">
          <Badge className="text-xs bg-primary hover:bg-primary">Sukses</Badge>
        </div>
      </div>
    </div>
  );
}

const CardTransaction = () => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Transaksi Terakhir</CardTitle>
        <CardDescription>Total ada 256 transaksi dibulan ini.</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentTransactions />
      </CardContent>
    </Card>
  );
};

export default CardTransaction;
