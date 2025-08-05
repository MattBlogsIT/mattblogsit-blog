---
layout: default
title: Home
---

## Latest Posts

{% if site.posts.size > 0 %}
<div class="post-list">
  {% for post in site.posts limit: 5 %}
    <article class="post-preview">
      <h3><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>
      <div class="post-date">{{ post.date | date: "%B %d, %Y" }}</div>
      {% if post.excerpt %}
        <div class="post-excerpt">
          {{ post.excerpt | strip_html | truncatewords: 30 }}
        </div>
      {% endif %}
      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read more →</a>
    </article>
  {% endfor %}
</div>
{% else %}
<div class="post-list">
  <article class="post-preview">
    <h3><a href="{{ site.baseurl }}/posts/sample-post/">Sample Post - Getting Started</a></h3>
    <div class="post-date">August 5, 2025</div>
    <div class="post-excerpt">
      This is a sample post for the GitHub Pages site structure.
    </div>
    <a href="{{ site.baseurl }}/posts/sample-post/" class="read-more">Read more →</a>
  </article>
</div>
{% endif %}

<nav class="homepage-navigation">
  <a href="{{ site.baseurl }}/posts/" class="back-link">View All Posts →</a>
</nav>