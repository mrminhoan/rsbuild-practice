# Rsbuild Project

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Config rsbuild.config.ts

```ts
export default {
  plugins: [
    // configure Rsbuild plugins
  ],
  dev: {
    // options for local development
  },
  html: {
    // options for HTML generation
  },
  tools: {
    // options for the low-level tools
  },
  output: {
    // options for build outputs
  },
  source: {
    // options for source code parsing and compilation
  },
  server: {
    // options for the Rsbuild Server,
    // will take effect during local development and preview
  },
  security: {
    // options for Web security
  },
  performance: {
    // options for build performance and runtime performance
  },
  moduleFederation: {
    // options for module federation
  },
  environments: {
    // define different Rsbuild configurations for each environment
  },
};
```

## source

#### alias:

- Cấu hình alias cho dự án

#### entry:

- Xác Định Điểm Khởi Đầu: source.entry chỉ định tệp mà Rsbuild sẽ bắt đầu quá trình bundling.
- Quản Lý Phụ Thuộc: Từ điểm vào này, Rsbuild sẽ tìm và bao gói tất cả các module và thư viện mà ứng dụng của bạn phụ thuộc.
- Tạo Bundle: Dựa trên điểm vào, Rsbuild sẽ tạo ra các bundle cuối cùng (thường là các tệp JavaScript duy nhất hoặc được chia nhỏ) để triển khai ứng dụng.
- Có thể có nhiều hơn 1 entry points. ví dụ:

```tsx
 entry: {
      main: path.resolve(__dirname, './src/index.tsx'),
      admin: path.resolve(__dirname, './src/admin.tsx'),
    },
```

#### define

- Thay thế các biến trong code bằng các giá trị hoặc biểu thức khác tại thời điểm biên dịch.

```tsx
   define: {
      RELEASE_TIME: new Date()
    },
```

```tsx
// example.tsx
console.log(RELEASE_TIME); // Thu Oct 10 2024 15:31:08 GMT+0700 (Indochina Time)
```

#### decoration

- Định nghĩa phiên bản của cú pháp decorator mà bạn muốn sử dụng. Trong JavaScript, đã có hai phiên bản chính của decorators:
  - 'legacy' | '2022-03'
  - default: '2022-03'
  - Legacy (Phiên bản cũ): Sử dụng cú pháp và hành vi cũ, thường tương thích với các phiên bản Babel hoặc TypeScript cũ hơn.
  - Stage 2/3 (Phiên bản mới): Theo tiêu chuẩn mới của TC39, cung cấp cú pháp và hành vi hiện đại hơn cho decorators.

#### include

- source.include được sử dụng để chỉ định các tệp JavaScript bổ sung cần được biên dịch.

- Để tránh việc biên dịch dư thừa, theo mặc định, Rsbuild chỉ biên dịch các tệp JavaScript trong thư mục hiện tại và các tệp TypeScript và JSX trong tất cả các thư mục. Nó không biên dịch các tệp JavaScript theo node_modules.

- Thông qua cấu hình source.include, có thể chỉ định các thư mục hoặc mô-đun cần được Rsbuild biên dịch. Việc sử dụng source.include nhất quán với [Rule.include](https://rspack.dev/config/module#ruleinclude) trong Rspack, hỗ trợ truyền chuỗi hoặc biểu thức chính quy để khớp với đường dẫn mô-đun.

#### exclude

- Chỉ định các tệp JavaScript/TypeScript không cần phải biên dịch. Cách sử dụng nhất quán với [Rule.exclude](https://rspack.dev/config/module#ruleexclude) trong Rspack, hỗ trợ truyền chuỗi hoặc biểu thức chính quy (regular expressions) để khớp với đường dẫn mô-đun.

#### transformImport

- Được sử dụng để tùy chỉnh cách các thư viện được import trong mã nguồn. Điều này thường được sử dụng để tối ưu hóa bundle bằng cách chỉ import những phần cần thiết từ các thư viện lớn, giúp giảm kích thước bundle và cải thiện hiệu suất tải trang.

```tsx
transformImport: [
  {
    libraryName: 'antd',
    libraryDirectory: 'es',
  },
  {
    libraryName: 'lodash',
    customName: 'lodash/{{ member }}',
  },
];
```

- `libraryName: "antd"` :Chỉ định rằng các import từ thư viện antd sẽ được xử lý theo cấu hình này.
- `libraryDirectory`: "es": Xác định rằng các module sẽ được import từ thư mục es của thư viện antd. Thư mục es thường chứa các module ES (ECMAScript) cho phép tree-shaking hiệu quả hơn so với các module CommonJS (lib).
- `customName: 'lodash/{{ member }}'`:
  Thay vì viết

```tsx
import { Button } from 'antd';
```

Với cấu hình trên sẽ chuyển thành

```tsx
import Button from 'antd/es/button';
```
Điều này giúp chỉ import module button mà bạn cần, tránh việc bao gồm toàn bộ thư viện antd vào bundle.

#### tsconfigPath
- Dùng để set giá trị đường dẫn đến file tsconfig. Có thể là đường dẫn tương đối hoặc tuyệt đối.
- Thông thường không cần cấu hình tsconfigPath, nếu không config thì sẽ tự tìm đến file tsconfig.ts ở root.
- Với một số trường hợp như dự án monorepo hoặc multi-config có nhiều file tsconfig thì sẽ cần cấu hình.
