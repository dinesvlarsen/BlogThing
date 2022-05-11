import sanityClient from '@sanity/client';

export default sanityClient({
	projectId: '32td7jzv',
	dataset: 'production',
	apiVersion: '2022-03-30', //dagen prosjektet ble først opprettet/sist oppdatert
	useCdn: false //false for localhost, true for netlify
});