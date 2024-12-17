import type { Storefront, CustomerAccount, HydrogenCart, CartReturn, HydrogenSession } from '@shopify/hydrogen';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: HydrogenSession;
			storefront: Storefront;
			cart: HydrogenCart;
			customerAccount: CustomerAccount;
		}

		interface PageData {
			cart: Promise<CartReturn>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};