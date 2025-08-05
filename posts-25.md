---
layout: page
title: All Posts
pagination:
  enabled: true
  per_page: 25
permalink: /posts-25/
---

<!-- Pagination controls at top -->
<div class="pagination-header">
  <div class="pagination-info">
    Showing posts {{ paginator.page_start }} - {{ paginator.page_end }} of {{ paginator.total_posts }}
  </div>
  <div class="posts-per-page-selector">
    <label for="posts-per-page">Posts per page:</label>
    <select id="posts-per-page" class="per-page-select">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="25" selected>25</option>
    </select>
  </div>
</div>

{% if paginator.posts.size > 0 %}
<div class="post-list">
  {% for post in paginator.posts %}
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

<!-- Pagination navigation -->
<nav class="pagination-nav">
  {% if paginator.previous_page %}
    <a href="{{ site.baseurl }}{{ paginator.previous_page_path }}" class="pagination-btn prev-btn">← Previous</a>
  {% else %}
    <span class="pagination-btn prev-btn disabled">← Previous</span>
  {% endif %}
  
  <div class="page-numbers">
    {% if paginator.page_trail %}
      {% for trail in paginator.page_trail %}
        {% if trail.num == paginator.page %}
          <span class="page-number active">{{ trail.num }}</span>
        {% elsif trail.num == -1 %}
          <span class="page-ellipsis">...</span>
        {% else %}
          <a href="{{ site.baseurl }}{{ trail.path }}" class="page-number">{{ trail.num }}</a>
        {% endif %}
      {% endfor %}
    {% endif %}
  </div>
  
  {% if paginator.next_page %}
    <a href="{{ site.baseurl }}{{ paginator.next_page_path }}" class="pagination-btn next-btn">Next →</a>
  {% else %}
    <span class="pagination-btn next-btn disabled">Next →</span>
  {% endif %}
</nav>

{% else %}
<div class="post-list">
  <p>No posts found.</p>
</div>
{% endif %}