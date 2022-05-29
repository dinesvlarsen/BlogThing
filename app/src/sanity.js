import sanityClient from '@sanity/client';
const token = import.meta.env.VITE_SANITY_API_KEY;

export default sanityClient({
	projectId: '4u8ecpnw',
	dataset: 'production',
	apiVersion: '2022-05-11', //dagen prosjektet ble først opprettet/sist oppdatert
	useCdn: true, //false for localhost, true for netlify
	withCredentials: true,
	token: process.env.SANITY_KEY,
});