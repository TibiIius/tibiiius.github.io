export const data = JSON.parse("{\"key\":\"v-ba934fd8\",\"path\":\"/config/\",\"title\":\"Config\",\"lang\":\"en-US\",\"frontmatter\":{\"sidebar\":\"auto\"},\"headers\":[{\"level\":2,\"title\":\"foo\",\"slug\":\"foo\",\"link\":\"#foo\",\"children\":[]},{\"level\":2,\"title\":\"bar\",\"slug\":\"bar\",\"link\":\"#bar\",\"children\":[]}],\"filePathRelative\":\"config/README.md\",\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
