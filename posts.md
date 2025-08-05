---
layout: page
title: All Posts
---

<!-- Client-side pagination controls -->
<div class="pagination-header">
  <div class="pagination-info" id="pagination-info">
    <!-- Will be updated by JavaScript -->
  </div>
  <div class="posts-per-page-selector">
    <label for="posts-per-page">Posts per page:</label>
    <select id="posts-per-page" class="per-page-select">
      <option value="5">5</option>
      <option value="10" selected>10</option>
      <option value="25">25</option>
    </select>
  </div>
</div>

<div class="post-list" id="posts-container">
  {% for post in site.posts %}
    <article class="post-preview" data-date="{{ post.date | date: '%s' }}">
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

<!-- Pagination navigation (will be populated by JavaScript) -->
<nav class="pagination-nav" id="pagination-nav">
  <!-- Pagination controls will be inserted here -->
</nav>