---
layout: page
title: All Posts
---

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      <div class="post-date">{{ post.date | date: "%B %d, %Y" }}</div>
      {% if post.excerpt %}
        <p>{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>
{% else %}
<ul class="post-list">
  <li>
    <a href="{{ site.baseurl }}/posts/sample-post/">Sample Post - Getting Started</a>
    <div class="post-date">August 5, 2025</div>
    <p>This is a sample post for the Jekyll-powered GitHub Pages site structure.</p>
  </li>
</ul>
{% endif %}

*All previous blog content has been backed up and can be migrated as needed.*