import './globals.css';

import type { ReactNode } from 'react';
import Link from 'next/link';
import ILayoutProps from '../app/interfaces/ILayoutProps';
import './globals.css';
import NavBar from '@/app/components/NavBar';
import { orbitron, exo2 } from './fonts';

export const metadata = {
	title: {
		default: 'Indie Gamer',
		template: '%s | Indie Gamer'
	}
};

export default function RootLayout({ children }: ILayoutProps) {
	return (
		<html lang='en' className={`${orbitron.variable} ${exo2.variable}`}>
			<body className='bg-orange-200 flex flex-col min-h-screen px-4 py-2'>
				<header>
					<NavBar />
				</header>
				<main className='grow'>
					<br />
					<br />
					{children}
				</main>

				<footer className=' border-t py-3 my-3 text-center text-xs text-slate-500'>
					Images courtesy of{' '}
					<a href='https://rawg.io' className='text-orange-500 hover:underline'>
						{' '}
						RAWG
					</a>
				</footer>
			</body>
		</html>
	);
}
