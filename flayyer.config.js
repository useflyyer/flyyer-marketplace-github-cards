// Created with create-flayyer-app@1.15.2

const {config} = require('@flayyer/flayyer-types');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLAYYER_KEY,
  deck: 'github-cards',

  // Optionals
  name: 'Github Cards',
  description: 'Created with create-flayyer-app'
});
