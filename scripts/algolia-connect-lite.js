import algoliasearch from 'algoliasearch/lite'

const applicationID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const publicKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY_SEARCH
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

const client = algoliasearch(applicationID,publicKey)
const index = client.initIndex(indexName)

export { applicationID,publicKey,indexName,client,index }
