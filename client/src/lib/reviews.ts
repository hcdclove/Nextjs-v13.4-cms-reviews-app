import "server-only"

import { readdir, readFile } from 'node:fs/promises';
import { marked } from 'marked';
import matter from 'gray-matter';
import qs from 'qs';
import IReviewParameters from '@/app/interfaces/IReviewParameters';
import IReview from '@/app/interfaces/IReview';
import ISearchReview from '@/app/interfaces/ISearchReview';

const CMS_URL = process.env.CMS_URL;

interface CmsItem {
  id: number;
  attributes: any;
}

export interface IFullReview extends IReview {
  body: string;
}
export interface PaginatedReviews {
  pageCount: number;
  reviews: IReview[];
}

export async function getReview(slug: string) {
	const parameters: IReviewParameters = {
		filters: { slug: { $eq: slug } },
		fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
		populate: { image: { fields: ['url'] } },
		pagination: { pageSize: 1, withCount: false }
	};

	const { data } = await fetchReviews(parameters);

	const item = data[0];
	const { attributes } = item;

	return {
		...toReview(item),
		body: marked(attributes.body)
	};
}



export type SearchableReview = Pick<IReview, 'slug' | 'title'>;

export async function searchReviews(query: string): Promise<ISearchReview[]> {

	const parameters: IReviewParameters = {
		filters: { title: {$containsi: query}},
		fields: ['slug', 'title'],
		sort: ['title'],
		pagination: { pageSize: 100 }
	};

  const { data } = await fetchReviews(parameters);
  return data.map(({ attributes }: ISearchReview) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));


}

export async function getReviews(pageSize: Number, page: Number) {
	const parameters: IReviewParameters = {
		fields: ['slug', 'title', 'subtitle', 'publishedAt'],
		populate: { image: { fields: ['url'] } },
		sort: ['publishedAt:desc'],
		pagination: { pageSize, page }
	};

	const { data, meta } = await fetchReviews(parameters);

	return {
		pageCount: meta.pagination.pageCount,
		reviews: data.map(toReview)
	}
}




function toReview(item: CmsItem) {
	const { attributes } = item;
	return {
		slug: attributes.slug,
		title: attributes.title,
		subtitle: attributes.subtitle,
		date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
		image: CMS_URL + attributes.image.data.attributes.url
	};
}

async function fetchReviews(parameters: IReviewParameters) {
	const url =
		`${CMS_URL}/api/reviews?` +
		qs.stringify(parameters, { encodeValuesOnly: true });

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`CMS returned ${response.status} for ${url}`);
	}
	return response.json();
}



export async function getSlugs() {
	const parameters: IReviewParameters = {
		fields: ['slug'],
		populate: {},
		sort: ['publishedAt:desc'],
		pagination: { pageSize: 100 }
	};

	const { data } = await fetchReviews(parameters);

	return data.map((item: CmsItem ) => item.attributes.slug
	);

	// ===> from the processing of locar files listed in project directory
	// const files = await readdir('./src/content/reviews');
	// const slugs = files
	// 	.filter((file) => file.endsWith('.md'))
	// 	.map((file) => file.slice(0, -'.md'.length));
	// return slugs;
}

// ================= Local md file review functions

// export async function getReview__from_local_file(slug: string) {
// 	const text = await readFile(`./src/content/reviews/${slug}.md`, 'utf8');

// 	const {
// 		content,
// 		data: { title, date, image },
// 	} =
// 		// @ts-ignore
// 		matter(text);

// 	const html = marked(content);

// 	return { slug, title, date, image, html };
// }

// export async function getReviews__from_localfile() {
// 	const slugs = await getSlugs();

// 	const reviews = [];
// 	for (let element of slugs) {
// 		reviews.push(await getReview(element));
// 	}

// 	reviews.sort((a, b) => b.date.localeCompare(a.date));
// 	return reviews;
// }
