---
categories:
- "Administrator"
- "Microsoft"
date: 2013-07-26
excerpt: Last week I had a client reach out to me, asking for a count of all documents
  in their SharePoint 2010 internal farm. They were planning on implementing Metalogix
  StoragePoint and were working on...
tags:
- powershell
- scripting
- sharepoint-2010
title: PowerShell One Liner for Count of all Documents in SharePoint 2010 Farm
---

Last week I had a client reach out to me, asking for a count of all documents in their SharePoint 2010 internal farm. They were planning on implementing Metalogix StoragePoint and were working on estimates for the deployment.  
After a bit of work with PowerShell, I was able to throw a single line of PowerShell that sum's the entire environment for me.

```
Get-SPSite -Limit All | Get-SPWeb -Limit All | % { $_.Lists} | ? { $_ -is [Microsoft.SharePoint.SPDocumentLibrary] } | % { $total+= $_.ItemCount} ; $total
```
