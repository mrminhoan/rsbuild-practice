import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path'; // Import module path

export default defineConfig({
  source: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'), // Sử dụng đường dẫn tuyệt đối
    },
    entry: {
      index: path.resolve(__dirname, './src/index.tsx'),
    },
    decorators: {
      version: 'legacy', // Sử dụng phiên bản legacy của decorators
    },
    //  tsconfigPath: path.resolve("./tsconfig.json"),

    transformImport: [
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
      {
        libraryName: 'lodash',
        customName: 'lodash/{{ member }}',
      },
    ],
  },
  server: {
    port: 5001,
    host: 'localhost',
    publicDir: {
      name: path.resolve(__dirname, 'public'),
      copyOnBuild: true,
      watch: true,
    },
    compress: true, // Cấu hình nén assets khi tải trang
    headers: { 'X-Custom-Foo': 'bar' }, // Cấu hình thêm các tùy chỉnh headers cho response  cho các tệp tĩnh (assets: html, css, js, images,...)
    open: ['/', '/about'], // Cấu hình set đường dẫn dùng để mở mặc định khi ứng dụng được chạy
    printUrls({ urls, port, protocol }) { // Dùng để cấu hình khi chạy ứng dụng sẽ in ra log
      console.log(urls); // ['http://localhost:3000', 'http://192.168.0.1:3000']
      console.log(port); // 3000
      console.log(protocol); // 'http' or 'https'
    },
    strictPort: true // khi strictPort được bật thì khi có port đang được sử dụng, Rsbuild sẽ tự động tăng port lên đến khi có port khả dụng
  },
  plugins: [pluginReact()],

  output: {
    cleanDistPath: true,
  },
});
