import type { HydrogenSession } from '@shopify/hydrogen';
import type { Session } from 'svelte-kit-cookie-session';

/**
 * This is a custom session implementation for your Hydrogen shop.
 * Feel free to customize it to your needs, add helper methods, or
 * swap out the cookie-based implementation with something else!
 */
export class AppSession implements HydrogenSession {
 
	#session;

	constructor(session: Session) { 
		this.#session = session;
	}

	static async init(request: Request, secrets: string[]) {}

	has(key: string) {
		return key in this.#session.data;
	}

	get(key: string) {
		return this.#session.data[key];
	}

	flash(key: string, value: string) {
		console.log('flash', key, value);
		return this.#session.flash(key, value);
	}

	unset(key: string) {
		console.log('unset', key);
		return this.#session.unset(key);
	}

	get set() {
		console.log('set');
		return this.#session.set;
	}

	destroy() {
		return this.#session.destroy();
	}

	commit(value: any) {
		return this.#session.update(() => ({ ...value }));
	}
}
