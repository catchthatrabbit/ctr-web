import { defineEnvVars } from '@sveltejs/kit/env';

// Declare addon environment settings here; only explicitly public settings reach the browser.
export const variables = defineEnvVars({
	CAPTURE_COUNTRY: { schema: (value) => value },
	CAPTURE_CITY: { schema: (value) => value },
	CTR_POOL_API_DE: { schema: (value) => value },
	CTR_POOL_API_FI: { schema: (value) => value },
	CTR_POOL_API_SG: { schema: (value) => value },
	CTR_POOL_API_HK: { schema: (value) => value },
	CTR_POOL_API_AM: { schema: (value) => value }
});
