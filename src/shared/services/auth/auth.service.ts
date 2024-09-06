import { signal, type Signal } from '@preact/signals-react';

import { APP_EVENTS } from 'src/static/enums/app.events';
import { UserData } from 'src/shared/models/user/user.model';

export default class AuthService {
	private authenticated: Signal<boolean> = signal(false);

	async init(): Promise<void> {
		await this.restoreSession();
	}

	isLoggedIn() {
		return this.authenticated.value;
	}

	// *~~~ Auth ~~~* //

	// async signup(password: string): Promise<void> {}

	async auth(): Promise<void> {
		// for the logic

		const loggedInEvent = new CustomEvent<UserData>(APP_EVENTS.AUTH_LOGGED_IN, {
			detail: {
				username: 'User Name',
				pfp: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
			},
		});
		document.dispatchEvent(loggedInEvent);

		this.authenticated.value = true;
	}

	async logout(): Promise<void> {
		const loggedOutEvent = new CustomEvent(APP_EVENTS.AUTH_LOGGED_OUT);
		document.dispatchEvent(loggedOutEvent);

		this.authenticated.value = false;
	}

	public async restoreSession(): Promise<void> {
		const loggedIn = false;

		if (loggedIn) {
			try {
				const loggedInEvent = new CustomEvent<UserData>(APP_EVENTS.AUTH_LOGGED_IN, {
					detail: {
						username: 'Unkown User',
						pfp: '/images/DefaultPerson.png',
					},
				});

				document.dispatchEvent(loggedInEvent);
				this.authenticated.value = true;
			} catch (err) {
				this.logout();
				return;
			}
		}
	}
}
