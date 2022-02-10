import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'

import { GrayMatter } from './constants'

const definitionsDirectory = path.join(process.cwd(), 'definitions');

export const getSortedDefinitionsData = async (): Promise<any> => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(definitionsDirectory)
  const files = Promise.all(fileNames.map(async (fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(definitionsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).use(remarkGfm).process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...(matterResult.data as GrayMatter),
    }
  }));
  return (await files).filter((gm: GrayMatter) => !gm.tags.includes('drafts'));
  // Sort posts by title
  // return allPostsData.sort(({ ogTitle: a }, { ogTitle: b }) => a.localeCompare(b));
}
export const getAllPostIds = (): any => {
  const fileNames = fs.readdirSync(definitionsDirectory)

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

export async function getDefinitionData(id: string): Promise<any>  {
  const fullPath = path.join(definitionsDirectory, `${id}.mdx`);
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