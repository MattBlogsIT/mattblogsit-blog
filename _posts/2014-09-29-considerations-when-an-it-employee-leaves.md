---
categories:
- oob
date: 2014-09-29
excerpt: Recently I've helped clients and even off-boarded IT employees from our own
  team. There are quite a few considerations you must make when someone in IT leaves
  a company or even just moves to another...
tags:
- powershell-v4
- scripting
- work-in-it
title: Considerations When an IT Employee Leaves
---

Recently I've helped clients and even off-boarded IT employees from our own team. There are quite a few considerations you must make when someone in IT leaves a company or even just moves to another team within the same company. This article is going to focus heavily on the employee leaving the company; but you will run into some of the same obstacles with them moving to a new area in the company. The "normal" HR off-boarding or cross-boarding doesn't usually cover the amount of access that these employees have, and the IT staff themselves must make many additional considerations to make things as smooth as possible.

At a high level you have to consider the following:

- **How many accounts do they have?**
- **Are these accounts tied to any applications?**
- **Which devices use a shared password they know?**
- **What access rosters are they on?**
- **What knowledge will be lost when they leave?**
- **Who is going to take over ownership of their current tasks?**

Let's dive into these questions in more depth and explore some possible solutions to them.

<!--more-->

# How many accounts do they have?

This can seem like a very straight forward question, the answer should be one. However this can vary greatly, especially for IT Employees. This is because as a best practice every IT employee should have 'at least' two accounts. These include their normal day-to-day account and their administrative account. You never want to log into a Server using the same credentials you log into a local workstation with.

This number will continue to rise as you factor in accounts for working with different third-party vendors and cloud solutions. For example if you are using Office 365 without Directory Sync - that's another account. What if you use Barracuda for cloud backups - make it another! These numbers will just continue to rise.

While working at a Managed Services Provider (MSP) this number can be skewed much more in the northern direction. Off the top of my head I can think of at least 20 accounts that I have personally, and know the number is much greater than that if I put serious effort into this estimate.

## Solution:

To alleviate this problem when off-boarding an employee is to document every account required for a person to be on this team. Creating a very thorough on-boarding document specific to the team will make the off-boarding of this much more simple.

# Are these accounts tied to any applications?

I hope that this is always an "absolutely no" answer. The 'good' System Administrators out there know you should always use Service Accounts when installing new products or applications. I have ran into issues before where an AD Account password was changed, or the account was disabled and it did bring a system offline, or possibly broke a scheduled task that was running. These can be large pain points, and for the most part the only way to avoid them is by double-checking your work as the IT Administrator.

## Solution:

Sadly there is no perfect solution to this, education of your IT staff is the best way to dodge this bullet. However that is not always going to catch past-mistakes. I've PowerShell one-liner that can scan all of the servers in your organization and [Check for user accounts running Windows Services](http://mattblogsit.com/windows/powershell-check-for-user-accounts-running-windows-services "PowerShell: Check for user accounts running Windows Services"). This will give you a glimpse into where you may find issues. You also need to factor in other application specific tasks such as the Task Scheduler, or SQL Server jobs.

# Which devices use a shared password they know?

Shared passwords are a terrible practice - but let's be honest, they exist! Sometimes there is no way to avoid them. For example, if you work with a third party to manage DNS and they only have a single user account that you can use to manage DNS. Maybe you have 20 different managed switches or routers in your organization. Is it really worth the effort to create dedicated credentials on all of these devices for every IT staff member?

In the case of being an MSP this problem grows exponentially. You have to centrally manage credentials for not only your organization, but for hundreds or possibly thousands of organizations. Plus you have to make sure only the people who should access these credentials has access to them. Being a small IT shop, or an MSP you need to know what they have access to, even better way to do this is to know what they have recently accessed!

## Solution:

To solve this issue I strongly encourage people use [Thycotic's Secret Server](http://thycotic.com/products/secret-server/). I've worked with this product and it has been an amazing benefit when off-boarding an employee. You can simply run a report to see what the exiting employee has accessed and you will now know the specific passwords to target and reset.

# What access rosters are they on?

This is common oversight when off-boarding an employee. You grant them access to contact the support center at the Data Center and forget about it. This cannot be the case, you must have them removed or if they wanted to be nefarious they can simply call the data center and have everything shutdown! Luckily I've never run into this but it is something you need to be concerned about and keep on your mind when removing access from an exiting employee.

## Solution:

To alleviate this issue, again falls back on documentation of the on-boarding process specific to your team. This can be very challenging to maintain; but it is going to save your life at some point.

# What knowledge will be lost when they leave?

The obvious one is that you have one less technical resource, this resource possibly had vast knowledge of different technologies that are in place in your organization such as Exchange, or Active Directory. This knowledge can be replaced, it may take time and money to find that replacement; but it is possible.

The real lost knowledge is things that may have not been documented, and I hate to admit it - but in a fast paced IT documentation tends to go to the wayside. In the perfect IT world everything is thoroughly documented such as all of the servers you have, what is installed on those servers, their network configuration, their location. On top of that how the software was installed, any modifications that have been made to the application, and any kind of "gotchas" such as never power the server off or the NIC configuration is completely lost!

Hopefully the IT person who is exiting was very good at documentation, in most cases that is not true - as very few IT people are very good at documentation. This is going to be where you have to hope it is them deciding to leave, and not them being terminated. If they are being terminated you can always pray to the god of your choice that they will be a kind human being and dump as much of their knowledge as possible into a document of some kind, or walk someone else in the IT department through what they know.

## Solution:

To solve this problem is going to fall on management. It may surprise you to know \*wink\* \*wink\* but management is the biggest obstacle when working on documentation in an IT work-place. There are always demands to keep up with the latest technology, and implement the next biggest thing to improve the company's revenue. This can be very challenging on an IT department as at a management level they are looked at as an expense that brings in no revenue at all, so the more work thrown at them the less of an expense they are.

Management needs to recognize this as the problem, and they need to allow the IT resources to factor in the thorough documentation process into their project time-lines. The first thing that is dropped when a time-line is shrunk is the documentation phase, then it will continue to be pushed off.

# Who is going to take over ownership of their current tasks?

This is the biggest trick to losing an IT resource. That person most likely had 5 or more projects in the works, or lined up to work on. Let's say they put in a two week notice, at least you have some time to perform a semi-warm hand-off of what is going on, and what still needs to be done. What if they are being terminated? This makes things much more challenging and you can be guaranteed at least one thing will slip through the cracks.

## Solution:

To solve this problem you must have a centralized system for tracking issues and tracking projects. I've worked with multiple ticketing systems and there are flaws with every single one. If you can tell me a ticketing system that doesn't have a single flaw, that can track user submitted issues, and track projects and their current status then I will call you a liar... then try it out. The best decision that can happen with this is to pick a solution and stick to it.