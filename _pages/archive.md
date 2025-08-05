---
layout: default
permalink: /archive/
title: Archives
stylesheets:
  - archive
---

# All Archives

{% assign years = "" | split: "" %}
{% for post in site.posts %}
  {% assign post_year = post.date | date: "%Y" %}
  {% unless years contains post_year %}
    {% assign years = years | push: post_year %}
  {% endunless %}
{% endfor %}
{% assign years = years | sort | reverse %}

<div class="archive-container">
{% for year in years %}
  {% assign year_posts = "" | split: "" %}
  {% for post in site.posts %}
    {% assign post_year = post.date | date: "%Y" %}
    {% if post_year == year %}
      {% assign year_posts = year_posts | push: post %}
    {% endif %}
  {% endfor %}
  
  <div class="archive-section">
    <h3 class="collapsible-header">
      {{ year }} 
      <span class="post-count">({{ year_posts.size }} post{% if year_posts.size > 1 %}s{% endif %})</span>
      <span class="toggle-icon">▼</span>
    </h3>
    <div class="collapsible-content">
      <div class="post-list">
        {% for post in year_posts %}
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
{% endfor %}
</div>

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/archive.css">
<script src="{{ site.baseurl }}/assets/js/collapsible.js"></script>