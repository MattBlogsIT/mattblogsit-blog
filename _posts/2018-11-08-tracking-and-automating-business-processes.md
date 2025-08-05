---
title: "Tracking and Automating Business Processes"
date: 2018-11-08
categories: 
  - "administrator"
  - "microsoft"
tags: 
  - "api"
  - "powershell"
  - "powershell-module"
  - "tallyfy"
  - "work-in-it"
---

As businesses grow, it becomes challenging to keep up with business processes. To keep up with a constant flow of tasks associated with these processes, you need to track them, especially when multiple people are involved with the process. Business processes become difficult when you have to enter data into multiple systems. Entering the same data multiple times increases the risk of human error each time data gets entered.

In recent months I've been tasked with helping different business units improve and track their processes. Specifically, I started with our onboarding experience. The process tasks get assigned to people that are geographically dispersed, and sometimes the people involved with the onboarding only do a few a month. There is a lot that needs to go into it. You want to factor in things such as IT, Payroll, Equipment, Licensing, Training, which makes it keeping everyone in the loop difficult.

[![](../assets/images/tallyfy-300x146.jpg)](http://mattblogsit.com/wp-content/uploads/2018/11/tallyfy.jpg)

To combat these difficulties we settled on a product called **[TallyFy](https://tallyfy.com/)**. TallyFy gives us a dashboard that will show us how our processes are progressing. It helps keep everyone on the same page and helps communicate issues in a more rapid manner.

Our hurdle with TallyFy was that it was tacking yet another system into our onboarding experience. We already had three different systems involved in someone applying for a job to ultimately receiving their first paycheck. Having multiple systems caused data re-entry, which is prone to typos. To combat the data re-entry, we needed to integrate our different systems. As previously blogged about I wrote a **[PowerShell Module to interact with the BirdDog HR system](http://mattblogsit.com/microsoft/windows/powershell/using-powershell-with-restful-apis-birddoghr-api-module)**; we use this to send our new hires their employee packet to fill out before day one. This PowerShell Module I was able to query new in-coming employees - my next task was to integrate it with TallyFy so that it would track the progress of the onboarding.

Luckily for me, TallyFy has done a fantastic job writing an API that their web interface runs on, and I can do everything they can do. One of the challenges with this is that their API is very complicated. I've been lucky enough to work closely with their team to build out this PowerShell Module that only touches on a small fraction of what is available thought their API.

# PowerShell Module Git Repository:

I am storing this Module on my personal Git Repository; as it is built out more I might publish into the PowerShell Gallery. You can find the Module at [**TallyFy API PowerShell Module**](https://github.com/mattgrif/TallyFy-API-PowerShell-Module).

Store the psd1 and psm1 files in **Documents\\WindowsPowerShell\\Modules\\TallyFy**.

# Connecting to TallyFy API

1. Login to **https://go.tallyfy.com**
2. Click on **your name** in the Top Right corner of site
3. Click **Settings**
4. Click **Integrations**
5. Note your **Client ID** and **Client Secret**
6. Open PowerShell and run the below command
7. `Connect-TallyFyAPI -ClientID 'Your client ID' -ClientSecret 'Your Client Secret' -Credential (Get-Credential)` 
8. Use your TallyFy Username and Password when prompted

Feel free to explore the other commands by running the below command.

`Get-Help -Module TallyFy`
