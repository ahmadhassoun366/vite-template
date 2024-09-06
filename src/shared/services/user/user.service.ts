import { signal, type Signal } from '@preact/signals-react';
import { UserData } from 'src/shared/models/user/user.model';

export default class UserService {
	private userData: Signal<UserData> = signal({
		username: '',
		pfp: '',
	});

	setUserData(userData: UserData) {
		this.userData.value = userData;
	}

	getUserData() {
		return this.userData.value;
	}

	isAdmin() {
		return false;
		// return this.userData.value.role === 'Admin' || this.userData.value.role === 'Super Admin';
	}
}
