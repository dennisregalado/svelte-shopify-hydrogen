import type { Session } from 'svelte-kit-cookie-session';
import type { Storefront, CustomerAccount, HydrogenCart, CartReturn } from '@shopify/hydrogen';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session;
			storefront: Storefront;
			cart: HydrogenCart;
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
