function isCacheReady(cacheConfig){
  const {isEnabled, client} = cacheConfig

  return isEnabled && client && client.status === 'ready'
}

module.exports = {
  isCacheReady
}
