import HeaderComponent from 'src/layout/header/header.component';
import FooterComponent from 'src/layout/footer/footer.component';
import { Outlet } from 'react-router-dom';

export default function HeaderFooterLayout() {
	return (
		<>
			{/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}
			<HeaderComponent />

			<div id="header-offset" className="h-headerP" />

			<div className=" min-h-screen-2    ">
				<Outlet />
			</div>

			<FooterComponent />
		</>
	);
}
