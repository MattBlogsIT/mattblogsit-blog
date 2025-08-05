---
layout: default
permalink: /category/
title: Categories
---

# All Categories

{% assign categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq | sort %}

<div class="category-container">
{% for category in categories %}
  {% if category != "" %}
    {% assign category_posts = site.posts | where: 'categories', category %}
    <div class="category-section">
      <h3 class="collapsible-header">
        {{ category | capitalize }}
        <span class="post-count">({{ category_posts.size }} post{% if category_posts.size > 1 %}s{% endif %})</span>
        <span class="toggle-icon">▼</span>
      </h3>
      <div class="collapsible-content">
        <div class="post-list">
          {% for post in category_posts %}
            <article class="post-preview">
              <h4><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h4>
              <div class="post-date">{{ post.date | date: "%B %d, %Y" }}</div>
              {% if post.excerpt %}
                <div class="post-excerpt">
                  {{ post.excerpt | strip_html | truncatewords: 20 }}
                </div>
              {% endif %}
            </article>
          {% endfor %}
        </div>
      </div>
    </div>
  {% endif %}
{% endfor %}
</div>


<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/category.css">
<script src="{{ site.baseurl }}/assets/js/collapsible.js"></script>