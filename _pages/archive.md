---
layout: default
permalink: /archive/
title: Archives
---

# All Archives

{% assign posts_by_year = site.posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}

<div class="archive-list">
{% for year_group in posts_by_year %}
  <div class="archive-item">
    <h3><a href="{{ site.baseurl }}/archive/{{ year_group.name }}/">{{ year_group.name }}</a></h3>
    <p>{{ year_group.items.size }} post{% if year_group.items.size > 1 %}s{% endif %}</p>
  </div>
{% endfor %}
</div>

<style>
.archive-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.archive-item {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f8f9fa;
    text-align: center;
}

.archive-item h3 {
    margin: 0 0 10px 0;
    font-size: 1.5em;
}

.archive-item h3 a {
    color: #3498db;
    text-decoration: none;
}

.archive-item h3 a:hover {
    text-decoration: underline;
}

.archive-item p {
    margin: 0;
    color: #666;
}
</style>