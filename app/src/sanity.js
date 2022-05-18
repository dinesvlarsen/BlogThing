import sanityClient from '@sanity/client';

export default sanityClient({
	projectId: '4u8ecpnw',
	dataset: 'production',
	apiVersion: '2022-05-11', //dagen prosjektet ble først opprettet/sist oppdatert
	useCdn: false, //false for localhost, true for netlify
	withCredentials: true
});