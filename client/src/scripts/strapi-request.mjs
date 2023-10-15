import { writeFileSync } from 'node:fs';
import qs from 'qs';

const url =
	'http://localhost:1337/api/reviews' +
	'?' +
	qs.stringify(
		{
			

			fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
			populate: { image: { fields: ['url'] } },

			pagination: { pageSize: 6, page: 1 },
		},
		{ encodeValuesOnly: true }
	);

const response = await fetch(url);
const body = await response.json();
const formated = JSON.stringify(body, null, 2);
const file = 'src/scripts/strapi-response.json';
writeFileSync(file, formated, 'utf8');

// const url =
// 	'http://localhost:1337/api/reviews' +
// 	'?' +
// 	qs.stringify(
// 		{
// 			fields: ['slug', 'title', 'subtitle', 'publishedAt'],
// 			populate: { image: { fields: ['url'] } },
// 			sort: ['publishedAt:desc'],
// 			pagination: { pageSize: 6 },
// 		},
// 		{ encodeValuesOnly: true }
// 	);

// const response = await fetch(url);
// const body = await response.json();
// const formated = JSON.stringify(body, null, 2);
// const file = 'src/scripts/strapi-response.json';
// writeFileSync(file, formated, 'utf8');
