import Header from '@/app/components/Header';
import Image from 'next/image';
import { getReviews } from '@/lib/reviews';
import Link from 'next/link';
import PaginationBar from '@/app/components/PaginationBar';
import SearchBox from '@/app/components/SearchBox';
import IReview from '../interfaces/IReview';
import ISearchParams from '../interfaces/ISearchParams';

export const metadata = {
	title: 'Reviews'
};

const PAGE_SIZE = 6

export default async function ReviewsPage({searchParams}:ISearchParams) {

  const page =  parsePageParam(searchParams.page)  
	
	const {reviews, pageCount} = await getReviews(PAGE_SIZE,page);

	// const searchReviews = await getSearchableReviews()
 
  

	return (
		<>
			<div className=" flex justify-between pt-2 mb-8 ">
				<SearchBox />
		</div>
		<br/>
			<Header>Reviews</Header>
		
			<PaginationBar href="/reviews" page={page} pageCount={pageCount} />
			
		
			
			<ul className='flex flex-row flex-wrap gap-3'>
				{
				
					reviews.map((review: IReview) => {
						return (
							<li
								key={review.slug}
								className='bg-white border rounded shadow w-80 hover:shadow-2xl'
							>
								<Link
									className='text-orange-800 font-bold font-orbitron hover:underline'
									href={`/reviews/${review.slug}`}
								>
									<Image
										src={review.image}
										alt=''
										width='320'
										height='180'
										className='rounded-t sm:rounter-l sm:rounded-r-none'
									/>
									<div className='px-2 py-1 text-center sm:text-left'>
										<h2 className='py-1 text-center font-orbitron font-semibold'>
											{review.title}
										</h2>
										<p className='hidden pt-2 block'>{review.subtitle}</p>
									</div>
								</Link>
							</li>
						);
					})
				}
			</ul>
		</>
	);
}

function parsePageParam(paramValue:string) {
	if (paramValue) {
		const page = parseInt(paramValue)
		if (isFinite(page) && (page > 0)) return page
	}
return 1
}