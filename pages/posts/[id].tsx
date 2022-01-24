import { useContext, useEffect } from 'react'

import Layout from '../../components/Layout'
import { GrayMatter } from '../../lib/constants'
import {
  CurrentPageContext,
  OggDataContext,
  PageBgContext
} from '../../lib/contexts'
import { getAllPostIds, getPostData } from '../../lib/posts'

const Post = ({ postData }) => {
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
      <div 
        className='postContainer' 
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}>
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
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default Post;