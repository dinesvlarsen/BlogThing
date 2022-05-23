export default {
	name: 'comment',
	type: 'document',
	title: 'Comment',
	fields: [
		{
			name: 'name',
			type: 'string',
			title: 'Name',
			readOnly: true,
		},
		{
			name: 'country',
			type: 'string',
			title: 'Country',
			readOnly: true,
		},
		{
			name: 'text',
			type: 'text',
			readOnly: true,
		},
		{
			name: 'post',
			type: 'reference',
			to: [
				{
					type: 'blogpost'
				},
			]
		}
	]

}