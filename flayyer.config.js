// Created with create-flayyer-app@1.15.2

const {config} = require('@flayyer/flayyer-types');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLAYYER_KEY,
  deck: 'github-cards',

  // Optionals
  name: 'Github Cards',
  description:
    'Replica of new GitHub og:images to show how to use Flayyer to generate images.',
  repository: 'https://github.com/flayyer/flayyer-marketplace-github-cards',
  homepage: 'https://flayyer.com',
  license: 'MIT',
  keywords: ['flayyer', 'github'],
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY'],
  marketplace: true,
  private: false
});
