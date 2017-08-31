module.exports = [
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
    name: 'psWidth',
    message: '设计稿的宽度是多少？',
    default: '750'
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
  }
]