import { createContentLoader } from 'vitepress'

export default createContentLoader('news/*.md', {
  transform(data) {
    return data
      // 排除列表页自身
      .filter(post => post.url !== '/news/')
      // 按日期从新到旧排序，缺失日期的排在最后
      .sort(
        (a, b) =>
          (+new Date(b.frontmatter.date) || 0) -
          (+new Date(a.frontmatter.date) || 0)
      )
  }
})
