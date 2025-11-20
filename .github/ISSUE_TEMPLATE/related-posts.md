---
name: Add Related Posts Feature
about: Display related articles at the end of blog posts
title: 'UX: Add related posts feature to increase engagement'
labels: enhancement, UX
assignees: ''
---

## Overview
Display 3-5 related posts at the bottom of each blog post to improve content discovery and increase page views.

## Current State
- No related posts functionality
- Users must manually navigate to find similar content
- No cross-linking between related articles

## Proposed Solution

### Create Related Posts Include
Location: `_includes/related-posts.html`

```liquid
{% assign maxRelated = 5 %}
{% assign minCommonTags = 2 %}
{% assign relatedPosts = "" | split: "" %}

{% for post in site.posts %}
  {% if post.url != page.url %}
    {% assign commonCategories = 0 %}
    {% for category in post.categories %}
      {% if page.categories contains category %}
        {% assign commonCategories = commonCategories | plus: 1 %}
      {% endif %}
    {% endfor %}

    {% if commonCategories >= 1 %}
      {% assign relatedPosts = relatedPosts | push: post %}
    {% endif %}
  {% endif %}
{% endfor %}

<!-- Display top 5 related posts -->
```

### Add to Post Layout
Update `_layouts/post.html` to include related posts section at the end.

### Styling
- Card-based layout with post excerpt
- Thumbnail image if available
- Reading time indicator
- Responsive grid (3 columns desktop, 1 column mobile)

## Features
- Match by shared categories
- Display post title, excerpt, date
- Show thumbnail image if available
- Limit to 5 most relevant posts
- Fallback to recent posts if no matches

## Benefits
- Increased page views (30-50% typical)
- Better content discovery
- Longer session duration
- Improved internal linking for SEO

## Implementation Tasks

- [ ] Create `_includes/related-posts.html` template
- [ ] Add CSS styling for related posts grid
- [ ] Update `_layouts/post.html` to include component
- [ ] Test with various post types
- [ ] Add analytics tracking for related post clicks

## Design Mockup
```
Related Articles
┌─────────────┬─────────────┬─────────────┐
│ [Thumbnail] │ [Thumbnail] │ [Thumbnail] │
│ Post Title  │ Post Title  │ Post Title  │
│ Brief desc  │ Brief desc  │ Brief desc  │
│ 5 min read  │ 3 min read  │ 7 min read  │
└─────────────┴─────────────┴─────────────┘
```

## Testing Checklist
- [ ] Related posts appear on all blog posts
- [ ] Matches are relevant (shared categories)
- [ ] Responsive layout works on mobile
- [ ] No performance impact on build times
- [ ] Analytics tracking works
