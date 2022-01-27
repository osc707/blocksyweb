import fs from 'fs'
import path from 'path'

const authorsDirectory = path.join(process.cwd(), 'authors');

export const getAuthors = (): any[] => {
  const fileNames = fs.readdirSync(authorsDirectory);
  const authors = [];

  fileNames.forEach((fileName: string) => {
    const fullPath = path.join(authorsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    authors.push(JSON.parse(fileContents));
  });

  return authors;
};

export const getAuthor = (author: string): any => {
  const fullPath = path.join(authorsDirectory, `${author}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}