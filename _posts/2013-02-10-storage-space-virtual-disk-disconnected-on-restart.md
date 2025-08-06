---
categories:
- "Administrator"
- "Microsoft"
date: 2013-02-10
excerpt: So I recently had to rebuild my Server 2012 virtual server. I had storage
  spaces setup and after I finished the install the Virtual Disk was not mounted.
  I realized that I was able to bring it all...
tags:
- hyper-v
- "Microsoft"
- server-2012
- vhd
- virtualdisk
- virtualization
title: Storage Space Virtual Disk Disconnected on Restart
---

So I recently had to rebuild my Server 2012 virtual server. I had storage spaces setup and after I finished the install the Virtual Disk was not mounted. I realized that I was able to bring it all back online, but every restart it had to remount the VHD.

I had decided there must be a way to fix it and decided to see what the properties were within PowerShell. I ran a Get-VirtualDisk which showed me my single VHD (pictured below)

<iframe src="https://skydrive.live.com/embed?cid=9CE6817C08D7DE07&amp;resid=9CE6817C08D7DE07%211178&amp;authkey=AItSjiYemNTwDLI" height="234" width="319" frameborder="0" scrolling="no"></iframe>

I was thrilled when I saw the IsManualAttach property, with a simple execution of Set-VirtualDisk Data -IsManualAttach 0, I executed a Get-VirtualDisk and verified it took the settings change. After a restart the VirtualDisk was already mounted and resolved my problem with only two PowerShell commands.
