import ERROR_CODES from 'src/static/enums/error-codes.enum';

/**
 * in this file you can define all the possible errors that can be thrown in the app
 *
 */

export class CustomError extends Error {
	constructor(public message: string, public code: ERROR_CODES) {
		super(message);
	}
}

export class ExampleError extends CustomError {
	constructor() {
		super('This is an example error', ERROR_CODES.EXAMPLE_ERROR);
	}
}
