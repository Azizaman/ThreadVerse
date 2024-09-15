import React from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UserListCard() {
  return (
    <div className="w-full shadow-sm  p-2 rounded-md mb-3">
      <div className="flex">
        <UserAvatar name="aman"  />
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <strong className="text-md font-bold ml-2">aman</strong>
            <span className="ml-2 font-light text-xs">aman</span>
          </div>
          <Link href={`/`}>
            <Button size="sm">view</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
