import 'dotenv/config'

import algoliasearch from 'algoliasearch'
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY_ADMIN)
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)


// index.getSettings({
// 	searchableAttribute:['title','description']
// })

// index.getSettings()
// 	.then(res => console.log(res))

index.search('pre-rendering')
  .then(res => {
    console.log(res.nbHits)
    for (const hit of res.hits) {
      console.log(hit)
    }
  })
