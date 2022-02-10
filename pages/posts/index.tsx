import Link from 'next/link'
import { useContext, useEffect } from 'react'

import Layout from '../../components/Layout'
import { CurrentPageContext, OggDataContext } from '../../lib/contexts'
import { getSortedPostsData } from '../../lib/posts'

const Posts = ({ allPostsData }): JSX.Element => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { oggData, setOggData } = useContext(OggDataContext);

  useEffect(() => {
    setCurrentPage('blog');
    setOggData({
      ogTitle: 'Blocksy web blog posts covering block chain, crypto, NFTs and tools',
      ogImg: null,
    })
  }, []);

  return (
    <Layout>
      {allPostsData.map((post: any) => {
        return (
          <div key={post.ogUrl}>
            <Link href={post.ogUrl}>
              <a>{post.ogTitle}</a>
            </Link>
          </div>
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