"use client"

import Link from "next/link";
import {usePathname} from "next/navigation"

// @ts-ignore
export default function NavLink({page, href}) {
const pathname = usePathname()
  if (pathname === href) {
    return(
    <span
					className='text-orange-400 font-orbitron '
				>
					{page}
		</span>
  )
  }
  return(
    <Link
					className='text-orange-800 hover:underline font-bold font-orbitron '
					href={href}
				>
					{page}
		</Link>
  )
}