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
      <h3 class="collapsible-header" id="{{ category | slugify }}">
        <a href="#{{ category | slugify }}" class="category-anchor">{{ category }}</a>
        <span class="post-count">({{ category_posts.size }} post{% if category_posts.size > 1 %}s{% endif %})</span>
        <span class="toggle-icon">▼</span>
      </h3>
      <div class="collapsible-content">
        <div class="post-list">
          {% for post in category_posts %}
            <article class="post-preview">
              {% if post.featured_image %}
              <div class="post-thumbnail">
                <a href="{{ site.baseurl }}{{ post.url }}">
                  <img src="{{ site.baseurl }}{{ post.featured_image }}"
                       alt="{{ post.featured_image_alt | default: post.title }}"
                       class="thumbnail-image">
                </a>
              </div>
              {% endif %}
              <div class="post-preview-content">
                <h4><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h4>
                <div class="post-date">{{ post.date | date: "%B %d, %Y" }}</div>
                {% if post.excerpt %}
                  <div class="post-excerpt">
                    {{ post.excerpt | strip_html | truncatewords: 20 }}
                  </div>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
      </div>
    </div>
  {% endif %}
{% endfor %}
</div>


<script src="{{ site.baseurl }}/assets/js/collapsible.js"></script>