import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

/* documents */
import blogPost from './documents/blogPost.js'
import comment from './documents/comment.js'
import figure from './documents/figure.js'


/* types */

import blockContent from './types/blockContent.js';

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([
		blogPost,
		figure,
		blockContent,
		comment
	]),
})
