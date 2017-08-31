var generators = require('yeoman-generator')
var initialPropmts = require('./initial_prompt')
var u = require('./utils')


module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
  },

  initializing: function () {
    this.log('此脚手架仅适用于移动端静态页面的开发')
  },

  prompting: function () {
    var done = this.async()
    this.prompt(initialPropmts, function (answers) {
      this.answers = answers
      done()
    }.bind(this))
  },

  configuring: function () {
    // this.log('configuring...')
  },

  default: function () {

  },

  writing: function () {
    this.log('开始生成基本文件目录')

    //创建基本目录结构
    var dirs = [
      'dist',
      'dist/css',
      'dist/images',
      'dist/js',
      'dist/vendors',
      'src',
      'src/css'
    ]
    u.mkdirs.call(this, dirs)

    //纯复制
    var pureCopies = {
      srcs: [
        './!(localserver.js)',
        'dist/**/!(index.html)',
        'src/**/!(settings.styl)'
      ],
      dests: [
        './',
        './dist',
        './src'
      ]
    }
    u.copyFiles.call(this, pureCopies.srcs, pureCopies.dests)

    if (!this.answers.$) {
      this.fs.delete('dist/vendors/jquery-2.1.4.min.js')
    }
    if (!this.answers.fastClick) {
      this.fs.delete('dist/vendors/fastclick.js')
    }

    //复制模板
    u.copyTpl.call(this, './localserver.js', './localserver.js', ['proxy'])
    u.copyTpl.call(this, 'dist/index.html', 'dist/index.html', ['$', 'fastClick'])
    u.copyTpl.call(this, 'src/css/utils/settings.styl', 'src/css/utils/settings.styl', ['psWidth', 'bgColor'])

    this.log('目录结构生成完毕')
  },

  install: function () {
    this.log('配置 npm 的 package.json...')
    this.spawnCommandSync('npm', ['init'], {
      yes: true
    })
    this.log('npm 配置完毕')
    this.log('开始安装开发依赖...')
    this.spawnCommandSync('npm', ['install'])
    this.log('开发依赖安装完毕')
    this.log('启动中...')
    this.spawnCommandSync('npm', ['start'])
  },

  end: function () {
    this.log('再见！下次要启动时，请直接运行 npm start')
  }

})