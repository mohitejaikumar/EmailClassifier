import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

import React from "react";
import { Avatar } from "./ui/avatar";

interface Props {
  children: React.ReactNode;
  message: string;
  avatarImage: string;
}
export const HoverComponent = ({ children, message, avatarImage }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between items-center space-x-4 bg-slate-900 border-gray-600  border-2 rounded-lg px-5 py-4 ">
          <Avatar>
            <img src={avatarImage} alt="Profile_Image" />
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
