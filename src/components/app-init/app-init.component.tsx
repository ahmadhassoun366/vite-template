// react
import { useContext, useEffect, useState } from 'react';

// services
import AuthSvcContext from 'src/shared/services/auth/auth.context';
import AuthService from 'src/shared/services/auth/auth.service';
import geneneralSettingsSvcContext from 'src/shared/services/general-settings/general-settings.context';
import GeneralSettingsService from 'src/shared/services/general-settings/general-settings.service';
import UserSvcContext from 'src/shared/services/user/user.context';
import UserService from 'src/shared/services/user/user.service';

// static
import { APP_EVENTS } from 'src/static/enums/app.events';
import { UserData } from 'src/shared/models/user/user.model';
import { THEMES } from 'src/static/settings/general-settings.data';

import DevMenu from './dev-menu.component';

function MaintenanceComponent() {
	return (
		<div
			className={`flex flex-col items-center justify-center gap-2 h-screen w-screen dark:bg-dark-800 bg-white`}
		>
			<h1 className="text-3xl dark:text-white text-black font-semibold">
				Community Portal is under maintenance
			</h1>

			<p className="text-black dark:text-white">
				We are currently working on the portal to make it better for you. Please check back
				later
			</p>
		</div>
	);
}

function LoadingComponent() {
	const genSettingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);

	return (
		<div
			className={`flex flex-col items-center justify-center gap-2 h-screen w-screen dark:bg-dark-800 bg-white`}
		>
			<div className="flex items-center gap-x-2">
				<h1 className="text-3xl dark:text-white text-black font-semibold">Loading PWR</h1>
				<svg
					width="40"
					height="40"
					viewBox="0 0 25 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="WOM-basic/pwr">
						<path
							id="Union"
							fillRule="evenodd"
							clipRule="evenodd"
							d="M17.1737 4H4.5L7.47872 9.12497H13.8772L10.7205 14.7624H17.1835L20.5 8.93057L17.1737 4ZM10.531 14.5736L7.58887 9.41959L4.6097 15.0478L7.60546 20L10.531 14.5736Z"
							fill={genSettingsSvc.getTheme() === THEMES.DARK ? 'white' : 'black'}
						/>
					</g>
				</svg>
			</div>
			<div role="status">
				<svg
					aria-hidden="true"
					className={`w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600`}
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

type AppInitProps = {
	children: React.ReactNode;
};

export default function AppInit({ children }: AppInitProps) {
	// *~~~ inject services ~~~* //
	const authSvc = useContext<AuthService>(AuthSvcContext);
	const userSvc = useContext<UserService>(UserSvcContext);
	const genSettingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);

	const maintenanceMode = import.meta.env.VITE_APP_MAINTENANCE_MODE === 'true';

	// *~~~ state ~~~* //
	const [appLoaded, setAppLoaded] = useState<boolean>(false);

	// set up storage api
	useEffect(() => {
		if (import.meta.env.VITE_APP_MAINTENANCE) {
			return;
		}

		(async () => {
			// *~~~ LOAD APP SETTINGS ~~~* //

			await genSettingsSvc.init();

			// *~~~ LOAD AUTH ~~~* //

			// set user data on loggin
			function onLoggedIn(e: CustomEvent<UserData>) {
				userSvc.setUserData(e.detail);
			}

			document.addEventListener(APP_EVENTS.AUTH_LOGGED_IN, onLoggedIn as EventListener);

			function onLoggedOut() {
				userSvc.setUserData({
					pfp: '',
					username: '',
				});
			}

			document.addEventListener(APP_EVENTS.AUTH_LOGGED_OUT, onLoggedOut as EventListener);

			await authSvc.init();

			// *~~~ html head ~~~* //

			// font awesome
			const faKey = import.meta.env.VITE_APP_FONTAWESOME_KEY;
			const link = document.createElement('link');
			link.href = `https://kit.fontawesome.com/${faKey}.css`;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.crossOrigin = 'anonymous';
			document.head.appendChild(link);

			setAppLoaded(true);
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (maintenanceMode) return <MaintenanceComponent />;

	// TODO: add loading screen
	if (!appLoaded) return <LoadingComponent />;

	if (import.meta.env.VITE_APP_ENV === 'DEV') {
		return (
			<>
				<DevMenu />
				{children}
			</>
		);
	}

	return children;
}
