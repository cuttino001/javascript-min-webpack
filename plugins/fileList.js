class FileListPlugin {
  constructor(options) {}
  apply(compiler) {
    compiler.hooks.emit.tap("FileListPlugin", (compilation) => {
      var filelist = "In this building \n\n";
      for (var filename in compilation.assets) {
        filelist += "- " + filename + "\n";
      }
      compilation.assets["filelist.md"] = {
        source: function () {
          return filelist;
        },
        size: function () {
          return filelist.length;
        },
      };
    });
  }
}
module.exports = FileListPlugin;
