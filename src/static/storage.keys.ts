/**
 * This file contains all the keys used to store data in the local storage
 * make the key is related to the data it stores
 *
 * REMEMBER TO AVOID STORING SENSITIVE DATA IN LOCAL STORAGE
 */

const STORAGE_KEYS = {
	// settings
	generalSettings: 'app.generalSettings',

	// auth
	auth_session: 'app.auth.session',

	/**
	 * the data stored in memory storage is not persistent,
	 * it is lost when the page is refreshed or closed
	 */
	// *~~~ SESSION STORAGE ~~~* //
	user_data: 'app.user.data',
};

export default STORAGE_KEYS;
