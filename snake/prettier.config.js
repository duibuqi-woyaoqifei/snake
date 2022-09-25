// eslint-disable-next-line no-undef
module.exports = {
  printWidth: 100, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: false, // 句尾添加分号
  vueIndentScriptAndStyle: true, // 缩进Vue文件中的脚本和样式标签
  singleQuote: true, // 不适用单引号，适用双引号
  quoteProps: "as-needed", // 仅在需要时在对象属性周围添加引号
  bracketSpacing: true, // 格式化结果为 : { foo: bar }
  trailingComma: "none", // 无尾逗号
  arrowParens: "avoid", // 为单行箭头函数的参数添加圆括号
  htmlWhitespaceSensitivity: "strict", // 空格被认为是敏感的
  endOfLine: "auto", // 设置统一的行结尾样式 保持现有的行尾
};
