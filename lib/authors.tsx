import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'authors');

export const getAuthors = (): any[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const authors = [];

  fileNames.forEach((fileName: string) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    authors.push(JSON.parse(fileContents));
  });

  return [];
};

export const getAuthor = (author: string): any => {
  const fullPath = path.join(postsDirectory, `${author}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}