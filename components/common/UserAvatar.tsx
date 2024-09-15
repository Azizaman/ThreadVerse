import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function UserAvatar({name, image}:{name: string, image?: string}) {
  return (
    <Avatar>
  <AvatarImage src={image} />
  <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
</Avatar>

  )
}
