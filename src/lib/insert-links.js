
export default ({ html, links = []})=> {
  if (links.length === 0) {
    return html
  }
  if (html.includes('</head>')) {
    return html.replace('</head>', `${links.join('')}</head>`)
  }
  if (html.includes('<body>')) {
    return html.replace('<body>', `<head>${links.join('')}\n</head><body>`)
  }
  throw new Error('The HTML provided did not contain a </head> or a <body>')
}