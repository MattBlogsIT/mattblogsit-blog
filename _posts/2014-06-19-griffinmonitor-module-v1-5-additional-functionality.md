---
categories:
- administrator
- microsoft
date: 2014-06-19
excerpt: This evening I've decided to add additional functionality to the GriffinMonitor
  Module. I noticed that I am filling up my storage on my lab server fairly quickly.
  With that in mind I knew I needed to...
tags:
- microsoft
- powershell
- scripting
- server-2012-r2
title: GriffinMonitor Module v1.5 - Additional Functionality
---

This evening I've decided to add additional functionality to the GriffinMonitor Module. I noticed that I am filling up my storage on my lab server fairly quickly. With that in mind I knew I needed to know once I am about to max it out. I've decided to write a fairly simple alert for remaining disk space per volume. Before we dive into how to use the cmdlet and the code itself please reference the previous blog post on [Monitoring Storage Pool Health - GriffinMonitor Module](http://mattblogsit.com/windows/monitoring-storage-pool-health-griffinmonitor-module).

# Using Alert-GMLowDiskSpace:

This cmdlet is very similar to the Alert-GMUnhealthyStoragePool as it has 3 mandatory parameters. There is a 4th parameter that is optional so you can specify the threshold at which it alerts. As I mentioned in the previous blog post at some point I intend to add additional functionality for TLS or SSL secured SMTP servers along with the ability to pass authentication. That functionality is still not there, but it is still on my to-do list.

## Example:

```
Alert-GMLowDiskSpace -SMTPServer smtp.example.com -ToAddress Joe@example.com -FromAddress alert@example.com
```

\-OR-

```
Alert-GMLowDiskSpace -SMTPServer smtp.example.com -ToAddress Joe@example.com -FromAddress alert@example.com -PctThreshold 15
```

#  The Module Code:

```
#Requires -Version 3 
#Requires -Module Storage

<#
 # Module Name: GriffinMonitor.psm1
 # Created: 05/22/2014
 # Version: 1.5
 # Author: Matt Griffin (MattBlogsIT.com)
 # Purpose: This Module is a set of custom cmdlet's that are used to alert of potential health concerns in your Windows Environment
 # Legal: This module was built by Matt Griffin for use in his home lab environment. This module comes with no warranty or guarantee. 
 #        This module is provided to be used at your own risk and will not have any support backing it up.
 # History: Matt Griffin 06/18/2014
            Corrected some typo's, added new cmdlet called Alert-GMLowDiskSpace

            Matt Griffin 05/22/2014
 #          Initial creation of Module with first cmdlet Alert-GMUnhealthyStoragePool
 #>

function Alert-GMUnhealthyStoragePool
{
    <#
    .Synopsis
       This cmdlet will check all of your local systems storage pools and send you can alert when one of them enters a state other than healthy.
    .DESCRIPTION
       This cmdlet will check all of your local systems storage pools and send you can alert when one of them enters a state other than healthy. The alert will be sent through email.
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

function Alert-GMLowDiskSpace
{
    <#
    .Synopsis
       This cmdlet will check all of your local systems volumes and send you can alert when one of them reaches a specified threshold.
    .DESCRIPTION
       This cmdlet will check all of your local systems volumes and send you can alert when one of them reaches a specified threshold. The default threshold is 10.
    .PARAMETER SMTPServer
       This parameter will be used to specify a standard SMTP Server that doesn't require SSL or TLS.
    .PARAMETER ToAddress
       This parameter will be used to specify the email address to which the alert messages will be sent.
    .PARAMETER FromAddress
       This parameter will be used to specify the email address from which the alert messages will be sent.
    .PARAMETER PctThreshold
       This parameter is the threshold the remaining space must reach before sending an email, by default it is 10.
    .EXAMPLE
       Alert-GMLowDiskSpace -SMTPServer smtp.example.com -ToAddress Joe@example.com -FromAddress alert@example.com
    .EXAMPLE
       Alert-GMLowDiskSpace -SMTPServer smtp.example.com -ToAddress Joe@example.com -FromAddress alert@example.com -PctThreshold 15
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
        $FromAddress,

        # PctThreshold is the threshold the remaining space must reach before sending an email
        [Parameter(Mandatory=$false,Position=3)]
        $PctThreshold=10
    )
    #Import Required PowerShell Module
    Import-Module -Name Storage

    $volumes = Get-Volume

    foreach($volume in $volumes){
        if($volume.DriveType -eq "Fixed"){
            #Calculating the amount of space remaining as a percentage
            $pctRemaining = "{0:N2}" -f ($volume.SizeRemaining/$volume.Size*100)

            if($pctRemaining -le $pctThreshold){
                $output = $volume | 
                Select DriveLetter, FileSystemLabel, FileSystem, HealthStatus, @{N="PctRemaining";e={$pctRemaining+"%"}} | 
                ConvertTo-Html

                #Create hash table to splat for Send-MailMessage
                $mailMessageParams = @{'SmtpServer'=$SMTPServer;
                                       'From'=$FromAddress;
                                       'To'=$ToAddress;
                                       'Subject'="The Volume $($volume.DriveLetter): has $pctRemaining% remaining on $env:computername";
                                       'Body'=($output | Out-String);
                                       'BodyAsHtml'=$true}

                Send-MailMessage @mailMessageParams
            }
        }
    }
}
```

#  Update Instructions:

1. Open C:\\Users\\_<username>_\\Documents\\WindowsPowerShell\\Modules\\GriffinMonitor with the PowerShell ISE or your favorite text editing document
2. Replace the code with the above script
3. Create a Scheduled Job for the new PowerShell cmdlet
    1. ```
        #The below PowerShell commands will schedule the cmdlet to run every 30 minutes using the SMTPServer xxx.xxx.xxx.xxx, emailing to joe@example.com and coming from noreply@example.com - Make sure you update the parameter values.
        $trig = New-JobTrigger -Once -At "5/22/2014 0am" -RepetitionInterval (New-TimeSpan -Minute 30) -RepetitionDuration ([TimeSpan]::MaxValue)
        Register-ScheduledJob -Name CheckStoragePoolHealth -ScriptBlock { Alert-GMLowDiskSpace -SMTPServer xxx.xxx.xxx.xxx -ToAddress joe@example.com -FromAddress noreply@example.com} -Trigger $trig
        ```
        

# Installation Instructions:

1. Navigate to C:\\Users\\_<username>_\\Documents\\WindowsPowerShell\\Modules\\GriffinMonitor
    1. (Note: If the directory doesn't exists you must create it.)
2. Save the above code in a file named GriffinMonitor.psm1 under the above directory
3. Create a Scheduled Job using PowerShell
    1. ```
        #The below PowerShell commands will schedule the cmdlet to run every 30 minutes using the SMTPServer xxx.xxx.xxx.xxx, emailing to joe@example.com and coming from noreply@example.com - Make sure you update the parameter values.
        $trig = New-JobTrigger -Once -At "5/22/2014 0am" -RepetitionInterval (New-TimeSpan -Minute 30) -RepetitionDuration ([TimeSpan]::MaxValue)
        Register-ScheduledJob -Name CheckStoragePoolHealth -ScriptBlock { Alert-GMLowDiskSpace -SMTPServer xxx.xxx.xxx.xxx -ToAddress joe@example.com -FromAddress noreply@example.com} -Trigger $trig
        ```
        

Once it is scheduled, keep an active eye on your inbox for when your Storage Pool goes unhealthy!

# Miscellaneous Notes:

- This module was built and tested using PowerShell v4 on Server 2012 R2 running a single Storage Pool.
- This module "should" work with Server 2012 running PowerShell v3 with one or many Storage Pools
- This module comes with no guarantee or support, this is a run at your own risk and I take no responsibility for any repercussions that may occur by running this.
    - With that being said I'll try my best to assist anyone who may have questions if you post in the comments of this thread.