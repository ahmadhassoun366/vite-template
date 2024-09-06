import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';

// components
import Button from 'src/components/internal/button/button.component';
import PwrImagotipo from 'src/components/logos/pwr-imagotipo/pwr-imagotipo.logo';

// services
import GeneralSettingsService from 'src/shared/services/general-settings/general-settings.service';
import geneneralSettingsSvcContext from 'src/shared/services/general-settings/general-settings.context';
import UserService from 'src/shared/services/user/user.service';
import UserSvcContext from 'src/shared/services/user/user.context';
import ModalService from 'src/shared/services/modal/modal.service';
import ModalSvcContext from 'src/shared/services/modal/modal.context';
import AuthSvcContext from 'src/shared/services/auth/auth.context';
import AuthService from 'src/shared/services/auth/auth.service';

import api from 'src/shared/api/api';
import { useDefaultUserImg } from 'src/shared/utils/functions';

import ROUTES from 'src/static/router.data';
import APP_MODALS from 'src/static/enums/app.modals';

const navBttns = [
	{ label: 'Projects', href: '/' },
	{ label: 'Governance', href: '/' },

	{ label: 'FAQ', href: '/' },
];

function getKeyFrames({ x, y }: { x: number; y: number }) {
	return `
@keyframes shrink { 
	0% {
		clip-path: circle(130% at ${x}% ${y}%);
	}
	100% {
		clip-path: circle(0% at ${x}% ${y}%);
	}
}
`;
}

export default function HeaderComponent() {
	// *~~~ inject dependencies ~~~* //

	const authSvc = useContext<AuthService>(AuthSvcContext);
	const userSvc = useContext<UserService>(UserSvcContext);
	const modalSvc = useContext<ModalService>(ModalSvcContext);

	// const navigate = useNavigate();
	const { pathname } = useLocation();

	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	const toggleMobileNav = () => {
		setMobileNavOpen(!mobileNavOpen);
		const html = document.querySelector('html');

		if (mobileNavOpen) {
			html?.classList.remove('overflow-hidden');
		} else {
			html?.classList.add('overflow-hidden');
		}
	};

	// *~~~ Theme ~~~* //
	const settingsSvc = useContext<GeneralSettingsService>(geneneralSettingsSvcContext);

	function toggleTheme(e: any) {
		// *~~~ mouse position ~~~* //
		const x = Math.round((e.clientX / window.innerWidth) * 100);
		const y = Math.round((e.clientY / window.innerHeight) * 100);
		const animation = getKeyFrames({ x, y });

		// copy html
		const html = document.querySelector('html');
		const htmlCopy = html?.cloneNode(true) as HTMLElement;

		settingsSvc.toggleTheme();

		// *~~~ create containers ~~~* //
		const fixedContainer = document.createElement('div');
		fixedContainer.classList.add('ss_theme');

		const mask = document.createElement('div');
		mask.classList.add('mask');

		const style = document.createElement('style');
		style.innerHTML = animation;
		document.head.appendChild(style);

		const iframe = document.createElement('iframe') as HTMLIFrameElement;
		iframe.src = 'about:blank';
		iframe.className = 'iframe_mask';

		function onAnimationEnd() {
			document.body.removeChild(fixedContainer);
			document.head.removeChild(style);
			mask.removeEventListener('animationend', onAnimationEnd);
		}
		mask.addEventListener('animationend', onAnimationEnd);

		// *~~~ on iframeload ~~~* //

		iframe.onload = () => {
			const iframeDocument = iframe.contentDocument || iframe?.contentWindow!.document;
			const iframeBody = iframeDocument.body;

			// Append the cloned HTML
			iframeBody.appendChild(htmlCopy);

			// apply same scroll
			const currentScroll = window.scrollY;

			// make scroll instantaneous
			iframeDocument.documentElement.style.scrollBehavior = 'auto';
			iframe.contentWindow?.scrollTo(0, currentScroll);
		};

		mask.appendChild(iframe);
		fixedContainer.appendChild(mask);
		document.body.appendChild(fixedContainer);
	}

	function openLoginModal() {
		modalSvc.open(APP_MODALS.LOGIN_MODAL);
	}

	function logout() {
		authSvc.logout();
	}

	return (
		<nav className="fixed bg-opacity-5 top-0 left-0 w-full z-header transparent px-4 md:px-[24px] lg:px-[100px] py-5">
			<div className="bg-white dark:bg-dark-800 shadow-2xl rounded-[30px] px-[50px] h-header">
				{/* desktop */}
				<div className="flex justify-between items-center  w-full h-full ">
					{/* brand */}
					<Link to={ROUTES.root} className="brand">
						<PwrImagotipo />
					</Link>

					{/* navbar links */}
					<div className="hidden md:flex items-center gap-x-6 ">
						{/* link con */}
						<ul className="flex items-center gap-x-6">
							{/* {userSvc.isAdmin() && (
								<li>
									<Link
										to={ROUTES.dashboard.root}
										className={`navbar-link ${
											pathname.includes('dashboard') ? 'active' : ''
										}`}
									>
										Dashboard
									</Link>
								</li>
							)} */}
							{navBttns.map((nav, idx) => (
								<li key={idx}>
									<Link
										to={nav.href}
										className={`navbar-link ${
											pathname.includes(nav.href) ? 'active' : ''
										}`}
									>
										{nav.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* user */}
					<div className="hidden md:flex items-center gap-x-6 ">
						<button
							className="theme_btn text-agrey-500 dark:text-white"
							onClick={toggleTheme}
						>
							<div className="dark:text-white">
								<i
									className={`fa-if fas fa-${
										settingsSvc.getTheme() === 'light' ? 'moon ' : 'sun-bright'
									}`}
								></i>
							</div>
						</button>

						{authSvc.isLoggedIn() ? (
							<>
								<Link to={'/'}>
									<img
										alt="Profile"
										className="w-11 h-11 rounded-full transition-transform duration-300 hover:scale-110 hover:shadow-lg"
										onError={useDefaultUserImg}
									/>
								</Link>
								<Link to={'/'}>
									<Button className="blue small hover:scale-105 transition duration-300 ease-in-out">
										Create Proposal
									</Button>
								</Link>
							</>
						) : (
							<Button
								className="blue small hover:scale-105 transition duration-300 ease-in-out"
								onClick={openLoginModal}
							>
								Connect Wallet
							</Button>
						)}
					</div>

					<div className="burger-button md:hidden flex">
						{authSvc.isLoggedIn() && (
							<Link to={'/'}>
								<img
									src={userSvc.getUserData().pfp}
									alt=""
									className="w-8 h-8 rounded-full mr-4"
								/>
							</Link>
						)}

						{/* This is a simple burger icon. You can replace this with any SVG or icon library you prefer. */}
						<button
							data-collapse-toggle="navbar-sticky"
							type="button"
							className={`burger ${mobileNavOpen ? 'active' : ''}`}
							aria-controls="navbar-sticky"
							aria-expanded="true"
							onClick={toggleMobileNav}
						>
							<div className="h-line h-line1 dark:bg-white"></div>
							<div className="h-line h-line2 dark:bg-white"></div>
							<div className="h-line h-line3 dark:bg-white"></div>
						</button>
					</div>
				</div>

				{/* mobile */}
				<div className="flex justify-center">
					{/* <SideProfile isOpen={isProfileOpen} closeProfile={toggleProfile} /> */}

					{/* Mobile navigation menu */}
					{mobileNavOpen && (
						<div className="transition-opacity duration-300 ease-in opacity-100 shadow-bottom absolute top-13 mt-[-23px]    w-[92%] rounded-bl-2xl rounded-br-2xl shadow-bl-2xl dark:bg-abrandc-dark-blackish bg-white  p-4 flex flex-col items-center space-y-6">
							{/* links */}
							<div className="space-y-9 mt-5 ">
								<div className="">
									<Link
										to={'/'}
										className="text-center  font-medium text-agrey-900 dark:text-white flex items-center gap-x-2 "
									>
										<div>Projects</div>
									</Link>
								</div>

								<div className="">
									<Link
										to="/"
										className=" justify-center font-medium text-agrey-900 dark:text-white flex items-center gap-x-2 "
									>
										<div>FAQs</div>
									</Link>
								</div>
							</div>

							{/* buttons */}
							<div className="flex justify-between gap-4 mb-3">
								{/* <Button className="secondary medium w-2/4">Connect</Button> */}

								{authSvc.isLoggedIn() ? (
									<>
										<button className="navbar-link" onClick={logout}>
											Log Out
										</button>
									</>
								) : (
									<Button
										className="blue medium w-[117px]"
										onClick={openLoginModal}
									>
										Login
									</Button>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
