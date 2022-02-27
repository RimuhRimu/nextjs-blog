import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getSortedPostsData = () => {
  //get filenames under /posts
  const fileName = fs.readdirSync(postsDirectory).filter(file => file.match(/\.md/))
  const allPostData = fileName.filter(fileName => fileName.match(/\.md/g)).map( (fileName) => {
    //remove '.md' from file name to get id
    const id = fileName.replace(/\.md/,'')

    //read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath,'utf8')

    const matterResult = matter(fileContents)

    //combine the data with id
    return {
      id,
      ...matterResult.data
    }
  })

  //sort post by date
  return allPostData.sort( ({date: a} , {date: b}) => {
    if (a < b) {
      return 1
    }
    else if (a > b) {
      return -1
    }
    else {
      return 0
    }
  })
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory).filter(file => file.match(/\.md/))
  return fileNames.map(fileName =>{
    return {
      params: {
        id: fileName.replace(/\.md$/,'')
      }
    }
  })
}

export const getPostData = async (id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath,'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
