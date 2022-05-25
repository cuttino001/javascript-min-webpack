const marked = require("marked");
const loaderUtils = require("loader-utils");

module.exports = function (content, map, meta) {
  const options = this.getOptions();
  this.cacheable();
  marked.setOptions(options);
  return `export default \`${marked.parse(content)}\``;
};
