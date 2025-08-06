---
categories:
- "Administrator"
- "Microsoft"
date: 2014-09-25
excerpt: Recently I worked with a client to validate that if a user account were to
  be disabled that it wasn't going to break any of their currently running applications.
  You can be bitten by an accidental...
tags:
- "Microsoft"
- powershell
- powershell-v4
- scripting
- server-2012
- server-2012-r2
- windows
title: 'PowerShell: Check for user accounts running Windows Services'
---

Recently I worked with a client to validate that if a user account were to be disabled that it wasn't going to break any of their currently running applications. You can be bitten by an accidental miss-configuration where an end-users account is running a Windows Service or possibly at a lower level in a specific application such as SQL Server jobs. Luckily with the Power of PowerShell, we can conquer the Windows Services! It is also possible to create a SQL Query or even PowerShell scripts to query SQL, but we are not covering that in this article.

## Checking Windows Services:

The biggest concern I had was the Windows Services. It is easy enough for a junior admin to install SQL and specify their account as the Service Account, **THIS IS BAD!** However, with some pure PowerShell, we can perform a visual inspection, or with some minor adjustments, we could look for a service running with a specific user.

```
Get-CimInstance -ComputerName (Get-ADComputer -Filter 'OperatingSystem -like "Windows Server*"' | Select -ExpandProperty Name) -Query "SELECT Name, StartName FROM Win32_Service WHERE StartName <> 'LocalSystem'" | ? { $_.StartName -notlike 'NT AUTHORITY*' -and $_.StartName -notlike 'NT SERVICE*' } | Select Name, StartName, PSComputerName
```

In the above example, we are using a parenthetical command along with the Get-CimInstance Cmdlet. The command that executes first is the Get-ADComputer. This command requires the ActiveDirectory module is available on your computer system. It uses the filter parameter to look for any computer that is running Windows Server (any version).

Then it passes those values to the Get-CimInstance, which performs an initial WQL Query, which doesn't allow and statements. Therefore, we have to pipe it's returned values to a where statement which continues filtering for us. The end of the command provides the service name, the user account running it, and the computer this service is on.

I was able to run this against the client's environment, and within a few minutes, we knew it was safe to disable the account.
