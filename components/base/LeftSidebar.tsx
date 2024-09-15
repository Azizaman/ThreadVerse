
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';
import React from 'react';
import { Button } from "@/components/ui/button";
import ThemeToggleBtn from '@/components/common/ThemeToggleBtn';
import Image from 'next/image';
import Link from 'next/link';


export default function LeftSidebar() {
  return (
    <div className="h-screen">
      <nav className="w-16 h-full flex flex-col justify-between items-center border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out hover:w-64 group bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center w-full">
          <div className="mb-8 mt-4">
            <Link href="/">
              <Image src="/images/threads-logo.svg" alt="threads-logo" width={32} height={32} />
            </Link>
          </div>
          <div className='flex flex-col gap-4 px-3 py-10 w-full'>
            <Link href="/">
            <NavButton icon={<Home className="h-6 w-6" />} label="Home" />
            </Link>
            <Link href="/search">
            <NavButton icon={<Search className="h-6 w-6" />} label="Search" />
            </Link>
            <Link href="/newpost">
            <NavButton icon={<PlusSquare className="h-6 w-6" />} label="Create" />
            </Link>
            
            <NavButton icon={<Heart className="h-6 w-6" />} label="Notifications" />
            <Link href="/profile">
              <NavButton icon={<User className="h-6 w-6" />} label="Profile" />
            </Link>
          </div>
        </div>
        <div className="mb-6 py-8">
          <ThemeToggleBtn />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ icon, label }) {
  return (
    <Button 
      variant="ghost" 
      className="w-full flex items-center justify-start py-3 px-3 mb-2 transition-all duration-300 ease-in-out
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 text-gray-700 dark:text-gray-300
                 hover:text-black dark:hover:text-white
                 group"
    >
      {React.cloneElement(icon, { className: "h-6 w-6 transition-colors duration-300" })}
      <span className="sr-only group-hover:not-sr-only ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </Button>
  );
}
