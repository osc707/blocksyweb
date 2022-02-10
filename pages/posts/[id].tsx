import { useContext, useEffect } from 'react'

import Layout from '../../components/Layout'
import { getAuthor } from '../../lib/authors'
import { GrayMatter } from '../../lib/constants'
import { CurrentPageContext, OggDataContext } from '../../lib/contexts'
import { getAllPostIds, getPostData } from '../../lib/posts'

const Post = ({ postData, author }) => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { oggData, setOggData } = useContext(OggDataContext);

  useEffect(() => {
    setCurrentPage('blog');
    setOggData({
      ogTitle: postData.ogTitle,
      ogDesc: postData.ogDesc,
      ogUrl: postData.ogUrl,
      ogImg: postData.ogImg,
      tags: [...postData.tags],
      amzn: postData.amzn,
      tb: postData.tb,
      date: postData.date,
    } as GrayMatter)
  }, []);

  return (
    <Layout>
      <h1>{postData.ogTitle}</h1>
      <div className='post' dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      <div>Tags: {postData.tags.filter((tag: string) => tag !== 'posts').filter((tag: string) => tag !== 'drafts').map((tag: string) => (<span key={tag}>{tag}</span>))}</div>
      <p>{JSON.stringify(author)}</p>
    </Layout>
  )
};

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const author = getAuthor(postData.author);
  return {
    props: {
      postData,
      author
    }
  }
}

export default Post;