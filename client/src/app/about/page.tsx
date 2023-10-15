import Header from '@/app/components/Header';

export const metadata = {
	title: 'About'
};

export default function AboutPage() {
	return <div>
		<Header>About This App</Header>
		<p className="flex px-8 font-orbitron">
			This App was built by Hernan Clarke using NextJs version 13.4.  It heavely utilizes the new "App Router" design pattern and the Server side components rendenring with a few client side exceptions where it makes sense. 

			The data is fetched from a Strapi headless server for content management of the reviews using the new directory/file route implementation under the App folder.</p>
	<br/>
	
<p className="flex px-8 font-orbitron">
			The Tech Stack used includes ReactJS version 18, NextJS version 13, Typescript, Tailwind Css, HeadlessUi, nodeJS, npm.  The Fetch API interface was used to interact with the Strapi server, get the reviews, and populate a few components such as the search combobox as well as to be able to search for one or more reviews from the server.
		</p>
		</div>
}
