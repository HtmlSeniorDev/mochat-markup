const path = require('path')

const parts = require('./webpack.parts')

const paths = require('./pathsApp')

module.exports = [
  parts.page({
    title: 'index.pug',
    path: 'pages/index',
    entry: {
      markup_pageList: path.join(paths.app, 'pug/pages/index')
    },
    template: path.join(paths.app, 'pug/pages/index/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'markup_pageList']
  }),
  parts.page({
    title: 'nojs-browser',
    path: 'pages/nojs-browser',
    entry: {
      'nojs-browser': path.join(paths.app, 'pug/pages/nojs-browser')
    },
    template: path.join(paths.app, 'pug/pages/nojs-browser/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'nojs-browser']
  }),
  parts.page({
    title: 'update-browser',
    path: 'pages/update-browser',
    entry: {
      'update-browser': path.join(paths.app, 'pug/pages/update-browser')
    },
    template: path.join(paths.app, 'pug/pages/update-browser/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'update-browser']
  }),
  parts.page({
    title: 'chatportal',
    path: 'pages/chatportal',
    entry: {
      markup_dom: path.join(paths.app, 'pug/pages/chatportal')
    },
    template: path.join(paths.app, 'pug/pages/chatportal/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'chatportal']
  }),
  parts.page({
    title: 'balance',
    path: 'pages/balance',
    entry: {
      markup_dom: path.join(paths.app, 'pug/pages/balance')
    },
    template: path.join(paths.app, 'pug/pages/balance/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'balance']
  }),
  parts.page({
    title: 'avtoritet',
    path: 'pages/avtoritet',
    entry: {
      markup_avtoritet: path.join(paths.app, 'pug/pages/avtoritet')
    },
    template: path.join(paths.app, 'pug/pages/avtoritet/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'avtoritet']
  }),
  parts.page({
    title: 'friends',
    path: 'pages/friends',
    entry: {
      markup_friends: path.join(paths.app, 'pug/pages/friends')
    },
    template: path.join(paths.app, 'pug/pages/friends/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'friends']
  }),
  parts.page({
    title: 'avtoritet-buy',
    path: 'pages/avtoritet-buy',
    entry: {
      markup_avtoritet_buy: path.join(paths.app, 'pug/pages/avtoritet-buy')
    },
    template: path.join(paths.app, 'pug/pages/avtoritet-buy/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'avtoritet-buy']
  }),
  parts.page({
    title: 'balance-mobile',
    path: 'pages/balance-mobile',
    entry: {
      markup_balance_mobile: path.join(paths.app, 'pug/pages/balance-mobile')
    },
    template: path.join(paths.app, 'pug/pages/balance-mobile/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'balance-mobile']
  }),
  parts.page({
    title: 'gifts',
    path: 'pages/gifts',
    entry: {
      markup_gifts: path.join(paths.app, 'pug/pages/gifts')
    },
    template: path.join(paths.app, 'pug/pages/gifts/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'gifts']
  }),

];
