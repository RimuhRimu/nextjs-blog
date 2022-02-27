/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostData = getSortedPostsData()
  return {
    props: {
      allPostData
    }
  }
}

//automatically #home get the prop allPostData
export default function Home({allPostData}) {
  return (
    <Layout home>
      <Head>
        <title> {siteTitle} </title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, i am Rimu and i love web development and i'am learning Next.js</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {
            allPostData.map( ({id,date,title}) => {
              return (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/post/${id}`}><a>{title}</a></Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date}></Date>
                  </small>
                </li>
              )
            })
          }
        </ul>
      </section>
    </Layout>
  )
}
