require('dotenv').config({ path: `${process.cwd()}/.env.local` })
const path = require('path')
const fs = require('fs')

const matter = require('gray-matter')
const algoliasearch = require('algoliasearch')

const postsDirectory = path.join(process.cwd(), 'posts')

/**
 * getAllPostIds.
 *
 * returns all post id's under /posts directory
 */
const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory).filter(file => file.match(/\.md/))
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

/**
 * getPostData.
 *
 * returns all data of a blog post using the the given id(blog post name),
 * used only in server side, expected to be run on build
 *
 * @param {String} id is the name of the blog post
 */
const getPostData = (id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const jsonPath = path.join(postsDirectory, 'posts.json')

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const jsonRecords = JSON.parse(fs.readFileSync(jsonPath,'utf8'))

  const post = jsonRecords.find((elem) => elem.id === id)

  const objectID = post ? post.objectID : undefined

  const matterResult = matter(fileContents)

  if(objectID) return {
    objectID,
    id,
    ...matterResult.data,
    content: matterResult.content,
  }
  else return {
    id,
    ...matterResult.data,
    content: matterResult.content,
  }
}

const records = getAllPostIds().map((elem) => {
  const data = getPostData(elem.params.id)
  return {...data}
})

//Enviroment variables
const applicationID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const adminApiKey = process.env.ALGOLIA_API_KEY_ADMIN
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

//initialize client
const client = algoliasearch(applicationID, adminApiKey)
const index = client.initIndex(indexName)

//finally send records!
index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true })
  .then((res) => {
    const currentJson = records.map((record,i) => {
      const ID = res.objectIDs[i]
      return {
        objectID: ID,
        ...record
      }
    })

    const fullPath = path.join(postsDirectory,'posts.json')
    fs.writeFile(fullPath,JSON.stringify(currentJson),(err) => {
      if(err) throw err
      console.log('File saved')
    })
    console.log(res)
  })
  .catch((err) => console.log(err, 'it failed :('))
