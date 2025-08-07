---
categories:
- "Administrator"
- "Microsoft"
date: 2012-12-29
excerpt: As a follow up to [Backups are Important! Here is How I do it!](http://mattblogsit.com/oob/backups-are-important-here-is-how-i-do-it
  "Backups are Important! Here is How I do it!") I decided I should...
tags:
- backups
- powershell
- scripting
title: Backup Linux using PowerShell
---

As a follow up to [Backups are Important! Here is How I do it!](http://mattblogsit.com/oob/backups-are-important-here-is-how-i-do-it "Backups are Important! Here is How I do it!") I decided I should let everyone know how I am handling remote backups on my blog. It's not hard to see that I am obviously a Windows guy, I am also glad to admit that I personally prefer Linux Servers for my blog, it's a smaller impact, and much much cheaper; although I have considered Azure more than once.

![Weapon-overkill]({{ site.baseurl }}/assets/img/Weapon-overkill.jpg)

So as I have listed on my last blog post I was bit in the rear on backups and decided to go for overkill. I already have a ton of storage at home so I figured there had to be a way for me to utilize that storage and have a remote backup that isn't in my Dropbox and isn't a manual process. So I began researching ways to interface with SFTP, I found out that **[WinSCP has .NET Assemblys available](http://winscp.net/eng/docs/library#downloading_and_installing_the_assembly)**, and I'll admit I am far from a programmer and didn't want to try to hook into that using PowerShell. So I let it sit for a couple of weeks and by god an example of exactly what I wanted to do was posted, and all I had to do was minor tweaks.

<!--more-->

I found [Session.SynchronizeDirectories method and Session.FileTransferred event](http://winscp.net/eng/docs/library_session_synchronizedirectories#example) example on the WinSCP site and thought by god this will do an rsync using PowerShell! So I downloaded it reviewed the code, added my login information and changed line 72 from

```powershell
SynchronizationMode.Remote
```

to

```powershell
SynchronizationMode.Local
```

along with the directories I was synchronizing. Once that was completed all I had to do was setup a scheduled task to execute after my local backups were completed. Now some of you may think that this is extremely unsafe because it has my logins as plain text that is true, however the account I am using only has read access to these servers and I personally would be a lot more concerned about my local machine having been breached than someone having potentially found a read only login to my servers.

I decided to make modifications to the script for end users not to have to scroll looking for variables to edit, so please feel free to use my very lightly tweaked version.

> **⚠️ Security Warning**: The following code contains hardcoded credentials for demonstration purposes only. In production environments, use secure credential storage methods like **Get-Credential**, **Windows Credential Manager**, or **Azure Key Vault**. Never store passwords in plain text in production scripts.
{:.security-warning}

```powershell
[Reflection.Assembly]::LoadFrom("WinSCP.dll") | Out-Null

# Authentication Information
$sessionOptions = New-Object WinSCP.SessionOptions
$sessionOptions.Protocol = [WinSCP.Protocol]::Sftp
$sessionOptions.HostName = "srv01.contoso.com"
$sessionOptions.UserName = "user"
$sessionOptions.Password = "P@ssw0rd"
$sessionOptions.SshHostKeyFingerprint = "ssh-rsa 2048 0a:a0:0a:a0:00:aa:00:00:aa:aa:a0:a0:aa:0a:a0:00"

# Folders to Sync
$local = "D:\Backups\srv01"
$remote = "/opt/backups"

# Session.FileTransferred event handler

function FileTransferred
{
    if ($_.Error -eq $null)
    {
        Write-Host ("Upload of {0} succeeded" -f $_.FileName)
    }
    else
    {
        Write-Host ("Upload of {0} failed: {1}" -f $_.FileName, $_.Error)
    }

    if ($_.Chmod -ne $null)
    {
        if ($_.Chmod.Error -eq $null)
        {
            Write-Host ("Permisions of {0} set to {1}" -f $_.Chmod.FileName, $_.Chmod.FilePermissions)
        }
        else
        {
            Write-Host ("Setting permissions of {0} failed: {1}" -f $_.Chmod.FileName, $_.Chmod.Error)
        }

    }
    else
    {
        Write-Host ("Permissions of {0} kept with their defaults" -f $_.Destination)
    }

    if ($_.Touch -ne $null)
    {
        if ($_.Touch.Error -eq $null)
        {
            Write-Host ("Timestamp of {0} set to {1}" -f $_.Touch.FileName, $_.Touch.LastWriteTime)
        }
        else
        {
            Write-Host ("Setting timestamp of {0} failed: {1}" -f $_.Touch.FileName, $_.Touch.Error)
        }

    }
    else
    {
        # This should never happen with Session.SynchronizeDirectories
        Write-Host ("Timestamp of {0} kept with its default (current time)" -f $_.Destination)
    }
}

# Main script

try
{
    $session = New-Object WinSCP.Session
    try
    {
        # Will continuously report progress of synchronization
        $session.add_FileTransferred( { FileTransferred } )

        # Connect
        $session.Open($sessionOptions)
        $synchronizationResult = $session.SynchronizeDirectories(
            [WinSCP.SynchronizationMode]::Local, $local, $remote, $false)

        # Throw on any error
        $synchronizationResult.Check()
    }
    finally
    {
        # Disconnect, clean up
        $session.Dispose()
    }

    exit 0
}
catch [Exception]
{
    Write-Host $_.Exception.Message
    exit 1
}
```

Currently between my two servers I have over 33 GB of backups on a 5.46 TB Raid 5, eventually I will need to add a scheduled task that removes old backups however that day is far away from now.

**NOTE:** There is a weird issue that my friend [John Gullion](https://twitter.com/bearstuff) helped me discover using this .NET Assembly that requires you use the x86 PowerShell, so when executing it be certain that you have it running under x86.
