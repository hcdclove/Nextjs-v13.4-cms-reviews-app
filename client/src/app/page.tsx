// 'use client';

import Image from 'next/image';

import Header from '@/app/components/Header';
import { getReviews } from '@/lib/reviews';
import Link from 'next/link';
import IReview from './interfaces/IReview';

// import { useEffect } from 'react';

async function getFeatureReview() {
	const {reviews} = await getReviews(1,1);

	return reviews[0];
}

export default async function HomePage() {
	const review: IReview = await getFeatureReview();
	// useEffect(() => {
	// 	window.alert('Hello');
	// }, []);

  const img = (review.image) ? review.image : ""

	return (
		<>
			<Header>Indie Gamer</Header>
			<p className='pb-3 text-center'> Trending Indian game</p>
			<div className="flex items-center pl-12 justify-center">
				<Link href={`/reviews/${review.slug}`}>
					<Image
						src={img}
						alt=''
						width='840'
						height='560'
						className=' flex-col rounded-t sm:rounded-l sm:rounded-r-none'
					/>
					<h2 className='py-1  text-center font-orbitron font-semibold px-2  text-black'>
						{' '}
						{review.title}
					</h2>
				</Link>
			</div>
		</>
	);
}
