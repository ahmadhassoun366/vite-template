import { useContext, useRef, useState } from 'react';

import Button from 'src/components/internal/button/button.component';
import ModalService from 'src/shared/services/modal/modal.service';
import ModalSvcContext from 'src/shared/services/modal/modal.context';
import APP_MODALS from 'src/static/enums/app.modals';

import AuthService from 'src/shared/services/auth/auth.service';
import AuthSvcContext from 'src/shared/services/auth/auth.context';
// import { PwrProviderNotDetectedError } from 'src/static/app.errors';
// import ROUTES from 'src/static/router.data';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';
// import api from 'src/shared/api/api';
// import ROUTES from 'src/static/router.data';

type LoginModalProps = {
	modalId: APP_MODALS;
	data: null;
};

export default function LoginModal({ modalId }: LoginModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	const authSvc = useContext<AuthService>(AuthSvcContext);
	// 1. inject modalSvc
	const modalSvc = useContext<ModalService>(ModalSvcContext);

	// 3. call the modal hook, it will return this object {show: boolean, closeModal: fn}
	function close() {
		const modalElmt = modalRef.current;
		if (!modalElmt) return;

		modalElmt.classList.add('animate-fadeOut');

		function handleAnimationEnd(e: any) {
			if (!modalElmt) return;
			if (e.animationName !== 'fadeOut') return;

			modalSvc.closeModal(modalId);
			modalElmt.classList.remove('animate-fadeOut');
			modalElmt.removeEventListener('animationend', handleAnimationEnd);
			// modalElmt.add('animate-fadeIn');
		}

		modalElmt.addEventListener('animationend', handleAnimationEnd);
	}

	const [loading, setLoading] = useState(false);
	async function pwrLogin() {
		setLoading(true);
		try {
			await authSvc.auth();
		} catch (err: any) {
			// if (err instanceof PwrProviderNotDetectedError) {
			// 	// show error
			// 	// window.open(ROUTES.external.wallet, '_blank');
			// 	return;
			// }

			if (err?.code === 101) {
				toast.error('Login request cancelled');
				return;
			}

			toast.error('Error logging in with PWR Wallet');
			throw err;
		} finally {
			setLoading(false);
			close();
		}
	}

	return (
		// <!-- modal size manager -->
		<div
			className={` w-full max-w-[406px] max-h-full animate-fadeIn pointer-events-auto `}
			tabIndex={-1}
			ref={modalRef}
		>
			{/* modal box */}
			<div className="relative dark:bg-dk_blue-900 bg-white dark:bg-dark-800 rounded-lg shadow ">
				{/* modal header */}
				<div className="flex items-start justify-between px-8 py-6  rounded-t ">
					<h1 className="text-2xl font-bold text-black dark:text-white">Log In</h1>
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						data-modal-hide="defaultModal"
						onClick={close}
					>
						<span className="icon">
							<i className="far fa-times"></i>
						</span>

						<span className="sr-only">Close modal</span>
					</button>
				</div>

				{/* modal body */}
				<div className="px-8 pb-6 space-y-6">
					<p className="text-base leading-relaxed text-black dark:text-gray-400">
						Welcome to PWR Governance! Login or sign up to submit proposals, comment and
						vote. Please note that voting is available for validators only.
					</p>

					{/* buttons con */}
					<div className="flex flex-col gap-[12px]">
						<div className="">
							<Button
								className={`blue w-full ${loading && 'loading'}`}
								onClick={pwrLogin}
							>
								<span>
									<img
										src="src/assets/pwr.svg"
										className="inline mr-[8px]"
										alt=""
									/>
								</span>
								Log in with PWR Wallet
							</Button>
						</div>

						{/* <div className="">
							<Button
								className=" w-full text-[14px] dark:text-white font-normal leading-[24px] border border-solid border-abrandc-dark-grey dark:border-abrandc-light-grey"
								ref={googleBtn}
								// className="g_id_signin"
								data-type="standard"
								data-shape="pill"
								data-theme="filled_blue"
								data-size="large"
							>
								<span>
									<img
										src="src/assets/google.svg"
										className="inline mr-[8px]"
										alt=""
									/>
								</span>
								Log in with Google
							</Button>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
