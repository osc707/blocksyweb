import Image from 'next/image'
import { useContext, useEffect } from 'react'

import Layout from '../../components/Layout'
import { getAuthor } from '../../lib/authors'
import { GrayMatter } from '../../lib/constants'
import {
  CurrentPageContext,
  FullPageContext,
  NavVisibleContext,
  OggDataContext
} from '../../lib/contexts'
import { getAllPostIds, getPostData } from '../../lib/posts'

const Post = ({ postData, author }) => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { oggData, setOggData } = useContext(OggDataContext);
  const { hasNav, setHasNav } = useContext(NavVisibleContext);
  const { isFullPage, setIsFullPage } = useContext(FullPageContext);

  useEffect(() => {
    setCurrentPage('blog');
    setIsFullPage(false);
    setHasNav(true);
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
        {postData.ogImg && (
          <div>
            <Image layout='responsive' width={752} height={752} src={postData.ogImg}/>
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
        <div className='tags'>
          <strong>Tags </strong> 
          {postData.tags.filter((tag: string) => tag !== 'posts').filter((tag: string) => tag !== 'drafts').map((tag: string) => (
            <span className='px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease' key={tag}>{tag}</span>
          ))}
        </div>
        {/* TODO: make the author block */}
        {/* <p>{JSON.stringify(author)}</p> */}
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