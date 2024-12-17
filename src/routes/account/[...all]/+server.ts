import { redirect } from '@sveltejs/kit';

// fallback wild card for all unauthenticated routes in account section
export const GET = async ({ locals: { customerAccount } }) => {
	await customerAccount.handleAuthStatus();

	redirect(307, '/account');
};
