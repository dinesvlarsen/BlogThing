export default {
	title: 'Blog Post',
	name: 'blogpost',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string'
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			}
		},
		{
			title: 'Date',
			name: 'date',
			type: 'date',
			options: {
				dateFormat: 'MMMM-DD-YYYY',
			},
			validation: Rule => Rule.required(),
		},
		{
			title: 'Post Description',
			name: 'description',
			type: 'text',
			description: 'Short description about the blog post (no longer than 200 characters)',
			validation: Description => [
				Description.required().min(10).error('A description must be at least 10 characters long'),
				Description.max(200).error('The description should be less than 200 characters long')
			]

		},
		{
			title: 'Cover Image',
			name: 'coverImage',
			type: 'reference',
			to: [{ type: 'figure' }],
			validation: Image => Image.required(),
		},
		{
			title: 'Body',
			name: 'body',
			type: 'array',
			of: [
				{ type: 'block' },

				{
					title: 'Insert cover image',
					name: 'coverImage',
					type: 'reference',
					to: [{ type: 'figure' }],
				},

				{
					title: 'Insert image',
					type: 'figure'
				}


			]
		}
	]
}