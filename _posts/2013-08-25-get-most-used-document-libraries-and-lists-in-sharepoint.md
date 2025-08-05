---
categories:
- administrator
- microsoft
date: '2013-08-25'
excerpt: Lately I have been putting a lot of my time into developing useful PowerShell
  scripts for managing Windows environments. While working on these scripts I've developed
  some really cool 1-liner scripts...
tags:
- microsoft
- powershell
- scripting
- sharepoint-2010
- sharepoint-2013
title: Get Most Used Document Libraries and Lists in SharePoint
---

Lately I have been putting a lot of my time into developing useful PowerShell scripts for managing Windows environments. While working on these scripts I've developed some really cool 1-liner scripts that are extremely easy to run. In the below 1-liner PowerShell scripts you will get the top 10 most used Document Libraries and Lists by item count. The nice thing about SharePoint and PowerShell is the majority of the scripts written for SharePoint 2010 will work in SharePoint 2013; in this case it does!

# Top 10 Document Libraries:

```
Get-SPSite -Limit All | Get-SPWeb -Limit All | % { $_.Lists} | ? { $_ -is [Microsoft.SharePoint.SPDocumentLibrary] } | Sort-Object { $_.ItemCount } -Descending | Select-Object Title, Description, ItemCount, ParentWebUrl -First 10
```

#  Top 10 Lists:

```
Get-SPSite -Limit All | Get-SPWeb -Limit All | % { $_.Lists} | ? { $_ -isnot [Microsoft.SharePoint.SPDocumentLibrary] } | Sort-Object { $_.ItemCount } -Descending | Select-Object Title, Description, ItemCount, ParentWebUrl -First 10
```