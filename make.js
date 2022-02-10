#!/usr/bin/env node

const fs = require('fs');
const { format } = require('date-fns');
const inquirer = require('inquirer');
const path = require('path');

module.exports = (() => {
  console.log('here');
  inquirer.prompt([
    {
      type: 'list',
      name:  'pageType',
      message: 'What type of page would you like to create?',
      choices: [ 'Blog', 'Definition'],
      default: 'Blog'
    },
    {
      type: 'input',
      name: 'title',
      message: 'Enter a Title for your post:',
      default: 'new-blog-page'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter your author id',
      default: 'osc'
    }
  ]).then((answers) => {
    const blogDate = `${format(new Date(), 'yyyy-MM-dd')}`; // YYYY-mm-dd
    const title = (answers.title || 'new-file');
    const fileName =  title.replace(/[\W_]+/g, '-').toLowerCase();
    const isBlog = 'Blog' === answers.pageType;
    const fileFolder = (isBlog) ? path.join(__dirname, 'posts') : path.join(__dirname, 'definitions');
    const url = (isBlog) ? `/posts/${fileName}` : `/definitions`;
    const tags = (isBlog) ? 'posts' : 'definitions';
    const fileExtension = '.mdx';
    const fileContents = `---\r\n` + 
      `tags:\r\n` + 
      ` - ${tags}\r\n` + 
      ` - drafts\r\n` + 
      `date: '${blogDate}'\r\n` + 
      `ogTitle: '${title}'\r\n` +
      `ogDesc: \r\n` + 
      `ogUrl: '${url}'\r\n` +
      `ogImg: \r\n` +
      `author: '${answers.author}'\r\n` +
      `---\r\n` +
      `\r\n\r\n`;

    const data = new Uint8Array(Buffer.from(fileContents));
    const wholeFileName = `${fileFolder}/${fileName}${fileExtension}`;

    fs.writeFile(wholeFileName, data, { flag: 'w' }, err => {
      if (err) {
        return console.error(err);
      }
      fs.readFile(wholeFileName, 'utf-8', (err, data) => {
        if (err) {
          return console.error(err);
        }
        console.log(data);
      });
    });
  });
})();