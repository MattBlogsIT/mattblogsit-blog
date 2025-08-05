---
categories:
- administrator
- microsoft
date: '2013-07-01'
excerpt: During my time at Microsoft TechEd many new things were announced. My all
  time favorite announcement was PowerShell v4. There are many great things coming
  out with PowerShell v4, things that I...
tags:
- indyposh
- powershell
- powershell-v4
- scripting
- server-2012-r2
- teched
title: PowerShell v4 Desired State Configuration Deep Dive
---

During my time at Microsoft TechEd many new things were announced. My all time favorite announcement was PowerShell v4. There are many great things coming out with PowerShell v4, things that I haven't really gotten a chance to dig into much yet. However the one of the few things I have run through would be the Desired State Configuration which I will refer to as DSC throughout this blog.

DSC is a way to manage the configuration for multiple servers utilizing a single script for the deployment. In the example I will use is managing an IIS Configuration across multiple servers. However as the DSC is developed there will be other usability options for this.<!--more-->

# Step Outline:

The DSC requires a couple of steps. It isn't just a single script you create and execute; but it is very close.

1. Create a DSC script.
2. Execute DSC script to create DSC file (MOF File).
3. Deploy and enact Desired State Configuration file to server(s)

## Step 1: Creating a Desired State Configuration File

The first step, in utilizing the DSC is creating the DSC Script. This script is used to generate the DSC file which is a MOF document. To create the DSC Script you can simply open the PowerShell ISE and start writing PowerShell utilizing a couple of new keywords and identifiers.

You will notice in the below example script the keyword configuration, with a nested identifier of Node.

```
Configuration MattBlogsITDemo
{
    Node Server1
    {
        WindowsFeature IIS
        {
            Ensure = "Present"
            Name = "Web-Server"
        }

        WindowsFeature ASP
        {
            Ensure = "Present"
            Name = "Web-Asp-Net45"
        }

        Website DefaultSite
        {
            Ensure = "Present"
            Name = "Default Web Site"
            PhysicalPath = "C:\inetpub\wwwroot"
            State = "Stopped"
            Requires = "[WindowsFeature]IIS"
        }

        File WebContent
        {
            Ensure = "Present"
            Type = "Directory"
            SourcePath = "\\fileserver01\WebContent\DemoSite"
            DestinationPath = "D:\websites\DemoSite"
            Recurse = $true
        }

        Website DemoSite
        {
            Ensure = "Present"
            Name = "DemoSite"
            PhysicalPath = "D:\websites\DemoSite"
            State = "Started"
            Protocol = @("http")
            BindingInfo = @("*:80:")
            Requires = "[File]WebContent"
        }
    }
}
```

## Step 2: Execute DSC script to create DSC (MOF Configuration File)

Once you have finalized, or possibly updated your DSC Script you now have to generate the MOF Configuration File that is actually used to perform the deployment. When you are ready to create this file all you must do is execute the script you created in step one.

## Step 3: Deploy and enact Desired State Configuration file to server(s)

Once you have setup your script, and created the MOF Configuration File all you have to do is execute a single cmdlet and it will run and deploy to 1-many servers depending on the script.

```
Start-DscConfiguration -ComputerName -Path MattBlogsITDemo -Credential Get-Credential
```

## Summary:

Overall this is a fantastic new feature and will make a big difference for maintaining a standard configuration across an entire environment. You can combine this with Azure cmdlets and automate the deployment of web servers as your environment starts taking a much higher load.

**Note: I used the following [TechNet Article](http://technet.microsoft.com/en-us/library/dn249918.aspx) and HOL I attended at TechEd to assist in writing this.**