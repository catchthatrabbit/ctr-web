import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	if (url.pathname === '/go-live' || url.pathname.startsWith('/go-live/')) {
		redirect(308, `/start-mining${url.pathname.slice('/go-live'.length)}${url.search}`);
	}
};
