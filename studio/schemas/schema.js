import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

/* documents */
import exampleDocument from './documents/exampleDocument.js'

/* types */
import imageCaption from './types/imageCaption.js'

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([
		exampleDocument,
		imageCaption,	
	]),
})
