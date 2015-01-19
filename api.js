var config = require('./config');
var fs            = require('fs');
var path          = require('path');

exports.fileTree = function (req, res){
  var error = new Error();
  error.code = 318;
  error.name = "Read Dir Failed";
  error.http_code = 400;

  if (!req.params.courseId || !req.params.userId) {
    winston.error('[runner fileTree] required information missing. req.params is '+JSON.stringify(req.params));
    error.message = 'Required information missing for reading dir';
    return res.send(400, error);
  }

  var courseRepoPath = config.repo_path+'/'+req.params.userId+'/'+req.params.courseId;

  var _p;
  if (!req.query.id || req.query.id == 1) {
    _p = courseRepoPath;
    processReq(_p, res);
  } else {
    if (req.query.id) {
      _p = req.query.id;
      processReq(_p, res);
    } else {
      res.json(['No valid data found']);
    }
  }
};

exports.getFileContent = function(req, res){
  var path = req.query.path;
  var courseId = req.params.courseId;
  if(!path) return res.send(400, {message: 'file path is missing'});
  fs.readFile(path, 'utf8', function(err, content){
    if (err){
      return res.send(400, err);
    }
    var view_path = path;
    if (path.indexOf(courseId)!== -1){
      view_path = path.split(courseId)[1].slice(1);
    }
    return res.send({content: content, path: view_path});
  });
};

function processReq(_p, res) {
  var resp = [];
  fs.readdir(_p, function(err, list) {
    for (var i = list.length - 1; i >= 0; i--) {
      resp.push(processNode(_p, list[i]));
    }
    res.json(resp);
  });
}

function processNode(_p, f) {
  var s = fs.statSync(path.join(_p, f));
  return {
    "id": path.join(_p, f),
    "text": f,
    "icon" : s.isDirectory() ? 'fa fa-folder-o' : 'fa fa-file-o', //set a custom icon, depending
    "state": {
      "opened": false,
      "disabled": false,
      "selected": false
    },
    "li_attr": {
      "base": path.join(_p, f),
      "isLeaf": !s.isDirectory()
    },
    "children": s.isDirectory()
  };
}