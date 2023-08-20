// handy information in browser console, to know what we are deploying
const versionInfo = {
  version: process.env.REACT_APP_TAG_NAME,
  hash: process.env.REACT_APP_GIT_COMMIT,
};
if (versionInfo.version) {
  console.table(versionInfo);
}

export default () => (
    <p>ui content will go here</p>
);
