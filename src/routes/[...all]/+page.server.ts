import { error } from '@sveltejs/kit';

export const load = async ({ request }) => {
	error(404, `${new URL(request.url).pathname} not found`);
};
