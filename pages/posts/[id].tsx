import { useContext, useEffect } from 'react'

import Layout from '../../components/Layout'
import { getAuthor } from '../../lib/authors'
import { GrayMatter } from '../../lib/constants'
import {
  CurrentPageContext,
  OggDataContext,
  PageBgContext
} from '../../lib/contexts'
import { getAllPostIds, getPostData } from '../../lib/posts'

const Post = ({ postData, author }) => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { pageCss, setPageCss } = useContext(PageBgContext);
  const { oggData, setOggData } = useContext(OggDataContext);

  useEffect(() => {
    setCurrentPage('blog');
    setPageCss('appContainer appContainer--light');
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
      <div className='post'>
        <h1>{postData.ogTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
        {postData.tags.filter((tag: string) => tag !== 'posts').map((tag: string) => (<p key={tag}>{tag}</p>))}
        <p>{JSON.stringify(author)}</p>
      </div>
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