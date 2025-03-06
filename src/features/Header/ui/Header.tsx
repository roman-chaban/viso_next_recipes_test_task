"use client";

import { FC } from "react";

import Link from "next/link";

import { nav } from "../types/nav";

const Header: FC = () => {
  return (
    <header className='bg-gray-800 p-4'>
      <nav className='container mx-auto'>
        <ul className='w-full flex justify-center space-x-4'>
          {nav.map((item) => (
            <li key={item.id}>
              <Link href={item.url} className='text-white hover:text-gray-400'>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
