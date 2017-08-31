var express = require('express')
var proxy = require('http-proxy-middleware')
var app = express()

// 反向代理
<% if (proxy == '0') {%>//<% } %> app.use('/api', proxy({ target: '<%=proxy %>', changeOrigin: true }))

module.exports = app
