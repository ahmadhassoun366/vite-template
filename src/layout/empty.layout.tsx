import { Outlet } from 'react-router-dom';

export default function EmptyLayout() {
	// query

	return (
		<>
			{/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}

			<div className=" min-h-screen-2 py-[20px]  ">
				<Outlet />
			</div>
		</>
	);
}
