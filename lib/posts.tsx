import { isAfter, isBefore, parse } from 'date-fns'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'

import { GrayMatter } from './constants'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as GrayMatter)
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    const aDate = parse(a, 'yyyy-MM-dd', new Date());
    const bDate = parse(b, 'yyyy-MM-dd', new Date());

    if (isBefore(aDate, bDate)) {
      return 1;
    }

    if (isAfter(aDate, bDate)) {
      return -1;
    }

    return 0;
  }).filter((gm: GrayMatter) => !gm.tags.includes('drafts'));
}
export const getAllPostIds = (): any => {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, '')
      }
    }
  })
};

export async function getPostData(id: string): Promise<any>  {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).use(remarkGfm).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}