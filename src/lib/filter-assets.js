

export default ({compilation, assetType}) => {
  try {
    if (assetType === undefined || assetType === 'asyncChunks') {
      return compilation.chunks.filter(chunk => {
        if ('canBeInitial' in chunk) {
          return !chunk.canBeInitial()
        }
        return !chunk.isInitial()
      })
    }
    if (assetType === 'initial') {
      return compilation.chunks.filter(chunk => {
        if ('canBeInitial' in chunk) {
          return chunk.canBeInitial()
        }
        return chunk.isInitial()
      })
    }
    if (assetType === 'allChunks') {
      return compilation.chunks
    }
  } catch (error) {
    return compilation.chunks
  }
  throw new Error(`The 'assetType' option must be one of the next: asyncChunks, initial, allChunks`)
}