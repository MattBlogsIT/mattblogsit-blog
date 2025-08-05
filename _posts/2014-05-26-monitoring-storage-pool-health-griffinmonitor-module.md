---
categories:
- administrator
- microsoft
date: 2014-05-26
excerpt: There have been times in the past (more than I like to remember) where I've
  had a hard drive fail, a raid 5 fail, and eventually I am sure I'll have a Storage
  Pool fail at some point with my lab...
tags:
- griffinmonitor-module
- how-to
- microsoft
- monitoring
- powershell
- powershell-v4
- scripting
- server-2012-r2
- storage-pools
title: Monitoring Storage Pool Health - GriffinMonitor Module
---

There have been times in the past (more than I like to remember) where I've had a hard drive fail, a raid 5 fail, and eventually I am sure I'll have a Storage Pool fail at some point with my lab environment. The best way to avoid this is by introducing active and heavy monitoring. In my work world I am very good and forward thinking when it comes to this; however no matter how many times it happens in my home environment I still fail at maintaining the system.

When Server 2012 was released with the introduction of Storage Pools I had just lost my RAID 5, I decided it was the right time to implement Storage Pools as my primary storage at home. It uses parity which is basically a software raid, and I was able to use cheap consumer drives along with USB drives (YAY! more space since I was out of it inside of the server.)

I've been running Storage Pools for over a year, knowing one major issue with my setup. I have absolutely no monitoring in place, and if I were to have a drive fail it could be weeks... maybe months before I realize an issue exists. I recently went through updating my home lab from Server 2012 to 2012 R2 and decided I needed to stop fooling around with my data and get some monitoring in place.

Well the first issue came along... how am I going to monitor my Storage Pool? Sadly there is no easy alerting of an unhealthy Storage Pool built in... I'm sure there are third party tools, but do I really want to go through the hassle of setting that up for just my Storage Pool? The good news is that PowerShell has some fantastic cmdlet's available for working with storage.

When I started building my monitoring solution I initially thought... a simple script on a scheduled task will get the job done. As I built it out, I decided that I needed to go further than I have in the past, I needed to build a cmdlet, then once I finished that I thought why stop there? Why not built my first module? This module currently only contains a single PowerShell cmdlet, but as time goes on I hope to build out many more that I can continue to use in my environment at home. Below is the entire source of the psm1 file that is stored in my Modules directory along with installation instructions and directions on how to use the cmdlet.

# Using Alert-GMUnhealthyStoragePool:

This is a fairly straightforward cmdlet, only 3 mandatory parameters and it works. There are quite a few restrictions surrounding the SMTP Server including it cannot use TLS or SSL (Currently) and it doesn't accept Authentication. These will be added in the future but for the first iteration of it I was going for quick and dirty for a lab environment.

## Example:

```
Alert-GMUnhealthyStoragePool -SMTPServer smtp.example.com -ToAddress Joe@example.com -FromAddress alert@example.com
```

#  The Module Code:

```
#Requires -Version 3 
#Requires -Module Storage
<#
 # Module Name: GriffinMonitor.psm1
 # Version: 1.0
 # Created: 05/22/2014
 # Author: Matt Griffin (MattBlogsIT.com)
 # Purpose: This Module is a set of custom cmdlet's that are used to alert of potential health concerns in your Windows Environment
 # Legal: This module was built by Matt Griffin for use in his home lab environment. This module comes with no warranty or guarantee. 
 #        This module is provided to be used at your own risk and will not have any support backing it up.
 # History: Matt Griffin 05/22/2014
 #          Initial creation of Module with first cmdlet Alert-GMUnhealthyStoragePool
 #>
function Alert-GMUnhealthyStoragePool
{
    <#
    .Synopsis
       This function will check all of your local systems storage pools and send you can alert when one of them enters a state other than healthy.
    .DESCRIPTION
       This function will check all of your local systems storage pools and send you can alert when one of them enters a state other than healthy. The alert will be sent through email.
    .PARAMETER SMTPServer
       This parameter will be used to specify a standard SMTP Server that doesn't require SSL or TLS.
    .PARAMETER ToAddress
       This parameter will be used to specify the email address to which the alert messages will be sent.
    .PARAMETER FromAddress
       This parameter will be used to specify the email address from which the alert messages will be sent.
    .EXAMPLE
       Alert-GMUnhealthyStoragePool -SMTPServer smtp.example.com -ToAddress Joe@example.com -FromAddress alert@example.com
    #>
    [CmdletBinding()]
    [OutputType([int])]
    Param(
        # SMTPServer This parameter specifies the SMTP Server to utilize when alerting of unhealthy Storage Pool
        [Parameter(Mandatory=$true,Position=0)]
        $SMTPServer,
        
        # ToAddress This is the email address that the alert message will be sent to
        [Parameter(Mandatory=$true,Position=1)]
        $ToAddress,

        # FromAddress This is the email address that the alert message will be sent to
        [Parameter(Mandatory=$true,Position=2)]
        $FromAddress
    )
    #Import Required PowerShell Module
    Import-Module -Name Storage

    $storagePools = Get-StoragePool

    foreach($pool in $storagePools){
        if($pool.HealthStatus -ne "Healthy" -and $pool.IsPrimordial -ne "True"){

            $physicalDisks = $pool | Get-PhysicalDisk | 
            Select FriendlyName, Manufacturer, Model, SerialNumber, OperationalStatus, HealthStatus, Usage, Size | ConvertTo-Html

            #Create hash table to splat for Send-MailMessage
            $mailMessageParams = @{'SmtpServer'=$SMTPServer;
                                   'From'=$FromAddress;
                                   'To'=$ToAddress;
                                   'Subject'="The Storage Pool $($pool.FriendlyName) is currently $($pool.HealthStatus) on $env:computername";
                                   'Body'=($physicalDisks | Out-String);
                                   'BodyAsHtml'=$true}

            Send-MailMessage @mailMessageParams
        }
    }
}
```

# Installation Instructions:

1. Navigate to C:\\Users\\_<username>_\\Documents\\WindowsPowerShell\\Modules\\GriffinMonitor
    1. (Note: If the directory doesn't exists you must create it.)
2. Save the above code in a file named GriffinMonitor.psm1 under the above directory
3. Create a Scheduled Job using PowerShell
    1. ```
        #The below PowerShell commands will schedule the cmdlet to run every 30 minutes using the SMTPServer xxx.xxx.xxx.xxx, emailing to joe@example.com and coming from noreply@example.com - Make sure you update the parameter values.
        $trig = New-JobTrigger -Once -At "5/22/2014 0am" -RepetitionInterval (New-TimeSpan -Minute 30) -RepetitionDuration ([TimeSpan]::MaxValue)
        Register-ScheduledJob -Name CheckStoragePoolHealth -ScriptBlock { Alert-GMUnhealthyStoragePool -SMTPServer xxx.xxx.xxx.xxx -ToAddress joe@example.com -FromAddress noreply@example.com} -Trigger $trig
        ```
        

Once it is scheduled, keep an active eye on your inbox for when your Storage Pool goes unhealthy!

# Miscellaneous Notes:

- This module was built and tested using PowerShell v4 on Server 2012 R2 running a single Storage Pool.
- This module "should" work with Server 2012 running PowerShell v3 with one or many Storage Pools
- This module comes with no guarantee or support, this is a run at your own risk and I take no responsibility for any repercussions that may occur by running this.
    - With that being said I'll try my best to assist anyone who may have questions if you post in the comments of this thread.