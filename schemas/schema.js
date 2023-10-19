// import object and document schemas
import blockContent from './blockContent'
import category from './category'
import post from './post'
import page from './page'
import metaFiles from './metaFiles'
import author from './author'
import tools from './tools'
import tags from './tags'

// Then we give our schema to the builder and provide the result to Sanity
export default [
    // The following are document types which will appear
    // in the studio.
    post,
    page,
    metaFiles,
    author,
    category,
    tags,
    tools,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent
]
