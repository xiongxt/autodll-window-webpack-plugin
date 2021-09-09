// const ConcatSource = require("webpack-sources").ConcatSource;

/**
 * @typedef { import("webpack").Compiler } Compiler
 * @typedef { import("webpack").Chunk } Chunk
 * @typedef { import("webpack").Compilation } compilation
 */
class AutodllWindowWebpackPlugin {
  /**
   * @param {Compiler} compiler
   */
  apply(compiler) {
    /**
     * @param {Chunk} chunk
     * @param {Compilation} compilation
     */
    function dealChunk(chunk, compilation) {
      var name = chunk.name;
      var filename = chunk.files[0];
      var asset = compilation.assets[filename];
      var renderedHash = chunk.renderedHash;
      var moduleName = `${name}_${renderedHash}`;
      var entrys = compilation.options.entry[name];
      var code = [];
      compilation.modules.forEach((module, i) => {
        var rawRequest = module.rawRequest;
        if (entrys.includes(rawRequest)) {
          code.push(`window['${rawRequest}']=${moduleName}(${i})`);
        }
      });
      // compilation.assets[filename] = new ConcatSource(
      //   "",
      //   asset,
      //   `;${code.join(";")}`
      // );
      compilation.assets[filename]._value = asset._value + ";" + code.join(";");
    }

    compiler.hooks.emit.tapAsync(
      "autodll-window-webpack-plugin",
      function (compilation, callback) {
        compilation.chunks.forEach((chunk) => {
          dealChunk(chunk, compilation);
        });
        callback();
      }
    );
  }
}

module.exports = AutodllWindowWebpackPlugin;
