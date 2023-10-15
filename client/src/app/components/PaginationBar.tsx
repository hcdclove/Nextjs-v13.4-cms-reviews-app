import Link from "next/link"
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';
// @ts-ignore
export default function PaginationBar({href, page, pageCount}) {
 
  return (	<div className="flex gap-2 items-center pb-4">
				<PaginationLink href={`${href}?page=${page-1}`} enabled={page>1}>
          <ChevronLeftIcon className="h-5 w-5"/>
          </PaginationLink>
				<span>Page {page} of {pageCount}</span>
				<PaginationLink href={`${href}?page=${page+1}`} enabled={page < pageCount}>
        <ChevronRightIcon className="h-5 w-5"/>
        </PaginationLink>
			</div>)
}

// @ts-ignore
function PaginationLink( {children, href, enabled}) {

  if (!enabled){
    return ( <span   className="border rounded pt-0 text-slate-100 text-sm">{children}</span> )
  }
  
  return (
    <Link href= {href}
      className="border rounded pt-0 text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700">{children}</Link>
  )
}