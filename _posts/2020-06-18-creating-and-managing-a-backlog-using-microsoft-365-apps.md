---
categories:
- microsoft
- user
date: 2020-06-18
excerpt: In the last few months, I've spent a lot of time organizing and planning.
  Most of this time was spent on my personal life organization around the house, but
  contrary to my most recent blog posts,...
tags:
- automation
- backlog
- microsoft-forms
- microsoft-planner
- microsoft-teams
- organization
- power-automate
- worklog
title: Creating and Managing a Backlog using Microsoft 365 Apps
---

In the last few months, I've spent a lot of time organizing and planning. Most of this time was spent on my personal life organization around the house, but contrary to my most recent blog posts, "[Getting things done while working from home using Microsoft To Do!](https://mattblogsit.com/microsoft/getting-things-done-while-working-from-home-using-microsoft-to-do)" and "[Organizing life, while trapped at home during COVID-19.](https://mattblogsit.com/oob/organizing-life-while-trapped-at-home-during-covid-19)" I have also put a significant focus on organizing tasks at work. 

I want to walk you through how I've created a workflow for incoming requests for training videos using Microsoft Forms, automated notifications using Power Automate, into Microsoft Teams, and automated the tracking inside of Microsoft Planner. All of this accomplished with our existing licensing with an Office 365 E3 license.

<!--more-->

# Microsoft Forms

Let's start with how we will use Microsoft Forms. My use case was a simple data capture tool that I could share with people inside my organization; we could expand this and make it available to anyone, but that wasn't necessary for my target audience.

1. Navigate to [https://forms.microsoft.com](https://forms.microsoft.com)
2. Login using an Organization Account
3. Click **New Form**
4. Name it, in my example. I will name it **Training Requests**
5. Give it an optional description. When I did this at work, I provided our training philosophy for our training videos. That way, it would help our audience understand what we would accept and develop.
6. Click **Add new** and select **Text**
7. Title question **Proposed Topic**
8. Select option for **Required**
9. Click **Add new** and select **Text**
10. Select option for **Long answer**
11. Click **Share**
12. Click **Copy**

The link you copied will be the link you send to people you want to have send requests to you.

Now that you have created the Microsoft Form, you need to add it to the Microsoft (Office) 365 Group for the Microsoft Team you want to notify. We will not cover creating the group as I am assuming you already have one setup.

1. Navigate to [https://forms.microsoft.com](https://forms.microsoft.com)
2. On the Form you just created click the **... in the top right of the Form**
3. Click **Move**
4. Select the **Microsoft (Office) 365 Group for your Microsoft Team**
5. Click **Move**

# Microsoft Teams/Planner

I've combined the Microsoft Teams and Microsoft Planner section, because we will be creating the Microsoft Planner Plan through the Microsoft Teams interface.

1. Open and login to Microsoft Teams
2. Click **Teams**
3. Select the Team you want to have the requests routed to
4. (Optional) Create a channel for Incoming Requests
5. Click the **+** (Add app) icon at the top of the channel
6. Select **Planner**
7. Give the Plan a name and click **Save**
8. Rename and create buckets as you see fit. I use the following buckets
    1. Requested
    2. Script Development
    3. Recording
    4. Post-Production

# Power Automate

Now we will bring it all together using Microsoft Power Automate. We will automatically Trigger the Flow when new items get submitted to the Form. We will post a message to a Teams Channel and add a Task to the Plan we created in Microsoft Teams.

1. Navigate to [https://flow.microsoft.com](https://flow.microsoft.com)
2. Login using an Organization Account
3. Click **\+ Create**
4. Click **Automated flow**
5. Give the flow a descriptive name
6. for **Choose your flow's trigger** search for **Microsoft Forms**
7. Click **When a new response is submitted**
8. Click **Create**
9. Since you moved the Form to a Microsoft 365 Group, it will not show up in the dropdown. You will need to get the **Form Id** manually.
10. Login to [https://forms.office.com](https://forms.office.com)
11. Click **Group forms**
12. Find the form you created earlier and click it.
13. Look at the URL to find the FormId
    1. Ex: [https://forms.office.com/Pages/DesignPage.aspx#FormId=mm7pT\_FwhUGH6U47YYYYYY8otnoioudNozhEJ4HloBJUNEdEWElXWFVGS0hZNjU1Tjc4VFBXXXXXQlQCN0PWcu](https://forms.office.com/Pages/DesignPage.aspx#FormId=mm7pT_FwhUGH6U47xwWi4B8otnoioudNozhEJ4HloBJUNEdEWElXWFVGS0hZNjU1Tjc4VFBEMVI0RSQlQCN0PWcu)
14. Copy the long string after **FormId=**
15. Paste the string into your Flow
16. Click **\+ New step**
17. Search **Forms**
18. Click **Get response details**
19. Paste the **FormId** in
20. For **Response Id,** select the Dynamic content for **Response Id**
21. Click **\+ New step**
22. Search **Planner**
23. Click **Create a task**
24. Select the **Plan Id** that you created earlier in Microsoft Teams
25. For **Title,** select the Dynamic content for **Proposed Topic**
26. For **Bucket Id,** Select **Requested**, or whatever you named your first bucket that you want requests to go to.
27. For **Start Date Time,** select the Dynamic content for **Submission time**
28. Click **\+ New step**
29. Search **Terminate**
30. Click **Terminate**
31. Set **Status** to **Succeeded**
32. Above the Terminate step click the **+** icon between steps
33. Click **Add a parallel branch**
34. On the other leg of the branch search **Post a message**
35. Click **Post a message (V3) (preview)** - note: depending on when you read this, it may no longer be in preview
36. For **Team,** select the team you used earlier to create the Microsoft Planner Plan
37. For **Channel,** select the Incoming Requests channel you created earlier, or the channel you wish to send notifications to for new requests.
38. For **Message**, add Dynamic content from the **Get response details** section for **Responders' Email**, then add text along the lines of "has submitted a training request for " and add Dynamic content from the **Get response details** section for **Proposed Topic**.

Woohoo! That was a lot, but now when someone submits a topic proposal, it will kick off a flow that will do the following.

1. Add task to planner about Proposed Topic
2. Notify team in Microsoft Teams

Plus, you will be able to manage the requests throughout its entire lifecycle!