var mkdirp = require('mkdirp')
var _ = require('underscore')

module.exports = {
  copyTpl: function (tpl, dest, vars) {
    var map = {}
    vars.forEach(function (v) {
      map[v] = this.answers[v]
    }.bind(this))

    this.fs.copyTpl(this.templatePath(tpl), this.destinationPath(dest), map)
  },

  copyFiles: function (srcs, dests) {
    if (!(_.isArray(srcs) && _.isArray(dests)) && !(_.isString(srcs) && _.isString(dests))) {
      this.env.error('Argument type is wrong')
      return
    }
    if (_.isString(srcs) && _.isString(dests)) {
      srcs = [srcs]
      dests = [dests]
    }
    if (srcs.length != dests.length) {
      this.env.error('Invalid copy plan. You have ' + srcs.length + ' source file path' + (srcs.length > 1 ? 's' : '') + ' and ' + dests.length + ' destination file path' + (srcs.length > 1 ? 's' : '') + ' in your plan. Make sure they are equal!')
      return
    }
    for (var i = 0; i < srcs.length; i++) {
      this.fs.copy(this.templatePath(srcs[i]), this.destinationPath(dests[i]), {
        globOptions: {
          dot: true
        }
      })
    }
  },

  mkdirs: function (dirs) {
    for (var i = 0; i < dirs.length; i++) {
      mkdirp.sync(this.destinationPath(dirs[i]))
    }
  }
}