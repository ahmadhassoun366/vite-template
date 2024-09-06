import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from 'src/shared/query-client';
import AuthSvcContext from 'src/shared/services/auth/auth.context';
import AuthService from 'src/shared/services/auth/auth.service';
import DocTitleSvcContext from 'src/shared/services/doc-title/doc-title.context';
import DocumentTitleService from 'src/shared/services/doc-title/doc-title.service';

import ModalSvcContext from 'src/shared/services/modal/modal.context';
import ModalService from 'src/shared/services/modal/modal.service';

import UserSvcContext from 'src/shared/services/user/user.context';
import UserService from 'src/shared/services/user/user.service';

const titleSvc = new DocumentTitleService();
const modalSvc = new ModalService();

const authSvc = new AuthService();
const userSvc = new UserService();

function AppUISvcs({ children }: { children: ReactNode }) {
	return (
		<DocTitleSvcContext.Provider value={titleSvc}>
			<ModalSvcContext.Provider value={modalSvc}>{children}</ModalSvcContext.Provider>
		</DocTitleSvcContext.Provider>
	);
}

function AppFnSvcs({ children }: { children: ReactNode }) {
	return (
		<AuthSvcContext.Provider value={authSvc}>
			<UserSvcContext.Provider value={userSvc}>{children}</UserSvcContext.Provider>
		</AuthSvcContext.Provider>
	);
}

type ContextComponentProps = {
	children: ReactNode;
};

export default function ContextComponent({ children }: ContextComponentProps) {
	return (
		<AppUISvcs>
			<QueryClientProvider client={queryClient}>
				<AppFnSvcs> {children}</AppFnSvcs>
			</QueryClientProvider>
		</AppUISvcs>
	);
}
