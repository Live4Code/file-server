var api = require('./api');

module.exports = function (app) {
  app.get('/api/filetree/user/:userId/course/:courseId', api.fileTree);
  app.get('/api/filecontent/user/:userId/course/:courseId', api.getFileContent);
};