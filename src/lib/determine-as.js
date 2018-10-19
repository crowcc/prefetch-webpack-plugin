export default ({optionsAs,href}) => {
  switch (typeof optionsAs) {
  case 'string':
  {
    return optionsAs
  }
  case 'function':
  {
    return optionsAs(href)
  }
  case 'undefined':
  {
    if (/\.css$/.test(href)) {
      return 'style'
    }
    if (/(\.eot|\.woff2|\.woff|\.svg|\.ttf)$/.test(href)) {
      return 'font'
    }
    if (/\.js$/.test(href)) {
      return 'script'
    }
    if (/(\.png|\.jpg)$/.test(href)) {
      return 'image'
    }
    throw new Error(`can not determine the as value`)
  }
  default:
    throw new Error(`can not determine the as value`)
  }
}
