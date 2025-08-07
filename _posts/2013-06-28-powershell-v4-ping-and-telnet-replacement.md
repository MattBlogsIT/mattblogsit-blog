---
categories:
- "Administrator"
- "Microsoft"
date: 2013-06-28
excerpt: '**Note: Article Written on Server 2012 R2 Preview Build, the functionality
  may change when released.** ![]({{ site.baseurl...'
tags:
- "Microsoft"
- ping
- powershell
- powershell-v4
- server-2012-r2
- telnet
- windows-8-1
title: PowerShell v4 Ping and Telnet Replacement
---

**Note: Article Written on Server 2012 R2 Preview Build, the functionality may change when released.**

![]({{ site.baseurl }}/assets/img/Test-NetConnection.jpg)

I have been waiting for years for a good replacement for what Telnet and Ping provide me. I am thrilled to announce today I discovered a legitimate replacement has come down the line! Recently Microsoft released the Preview of Server 2012 R2 and Windows 8.1. Packaged with those is PowerShell Version 4. I have not had a chance to do a deep dive into it yet. However, I have found out that there is a cool new cmdlet called Test-NetConnection.

<!--more-->

The Test-NetConnection command does precisely what it sounds like. By default (No Parameters), the command performs a ping on internetbeacon.msedge.net, which at the time of writing, this is failing. This tool does a lot more than just ping, it also adds traceroute, and connection attempts to specified ports. Below is a snapshot of the Syntex for this cmdlet.

![]({{ site.baseurl }}/assets/img/Test-NetConnection_Syntax.jpg)

Let's say we have a server running that allows Remote Desktop Connection. We know it exists. However, for some reason, connections are not working. Once you verified RDP is enabled through the console, the next step might be verifying you can get through the firewall. The way I usually approach this is by using "telnet _server.name_ 3389" well, the problem with this is that the server may not have the telnet client installed, that was an optional install starting in Server 2008.

I was hoping for something in PowerShell v3, but sadly nothing showed up. However, tonight I found out thanks to a Microsoft employee presenting named Bob Roudebush that this now exists! So instead of installing telnet, I can use the PowerShell cmdlet "Test-NetConnection _server.name_ -Port 3389". Please note that you can also use "Test-NetConnection _server.name_ -CommonTCPPort RDP"

![]({{ site.baseurl }}/assets/img/Test-NetConnection_Port.jpg)

Let's not stop at something that simple now, because PowerShell is all about automating. So let's try to do something crazy. I know on my virtual lab at home, I have a few VM's running, so let's verify RDP is open on all of these servers. Luckily for me, most of them are joined to an Active Directory, so let's do some magic.

```powershell
(Get-ADComputer -LDAPFilter "(name=griffin*)").DNSHostName | Test-NetConnection -Port 3389
```

The above command pulls every computer from Active Directory (Using the Active Directory PowerShell Tools) and pipe it to Test-NetConnection, which specifies the RDP port.
