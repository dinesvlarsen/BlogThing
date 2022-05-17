export default {
	title: 'Blog Post',
	name: 'blogpost',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
			validation: Rule => Rule.required(),
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
			description: 'Short description about the blog post (no longer than 300 characters)',
			validation: Rule => [
				Rule.required().min(10).error('A description must be at least 10 characters long'),
				Rule.max(300).error('The description should be less than 200 characters long')
			]

		},
		{
			title: 'Cover Image',
			name: 'coverImage',
			type: 'reference',
			to: [{ type: 'figure' }],
			validation: Rule => Rule.required(),
		},
		{
			title: 'Body',
			name: 'body',
			type: 'blockContent',
			validation: Rule => Rule.required(),
		}
	]
}