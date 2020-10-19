export const getVersion = async () => {
  // if (platform == 'Android') {
  let version = await cordova.getAppVersion.getVersionNumber()
  return version
  // }
}
