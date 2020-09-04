const path = require('path')

const parts = require('./webpack.parts')

const paths = require('./pathsApp')

module.exports = [
  parts.page({
    title: 'index',
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
    title: 'dom-expert',
    path: 'pages/dom-expert',
    entry: {
      markup_dom: path.join(paths.app, 'pug/pages/dom-expert')
    },
    template: path.join(paths.app, 'pug/pages/dom-expert/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'dom_expert']
  }),
  parts.page({
    title: 'engagement-survey',
    path: 'pages/engagement-survey',
    entry: {
      markup_engagement: path.join(paths.app, 'pug/pages/engagement-survey')
    },
    template: path.join(paths.app, 'pug/pages/engagement-survey/index.pug'),
    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'engagement-survey']
  }),
]
