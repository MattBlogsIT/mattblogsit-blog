---
title: "Learning PowerCLI Book Review"
date: 2014-02-27
categories: 
  - "review"
tags: 
  - "book-review"
  - "powercli"
  - "powershell"
  - "scripting"
  - "virtualization"
  - "vmware"
---

I was recently asked to write a review for [Learning PowerCLI](http://www.amazon.com/gp/product/1782170162/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1782170162&linkCode=as2&tag=mattblogsit-20). My day to day job doesn't deal with PowerCLI as much as I'd truly like it to; however I've been playing with VMware and PowerCLI quite a bit after hours, so I decided this would be an interesting undertaking. This is my first Book Review, and as time progresses I'll try to write more of these. I tend to read 5-10 technical books throughout a year, and I use even more as references for day to day work.

[![learning-powercli-book-cover](/mattblogsit-dev/assets/images/learning-powercli-book-cover.jpg)<!--more-->](http://www.amazon.com/gp/product/1782170162/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1782170162&linkCode=as2&tag=mattblogsit-20)

[Learning PowerCLI](http://www.amazon.com/gp/product/1782170162/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=1782170162&linkCode=as2&tag=mattblogsit-20) by [Robert van den Nieuwendijk](http://rvdnieuwendijk.com/), VSP 5, VTSP 5, VCP4-DCV, VCP5-DCV, MCSE, MCSA, MCP and MCP+I published by Packt Publishing this book is designed for VMware Administrators with little to no knowledge of PowerShell. My overall opinion on this book is positive, it is a fantastic reference if you know what you are looking for, if you are not looking for anything specific it is a lot of skimming to find interesting tid-bits that are included in the material that may help you with your day to day work.

When I first began reading this book my first observations was "wow... there are a lot of graphics that provide little to no additional context" specifically around the installer GUI. This got better as the book went on; however some of the graphics felt like they were there just to break away from test. I did like the level of detail the author went into on the installation process and some of the "gotchas" around your Execution Policy. As I continued reading I was a bit frustrated by example cmdlets shown, but not showing the output after executing the cmdlet. The book seems to flip back and forth in the first couple of chapters on if they show the output after a cmdlet or not. This isn't a breaking point but I found it potentially confusing for a new PowerShell user who would benefit from seeing the output of everything in the examples.

Early on in the book the Author mentions using PowerCLI cmdlets vs. using the VMware vSphere API. The book takes these details a little bit further and begins to dive into using the Get-View cmdlet to access vSphere object view. The author begins explaining that utilizing the view is significantly quicker than using the cmdlet, but doesn't go into the level I feel would help drive the point home on why it is faster. As I continued reading I was surprised at the technical details this book provided surrounding depreciated cmdlets and parameters, specifically with how to perform an action; directly followed by the proper way to execute the action.

Overall, if you are a VMware Administrator looking to improve your performance at work by automating tasks within vSphere, I would recommend purchasing this book. However, I would also recommend you purchase additional books to learn PowerShell in much greater detail. So that you can get a full understanding of the technology you are leveraging for these tasks. This book is available on Amazon, or if you are interested in a DRM free digital copy you can purchase it directly from [Packt Publishing](http://www.packtpub.com/learning-powercli/book).

_Disclaimers: This post is my own personal opinions and have no reflection on my employer. This review is by no means a claim that this is the best or worst book to learn PowerCLI, this is simply my opinions on this book with no favoritism to this or any other PowerCLI books._
