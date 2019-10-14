//多页面应用解决方案，暂时保存后面改进

const files = glob.sync(path.join(__dirname, './src/page/*/index.js'));
const pageNames = files.map((filePath) => filePath.match(/src\/page\/(.*)\/index\.js$/)[1]);
const mapConfig = files.reduce((mpa, filePath) => {
  const index = files.indexOf(filePath);
  const pageName = pageNames[index];
  mpa.entry[pageName] = filePath;

  const plugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, `src/page/${pageName}/index.html`),
    filename: `${pageName}.html`,
    // chunks: [pageName],
    excludeChunks: pageNames.filter((page) => page !== pageName),
    inject: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: false,
      minifyCSS: true,
      minifyJS: true,
      removeComments: false,
    },
  });
  mpa.htmlWebpackPlugins.push(plugin);

  return mpa;
}, {
  entry: {},
  htmlWebpackPlugins: [],
});