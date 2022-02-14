import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'

import Layout from '../../components/Layout'
import {
  CurrentPageContext,
  FullPageContext,
  NavVisibleContext,
  OggDataContext
} from '../../lib/contexts'
import { getSortedPostsData } from '../../lib/posts'

const Posts = ({ allPostsData }): JSX.Element => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { oggData, setOggData } = useContext(OggDataContext);
  const { hasNav, setHasNav } = useContext(NavVisibleContext);
  const { isFullPage, setIsFullPage } = useContext(FullPageContext);

  useEffect(() => {
    setCurrentPage('blog');
    setIsFullPage(false);
    setHasNav(true);
    setOggData({
      ogTitle: 'Blocksy web blog posts covering block chain, crypto, NFTs and tools',
      ogImg: null,
    })
  }, []);

  return (
    <Layout>
      <h1>Blog</h1>
      {allPostsData.map((post: any) => {
        return (
          <Link href={post.ogUrl} key={post.ogUrl}>
            <div key={post.ogUrl} className="max-w-sm rounded overflow-hidden shadow-md">
              <Image
                width={400}
                height={200}
                className="w-full" 
                src={post.ogImg}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {post.ogTitle}
                </div>
                <div className="text-gray-700 text-base">
                  {post.ogDesc}
                </div>
                <div className='text-right'>
                  <Link href={post.ogUrl}>
                    <a>read more</a>
                  </Link>
                </div>
              </div>
              <div className="px-6 pt-0 pb-2">
                {post.tags.filter((tag: string) => tag !== 'posts').filter((tag: string) => tag !== 'drafts').map((tag: string) => (
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2' key={tag}>#{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Posts;