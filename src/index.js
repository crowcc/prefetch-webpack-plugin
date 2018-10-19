import addLinks from './lib/add-link'

const defaultOptions =  {
  rel: 'prefetch',
  assetType: 'asyncChunks',
  excludeHtmlNames: []
};

class PrefetchPlugin {
  constructor(options) {
    this.options = Object.assign({},defaultOptions, options);
  }
  apply(compiler) {
    if ("hooks" in compiler) {
      compiler.hooks.compilation.tap(this.constructor.name, compilation => {
        if ("htmlWebpackPluginBeforeHtmlProcessing" in compilation.hooks) {
          compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
            this.constructor.name,
            (htmlPluginData, callback) => {
              try {
                callback(null, addLinks(compilation, this.options,htmlPluginData));
              } catch (error) {
                compilation.errors.push(error);
                callback(error);
              }
            }
          );
        } else {
          const error = new Error(`Make sure to list ${this.constructor.name} after HtmlWebpackPlugin in webpack's plugins array.`);
          compilation.errors.push(error);
        }
      });
    } else {
      const error = new Error("only support webpack 4 ");
      compilation.errors.push(error);
    }
  }
}

module.exports = PrefetchPlugin;
