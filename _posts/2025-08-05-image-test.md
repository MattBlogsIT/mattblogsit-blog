---
title: Image Test Post
date: 2025-08-05
layout: post
---

Testing different image formats:

## 1. Plain HTML (like about-me page):
<img src="{{ site.baseurl }}/assets/img/WP_20140526_002-1024x576.jpg" alt="Test image" />

## 2. Markdown format:
![Test image]({{ site.baseurl }}/assets/img/WP_20140526_002-1024x576.jpg)

## 3. Figure format:
<figure class="aligncenter">
    <img src="{{ site.baseurl }}/assets/img/WP_20140526_002-1024x576.jpg" alt="Test image">
    <figcaption>Test caption</figcaption>
</figure>

## 4. Direct path test:
<img src="/mattblogsit-dev/assets/img/WP_20140526_002-1024x576.jpg" alt="Direct path" />

## 5. Relative path test:
<img src="../assets/img/WP_20140526_002-1024x576.jpg" alt="Relative path" />

End of test.