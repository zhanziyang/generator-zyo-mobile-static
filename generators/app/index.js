var generators = require("yeoman-generator");
var initialPropmts = require("./initial_prompt");
var mkdirp = require("mkdirp");
var _ = require("underscore");

var copyTpl = function(tpl, dest, vars) {
  var map = {};
  vars.forEach(function(v) {
    map[v] = this.answers[v];
  }.bind(this));

  this.fs.copyTpl(this.templatePath(tpl), this.destinationPath(dest), map);
};

var copyFiles = function(srcs, dests) {
  if ( !(_.isArray(srcs) && _.isArray(dests)) && !(_.isString(srcs) && _.isString(dests)) ) {
    this.env.error("Argument type is wrong");
    return;
  }
  if( _.isString(srcs) && _.isString(dests) ) {
    srcs = [srcs];
    dests = [dests];
  }
  if (srcs.length != dests.length) {
    this.env.error("Invalid copy plan. You have " + srcs.length + " source file path" + (srcs.length > 1 ? "s" : "") + " and " + dests.length + " destination file path" + (srcs.length > 1 ? "s" : "") + " in your plan. Make sure they are equal!");
    return;
  }
  for (var i = 0; i < srcs.length; i++) {
    this.fs.copy(this.templatePath(srcs[i]), this.destinationPath(dests[i]));
  }
};

var mkdirs = function(dirs) {
  for (var i = 0; i < dirs.length; i++) {
    mkdirp.sync(this.destinationPath(dirs[i]));
  }
};

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);  
  },

  initializing: function() {
    this.log("OK ladies now let's get in Formation...");
    this.log("initializing...in " + this.destinationRoot());
    this.log("template in " + this.sourceRoot());
  },

  prompting: function() {
    var done = this.async();
    this.prompt(initialPropmts, function(answers) {
      this.answers = answers;
      done();
    }.bind(this));
  },

  configuring: function() {
    this.log("configuring...");
  },

  default: function() {

  },

  writing: function() {
    //创建基本目录结构
    var dirs = [
      "dist",
      "src",
      "dist/css",
      "dist/images",
      "dist/js",
      "src/images",
      "src/sass"
    ];
    mkdirs.call(this,dirs);
    
    //纯复制
    var pureCopies = {
      srcs: [
        "dist/css/reset.css",
        "dist/js/app.js",
        "src/sass/!(utils.scss)",
        ".eslintrc.json",
        "gulpfile.js",
        "jsconfig.json",
        "package.json"
      ],
      dests: [
        "dist/css/reset.css",
        "dist/js/app.js",
        "src/sass",
        ".eslintrc.json",
        "gulpfile.js",
        "jsconfig.json",
        "package.json"
      ]
    };
    if (this.answers.$) {
      pureCopies.srcs.push("dist/js/jquery-2.1.4.min.js");
      pureCopies.dests.push("dist/js/jquery-2.1.4.min.js");
    }
    if (this.answers.noBounce) {
      pureCopies.srcs.push("dist/js/inobounce.js");
      pureCopies.dests.push("dist/js/inobounce.js");
    }
    copyFiles.call(this,pureCopies.srcs,pureCopies.dests);

    //复制模板
    copyTpl.call(this,"dist/index.html","dist/index.html",["title", "$", "accurateVW", "vw", "noBounce"]);
    copyTpl.call(this,"src/sass/utils.scss","src/sass/utils.scss",["vw", "accurateVW"]);
  },

  install: function () {
    var SBP = this.answers.SASS_BINARY_PATH;
    process.env.SASS_BINARY_PATH = SBP;
    this.spawnCommandSync("npm",["init"]);
    this.spawnCommandSync("npm",["install"]);
    this.log("Let's get the party started!");
    this.spawnCommandSync("gulp");
  },

  end: function () {
    this.log("THE END");
  }

});