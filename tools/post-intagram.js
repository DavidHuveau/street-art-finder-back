const { IgApiClient } = require('instagram-private-api');
require('dotenv').config()
const { readFile } = require('fs');
const util = require('util');

const ig = new IgApiClient();

const login = async () => {
  // You must generate device id's before login.
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  // console.log(loggedInUser);
}

const getFile = path => {
  return util.promisify(readFile)(path);
}

const publishPhoto = async (path, caption) => {
  try {
    await login();
    const publishResult = await ig.publish.photo({
      file: await getFile(path),
      caption,
    });
    // console.log(publishResult);
    return publishResult.status === "ok"
  }
  catch (err) {
    return false
  }
};

module.exports = publishPhoto;

