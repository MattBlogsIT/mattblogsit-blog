---
layout: page
title: Archive
permalink: /archive/
---

## All Posts

{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
  <h3>{{ year.name }}</h3>
  <ul class="post-list">
    {% for post in year.items %}
      <li>
        <span class="post-date">{{ post.date | date: "%b %d" }}</span>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}