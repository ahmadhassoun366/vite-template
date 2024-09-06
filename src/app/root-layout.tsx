// 3rd party
import { Suspense, lazy, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, BrowserRouter, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';

// layouts
import HeaderFooterLayout from '../layout/header-footer.layout';
import EmptyLayout from 'src/layout/empty.layout.tsx';

// context, containers, app init
import ContextComponent from 'src/components/context/context.component';
import ModalContainer from 'src/components/modals/modal-container.component';
import AppInit from 'src/components/app-init/app-init.component';

// pages
import RootPage from './pages/root-page.tsx';

// modals
import LoginModal from 'src/components/modals/login/login.modal';
import ExampleModal from 'src/components/modals/example.modal.tsx';

// services
import ModalSvcContext from 'src/shared/services/modal/modal.context';
import ModalService from 'src/shared/services/modal/modal.service';
import AuthService from 'src/shared/services/auth/auth.service';
import AuthSvcContext from 'src/shared/services/auth/auth.context';
import GeneralSettingsService from 'src/shared/services/general-settings/general-settings.service';
import geneneralSettingsSvcContext from 'src/shared/services/general-settings/general-settings.context';

// static
import ROUTES from 'src/static/router.data';
import APP_MODALS from 'src/static/enums/app.modals';
import { THEMES } from 'src/static/settings/general-settings.data';
import { ModalData } from 'src/shared/models/modals/modals.model';

// styles
import 'react-toastify/dist/ReactToastify.css';
import 'src/global.css';

// *~~~ lazy loaded pages ~~~*

// pages

const TestPage = lazy(() => import('./pages/test/test.page.tsx'));
// const UiKitPage = lazy(() => import('./dev/ui-kit/ui-kit'));

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

function RoutingComponent() {
	function AuthRequiredLayout() {
		const authSvc = useContext<AuthService>(AuthSvcContext);

		// We are checking if the user is authenticated
		const isAuthenticated = authSvc.isLoggedIn();

		// here we are redirecting unauthenticated users to the login page so that they can login
		if (!isAuthenticated) {
			return <Navigate to={ROUTES.root} />;
		}

		// We will then allow the admins to access the dashboard
		return <Outlet />;
	}

	// function AdminRequiredLayout() {
	// 	const userSvc = useContext<UserService>(UserSvcContext);

	// 	if (!userSvc.isAdmin()) {
	// 		return <Navigate to={ROUTES.root} />;
	// 	}

	// 	return <Outlet />;
	// }

	return (
		<>
			<Routes>
				{/* header footer layout */}
				<Route element={<HeaderFooterLayout />}>
					{/* dev only routes */}
					{import.meta.env.DEV && (
						<>
							<Route path="/test" element={<TestPage />} />
							{/* <Route path={'/ui'} element={<UiKitPage />} /> */}
						</>
					)}

					{/* root page  */}
					<Route path={ROUTES.root} element={<RootPage />} />

					{/* 404 */}
					{/* <Route path="*" element={<NotFoundPage />} /> */}

					{/* *~~~ proteted routes ~~~* */}
					<Route element={<AuthRequiredLayout />}></Route>
				</Route>

				<Route element={<EmptyLayout />}></Route>
			</Routes>
		</>
	);
}

function AppModals() {
	const modals: {
		[key: string]: any;
	} = {
		[APP_MODALS.EXAMPLE_MODAL]: ExampleModal,
		[APP_MODALS.LOGIN_MODAL]: LoginModal,
	};

	const modalSvc = useContext<ModalService>(ModalSvcContext);

	return (
		<ModalContainer>
			<Suspense fallback={<div></div>}>
				{modalSvc.getOpenModals().map((modal: ModalData, idx: number) => {
					const ModalComp = modals[modal.id];

					return <ModalComp modalId={modal.id} data={modal.data} key={idx} />;
				})}
			</Suspense>
		</ModalContainer>
	);
}

export default function RootLayout() {
	const settingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);

	return (
		<ContextComponent>
			<AppInit>
				<BrowserRouter>
					<Suspense fallback={<div></div>}>
						<RoutingComponent />
					</Suspense>

					<ScrollToTop />

					<ToastContainer
						position="bottom-left"
						theme={settingsSvc.getTheme() === THEMES.DARK ? 'dark' : 'light'}
						hideProgressBar
						autoClose={5000}
						bodyClassName="py-1 my-0 "
						toastClassName=" min-h-[40px] "
					/>
					<AppModals />
				</BrowserRouter>
			</AppInit>
		</ContextComponent>
	);
}
