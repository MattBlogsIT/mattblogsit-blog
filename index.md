---
layout: default
title: Home
---

# Welcome to Matt Blogs IT

Welcome to my blog about IT, technology, and life. I'm Matt Griffin, a Systems Architect passionate about technology, volunteering, and adaptive sports.

## Recent Posts

<div class="post-list">
  {% for post in site.posts limit:5 %}
    <article class="post-preview">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <time>{{ post.date | date: "%B %d, %Y" }}</time>
      <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    </article>
  {% endfor %}
</div>

[View all posts →](/archive/)