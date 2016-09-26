module.exports = [
  {
    type: "input",
    name: "title",
    message: "What is the title of the index.html file?",
    default: "首页"
  },
  {
    type: "confirm",
    name: "$",
    message: "Do you need JQuery?",
    default: true
  },
  {
    type: "confirm",
    name: "noBounce",
    message: "Do you want to prevent page bounce on IOS?",
    default: false
  },
  {
    type: "confirm",
    name: "accurateVW",
    message: "Do you want to use a specific fixed viewport width?",
    default: true
  },
  {
    type: "input",
    name: "vw",
    message: "Set the viewport width if the last answer is true",
    default: "640"
  },
  {
    type: "input",
    name: "SASS_BINARY_PATH",
    message: "SASS_BINARY_PATH separated by \"\\\":",
    default: "C:\\Users\\zhanz\\win32-ia32-46_binding.node"
  }
]