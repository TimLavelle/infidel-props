const path = require('path');
const glob = require('glob');

module.exports = {
  mode: 'development',
  entry: () => {
    return glob.sync('./blocks/**/*.postcss.css').reduce((entries, file) => {
      const name = path.basename(file, '.postcss.css');
      entries[name] = file;
      return entries;
    }, {});
  },
  output: {
      filename: '[name].css',
      path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.postcss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import'),
                  require('postcss-preset-env')({ stage: 1 }),
                  require('postcss-nested'),
                  require('cssnano'),
                ],
              },
            },
          },
        ]
      }
    ]
  }
}
