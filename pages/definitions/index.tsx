import React, { useContext, useEffect } from 'react'

import Layout from '../../components/Layout'
import { CurrentPageContext, OggDataContext } from '../../lib/contexts'
import { getSortedDefinitionsData } from '../../lib/definitions'

const Posts = ({ allPostsData }): JSX.Element => {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { oggData, setOggData } = useContext(OggDataContext);

  useEffect(() => {
    setCurrentPage('definitions');
    setOggData({
      ogTitle: 'Definitions so that reading our other content make sense',
      ogImg: null,
    })
  }, []);

  return (
    <Layout>
      <h1>Definitions</h1>
      {allPostsData.map((post: any) => {
        return (
          <React.Fragment key={post.id}>
            <a id={post.id}></a>
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
          </React.Fragment>
        );
      })}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const allPostsData = await getSortedDefinitionsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Posts;