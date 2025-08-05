---
categories:
- oob
date: '2012-11-06'
excerpt: '[![]({{ site.baseurl }}/assets/img/captain_hindsight.jpg "captain_hindsight")]({{
  site.baseurl }}/assets/img/11/captain_hindsight.jpg) On Thursday afternoon I started
  receiving alerts that both of my...'
tags:
- centos
- vps
- wordpress
title: Captain Hindsight! Always have Remote Backups!
---

[![]({{ site.baseurl }}/assets/img/captain_hindsight.jpg "captain_hindsight")]({{ site.baseurl }}/assets/img/captain_hindsight.jpg)

On Thursday afternoon I started receiving alerts that both of my personal websites had gone offline, which were on separate VPS Servers through the same provider. I thought this was quite unusual because it isn't usually simultaneous. Once I got home I looked into it and the servers were completely unreachable, I looked at my providers twitter and they had mentioned an attack on their servers that had been compromised. That is never a good sign!

Over the weekend full details came in that they had been brute forced and the hackers gained access to the physical nodes and basically they nuked the drives. They spent 3 days trying to recover the ~1000 VPS that had been destroyed and had no luck restoring mine, I had looked into it and I had no backups of my blog on my home computer and my other website the most recent backup I had locally was from July of this year. I did follow standard backup procedures and I had a script that made weekly backups... but they were stored on the local server. At this point I knew I had no choice but to start from scratch and mentioned my delima on Twitter.

I was lucky enough that [@fast\_edo](https://twitter.com/fast_edo) had saw my tweet and mentioned using inurl:mattblogsit.com as a Google Search string, and BOOM! I found a lot of my articles cached. I began doing similar searches on Bing and between the two I was able to find all of my articles - the images in the cache. Now I may not have been intelligent to maintain my articles but I was able to locate all of my graphics and get my blog about 95% restored. I personally decided not to re-post some of the articles but they were things relating to #TheKrewe Shirt Design Contest, and a post that just wasn't up to par for me.

Over the next couple of days expect to see blog posts relating to setting up backups on your CentOS Servers and WordPress Blogs because I am dedicating myself to that cause to make sure this doesn't happen again!