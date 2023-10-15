'use client';

import { LinkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function ShareLinkButton() {
	const [clicked, setClicked] = useState(false);
	// @ts-ignore
	const handleClick = (e) => {
		navigator.clipboard.writeText(window.location.href);
		setClicked(true);
		setTimeout(() => setClicked(false), 1000);
	};

	return (
		<button
			onClick={handleClick}
			className=' border flex gap-1 items-center px-2 py-1 text-slate-500 text-sm hover: text-orange-700 hover: bg-orange-200 rounded'
		>
			<LinkIcon className='w-4 h-4' />
			{clicked ? 'Link Copied' : 'Share Link'}
		</button>
	);
}
