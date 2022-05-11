import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

/* documents */
import blogPost from './documents/blogPost.js'


/* types */
import figure from './types/figure.js'
import imageCaption from './types/imageCaption.js'

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([
		blogPost,
		figure,
	]),
})
