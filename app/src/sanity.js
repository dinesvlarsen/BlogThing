import sanityClient from '@sanity/client';
const SANITY_READ_AND_CREATE_NETLIFY = import.meta.env.VITE_SANITY_KEY

export default sanityClient({
	projectId: '4u8ecpnw',
	dataset: 'production',
	apiVersion: '2022-05-11', //The day the project was started
	useCdn: true, //false for localhost, true for netlify
	withCredentials: true,
	token: SANITY_READ_AND_CREATE_NETLIFY,
});