import Link from 'next/link';
import NavLink from './NavLink';

export default function NavBar() {
	return (
		<ul className='flex gap-2'>
			<li>
				<NavLink href='/' page="Home"/>
			</li>
			<li className='ml-auto font-bold font-orbitron text-sm'>
				<NavLink href='/reviews' page="Reviews"/>
			</li>
			<li className=' font-orbitron font-bold text-sm'>
				<NavLink href='/about' page="About"/>
			</li>
		</ul>
	);
}
