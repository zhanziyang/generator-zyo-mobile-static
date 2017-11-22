module.exports = [
  {
    type: 'input',
    name: 'psWidth',
    message: '设计稿的宽度是多少？',
    default: '750'
  },
  {
    type: 'list',
    name: 'flexPlan',
    message: '请选择一种适配方案：',
    choices: [
      {
        name: '固定 viewport width，浏览器自动缩放（简单粗暴，在 APP 中需要 webview 做支持）',
        value: 'autoFlex'
      },
      {
        name: 'rem 布局',
        value: 'rem'
      },
      {
        name: 'vw 布局（较老的设备不兼容）',
        value: 'vw'
      }
    ],
    default: 'rem'
  },
  {
    type: 'confirm',
    name: 'scaleViewport',
    message: '是否在 iOS 设备上缩放 viewport 以支持真正的 1px 线条？',
    default: false,
    when: function(answers) {
      return answers.flexPlan === 'rem'
    }
  },
  {
    type: 'confirm',
    name: 'limitWidthOnPC',
    message: '是否在 PC 端限宽显示？',
    default: true,
    when: function(answers) {
      return answers.flexPlan !== 'vw'
    }
  },
  {
    type: 'input',
    name: 'widthOnPC',
    message: 'PC 上显示多宽呢？',
    default: '640',
    when: function(answers) {
      return answers.flexPlan !== 'vw'
    }
  },
  {
    type: 'input',
    name: 'pcMinWidth',
    message: '窗口大于多少算 PC？',
    default: '768',
    when: function(answers) {
      return answers.flexPlan !== 'vw'
    }
  },
  {
    type: 'confirm',
    name: 'minify',
    message: '是否需要压缩 css 生成 min 文件夹',
    default: true
  },
  {
    type: 'confirm',
    name: 'sourcemap',
    message: '是否需要生成sourcemap？',
    default: true
  },
  {
    type: 'confirm',
    name: '$',
    message: '你需要jQuery吗？',
    default: true
  },
  {
    type: 'confirm',
    name: 'fastClick',
    message: '要用fastclick.js来消除iOS上的点击延迟吗？',
    default: true
  },
  {
    type: 'input',
    name: 'bgColor',
    message: '默认页面背景色为',
    default: '#f5f5f5'
  },
  {
    type: 'input',
    name: 'proxy',
    message: '反向代理服务器的目标地址（可在./localserver.js中修改；输入0表示不使用反向代理）',
    default: 'http://192.168.1.172:8096/'
  },
  {
    type: 'input',
    name: 'port',
    message: 'browser-sync 端口号',
    default: '3000'
  }
]