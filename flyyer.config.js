// Created with create-flyyer-app@1.15.2

const {config} = require('@flyyer/types');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLYYER_KEY,
  deck: 'github-cards',

  // Optionals
  name: 'Github Cards',
  description:
    'Replica of new GitHub og:images to show how to use Flyyer to generate images.',
  repository: 'https://github.com/useflyyer/flyyer-marketplace-github-cards',
  homepage: 'https://flyyer.io',
  license: 'MIT',
  keywords: ['flyyer', 'github'],
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY'],
  marketplace: true,
  private: false
});
