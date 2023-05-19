/// <reference types="vite/client" />
/// <reference types="vite-plugin-comlink/client" />

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}