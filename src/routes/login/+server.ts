import { redirect } from '@sveltejs/kit';


export async function GET({ url }) {
	const returnTo = `${url.origin}/auth/callback`;
	const params = new URLSearchParams({
		'openid.ns': 'http://specs.openid.net/auth/2.0',
		'openid.mode': 'checkid_setup',
		'openid.return_to': returnTo,
		'openid.realm': url.origin,
		'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
		'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
	});
	throw redirect(302, `https://steamcommunity.com/openid/login?${params}`);
}
