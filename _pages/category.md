---
layout: default
permalink: /category/
title: Categories
---

# All Categories

{% assign categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq | sort %}

<div class="category-list">
{% for category in categories %}
  {% if category != "" %}
    {% assign category_posts = site.posts | where: 'categories', category %}
    <div class="category-item">
      <h3><a href="{{ site.baseurl }}/category/{{ category | slugify }}/">{{ category | capitalize }}</a></h3>
      <p>{{ category_posts.size }} post{% if category_posts.size > 1 %}s{% endif %}</p>
    </div>
  {% endif %}
{% endfor %}
</div>

<style>
.category-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.category-item {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f8f9fa;
    text-align: center;
}

.category-item h3 {
    margin: 0 0 10px 0;
    font-size: 1.5em;
}

.category-item h3 a {
    color: #3498db;
    text-decoration: none;
}

.category-item h3 a:hover {
    text-decoration: underline;
}

.category-item p {
    margin: 0;
    color: #666;
}
</style>