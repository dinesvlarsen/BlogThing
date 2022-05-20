export default {
	title: 'Figure',
	name: 'figure',
	type: 'document',
	fields: [
		{
			title: 'Image',
			name: 'image',
			type: 'image',
			options: {
				hotspot: true
			}
		},
		{
			title: 'Alternative text',
			name: 'alt',
			type: 'string',
			description: 'Write what is on the image',
			initialValue: ''
		}
	]
}