---
title: "How to check Exchange Online Distribution List activity over 30, 60, 90+ days?"
date: 2020-07-06
categories: 
  - "administrator"
  - "microsoft"
tags: 
  - "distribution-list"
  - "exchange-online"
  - "microsoft-365"
  - "office-365"
  - "powershell"
  - "reports"
---

All growing and/or large organizations will experience this. We have all of these Distribution Lists, but does anyone even use them or know why they were created 5, 10, 15 years ago? I recently ran into this at work, where we are trying to figure out if we can safely delete specific Distribution Lists. They have members, but most of the members have no idea they are a member, or why they would even need the email address.

As always, I start my investigation into how to do something with a quick Google Search. I stumbled upon a bunch of articles specific to Exchange on-premises, and a few items on how to see usage in the last 10 days, but nothing more. The next issue with the ones I did find for Exchange Online was only going to handle 1000 email messages, more than that, and you have to add additional parameters to the command and page through the command multiple times for more than 5000.

I knew many of these lists most likely have infrequent usage, if any at all, so 10 days wasn't going to cut it. My resolution to this problem? Scheduled tasks, and time!

Before you can run this script, you need to make sure you install the [Exchange Online Management PowerShell Module](https://www.powershellgallery.com/packages/ExchangeOnlineManagement/2.0.3-Preview). The module is on the PowerShell Gallery.

The script itself is pretty straightforward. It would be best if you had a secure way to store your passwords that the script will use for authenticating to Office 365. My example script will only work in interactive mode, and you need to dig a bit into storing credentials securely. I would recommend checking out David Lee's post "[Using saved credentials securely in PowerShell scripts](https://purple.telstra.com.au/blog/using-saved-credentials-securely-in-powershell-scripts)" for more information.

```powershell
Connect-ExchangeOnline -UserPrincipalName user@example.com

$date = Get-Date

$fullResults = @()
$i = 1
do{
    $trace = Get-MessageTrace -Status expanded -startdate ($date).AddDays(-10) -EndDate ($date) -PageSize 5000 -Page $i| Group-Object recipientaddress | Select-Object name,count
    $fullResults += $trace
    $i++
} until($null -eq $trace)

$fileName = (Get-Date -Format "yyyy.MM.dd") + "_DLUsage.csv"
$fullResults | Export-Csv "C:\Reports\$fileName" -NoTypeInformation
```

All you need to do is update the script to use a securely stored credential and set a scheduled task to run at the same time every 10 days. After however long you want to look at historical data, you import to an Excel spreadsheet and compare!
