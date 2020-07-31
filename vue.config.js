module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'dice.gamedesign.app',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  }
}