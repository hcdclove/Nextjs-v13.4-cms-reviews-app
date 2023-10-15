import { orbitron } from '@/app/fonts';
import ILayoutProps from '../interfaces/ILayoutProps';

export default function Header({ children }: ILayoutProps) {
	return (
		<h1 className={'  font-bold font-orbitron pb-3 text-2xl text-center'}>{children}</h1>
	);
}
