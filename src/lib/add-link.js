import determineAs from './determine-as'
import filterAssets from './filter-assets'
import insertLinks from './insert-links'

export default (compilation, options,htmlPluginData)=> {
  if (options.excludeHtmlNames.includes(htmlPluginData.plugin.options.filename)) {
    return htmlPluginData;
  }
  // 按初始/按需过滤资源
  const outAssets = filterAssets({compilation,assetType: options.assetType});
  // chunks转files
  const plainFiles = outAssets.reduce((allfiles, chunk) => {
    return allfiles.concat(chunk.files);}, []);
  // filter size
  let filteredFiles=plainFiles.filter((item)=>!/\.map$/.test(item))
  if (options.minSize) {
    filteredFiles = filteredFiles.filter(item => {
      return compilation.assets[item].size() / 1000 > options.minSize;
    });
  }
  const links = [];
  const publicPath = compilation.outputOptions.publicPath || "";
  try {
    filteredFiles.forEach((item)=>{
      const href = `${publicPath}${item}`;
      const attributes = {href, rel: options.rel };
      if (options.rel === "preload") {
        attributes.as = determineAs({
          href,
          optionsAs: options.as
        }); 
        // font必须同源
        if (attributes.as === "font"&&attributes.crossorigin) {
          attributes.crossorigin = "";
        }
      }

      let linkElement = `<link`
      Object.keys(attributes).forEach((key)=>{
        linkElement += ` ${key}="${attributes[key]}"`
      }) 
      linkElement += '>'
      links.push(linkElement);
    })
  } catch (err) {
    throw err;
  }
  htmlPluginData.html = insertLinks({
    links,
    html: htmlPluginData.html
  });
  return htmlPluginData;
}