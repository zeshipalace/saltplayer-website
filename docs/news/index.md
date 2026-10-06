---
layout: page
title: 新闻
---

<script setup>
import { data as posts } from './posts.data'

const formatDate = raw => {
  const d = new Date(raw)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`
}
</script>

<div class="news-page">
  <div class="news-list">
    <a
      v-for="post in posts"
      :key="post.url"
      :href="post.url"
      class="news-item"
    >
      <span class="news-date">{{ formatDate(post.frontmatter.date) }}</span>
      <span class="news-title">{{ post.frontmatter.title }}</span>
      <p class="news-desc">{{ post.frontmatter.description }}</p>
    </a>
  </div>
</div>

<style>
.news-page {
  max-width: 792px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}
.news-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.news-item {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px 24px;
  transition: border-color 0.25s, background-color 0.25s;
}
.news-item:hover {
  border-color: var(--vp-c-brand-1);
  text-decoration: none;
}
.news-date {
  display: block;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.news-title {
  display: block;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-top: 4px;
  font-size: 17px;
}
.news-desc {
  color: var(--vp-c-text-2);
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
}
</style>
