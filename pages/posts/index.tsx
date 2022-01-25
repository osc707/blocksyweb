import Link from 'next/link'
import { useContext, useEffect } from 'react'

import Layout from '../../components/Layout'
import {
  CurrentPageContext,
  OggDataContext,
  PageBgContext
} from '../../lib/contexts'
import { getSortedPostsData } from '../../lib/posts'

const Posts = ({ allPostsData }): JSX.Element => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { pageCss, setPageCss } = useContext(PageBgContext);
  const { oggData, setOggData } = useContext(OggDataContext);

  useEffect(() => {
    setCurrentPage('blog');
    setPageCss('appContainer appContainer--light');
    setOggData({
      title: 'Blocksy web blog posts covering block chain, crypto, NFTs and tools',
      img: null,
    })
  }, []);

  return (
    <Layout>
      {allPostsData.map((post: any) => {
        return (
          <Link key={post.ogUrl} href={post.ogUrl}>
            <a>{post.ogTitle}</a>
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