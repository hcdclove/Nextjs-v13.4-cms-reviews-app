import Header from '@/app/components/Header';
import { orbitron } from '@/app/fonts';
import Image from 'next/image';
import { getReview, getSlugs } from '@/lib/reviews';
import IAtributes from '@/app/interfaces/IAttribute';
import SharedLinkButtons from '@/app/components/SharedLinkedButtons';

interface IProps {
	params: { slug: string };
}

export async function generateStaticParams() {
	const slugs = await getSlugs();
	return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: IProps) {
	const review: IAtributes = await getReview(slug);

	return {
		title: review.title
	};
}

export default async function ReviewPage({ params: { slug } }: IProps) {
	const review: IAtributes = await getReview(slug);

  const img = review.image ? review.image : ""
	
	return (
		<>
			<Header>{review.title}</Header>
			<p className=' font-semibold pb-3'> {review.title}</p>
			<div className='flex gap-3 items-baseline'>
				<p className='py-2 font-orbitron'>{review.date}</p>
				<SharedLinkButtons />
			</div>
			<Image
				src={img}
				alt=''
				width='640'
				height='360'
				className=' mb-2 rounded'
			/>

			<article
				dangerouslySetInnerHTML={
					// @ts-ignore
					{ __html: review.body }
				}
				className='max-w-screen-sm prose prose-slate'
			/>
		</>
	);
}
