# desc

将 autodll-webpack-plugin 打包进去的包都绑定到 window 对象上

# usage

```
yarn add autodll-webpack-plugin -D
yarn add autodll-window-webpack-plugin -D
```

```
const AutoDllPlugin = require('autodll-webpack-plugin');
const AutoDllWindowWPlugin = require('autodll-window-webpack-plugin');

new AutoDllPlugin({
  inject: true,
  filename: '[name].js',
  path: './dll',
  debug: false,
  entry: {
    vendor: ['vue', 'vue-router', 'vuex'],
  },
  plugins: [new AutoDllWindowWPlugin()],
}),

```
