---
layout: default
title: Home
---

# Welcome to Matt Blogs IT

Welcome to my blog about IT, technology, and life. I'm Matt Griffin, a Systems Architect passionate about technology, volunteering, and adaptive sports.

## Latest Posts

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts limit: 5 %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      <div class="post-date">{{ post.date | date: "%B %d, %Y" }}</div>
    </li>
  {% endfor %}
</ul>
{% else %}
<ul class="post-list">
  <li>
    <a href="{{ site.baseurl }}/posts/sample-post/">Sample Post - Getting Started</a>
    <div class="post-date">August 5, 2025</div>
  </li>
</ul>
{% endif %}

*This site uses Jekyll to automatically convert markdown files to HTML for GitHub Pages.*