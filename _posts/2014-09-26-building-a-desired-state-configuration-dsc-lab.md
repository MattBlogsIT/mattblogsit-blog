---
categories:
- administrator
- microsoft
date: '2014-09-26'
excerpt: Recently I presenting at the Indianapolis PowerShell User Group and talked
  about Desired State Configuration. The presentation was 100% demonstrations, and
  I decided it would be a good idea to...
tags:
- community
- desired-state-configuration
- dsc
- dsc-resource
- hyper-v
- microsoft
- powershell
- powershell-v4
- server-2012-r2
- vhd
- vhdx
- virtualdisk
title: Building a Desired State Configuration (DSC) Lab
---

Recently I presenting at the Indianapolis PowerShell User Group and talked about Desired State Configuration. The presentation was 100% demonstrations, and I decided it would be a good idea to provide all of the PowerShell commands/instructions I used to build my lab environment for the presentation.

**Note:** Please note that these instructions were written using multiple Experimental DSC Resources, Microsoft and I myself provide no guarantee that these will work in a production environment. I strongly encourage that you use test environments that do not matter until you feel comfortable with DSC.

# Pre-requisites

- Licensed/Trial Media for Windows Server 2012 R2
- An installed/updated Sys prepped VM Parent Disk
    - Stored at D:\\Templates\\Server2012R2.vhdx
- a Virtual Switch within Hyper-V Configured as a Private, named "Private Network"
- At least 7GB of free memory
    - You can adjust this all the way down to just 4GB
- Downloaded copy of the latest DSC Resource Kit - Download [Here](http://gallery.technet.microsoft.com/scriptcenter/DSC-Resource-Kit-All-c449312d)

Now before we dive into the scripting component of this blog post I want you to know that this is not 100% automated. You will have some manual steps here and there, it is possible to 100% automate - but that will require significantly more effort. Please continue reading for instructions on this demonstration.

<!--more-->

# Step 1: Creating the VM's

The first task is going to be to create the Differencing Disks and Virtual Machines from the parent disk that you have previously created. This demonstration consists of four different Virtual Machines.

```
New-VHD -ParentPath D:\Templates\Server2012R2.vhdx -Path 'D:\Hyper-V\Virtual Hard Disks\IndyPoSh-DC1.vhdx' -Differencing -SizeBytes 80GB
New-VHD -ParentPath D:\Templates\Server2012R2.vhdx -Path 'D:\Hyper-V\Virtual Hard Disks\IndyPoSh-DSC1.vhdx' -Differencing -SizeBytes 80GB
New-VHD -ParentPath D:\Templates\Server2012R2.vhdx -Path 'D:\Hyper-V\Virtual Hard Disks\IndyPoSh-IIS1.vhdx' -Differencing -SizeBytes 80GB
New-VHD -ParentPath D:\Templates\Server2012R2.vhdx -Path 'D:\Hyper-V\Virtual Hard Disks\IndyPoSh-IIS2.vhdx' -Differencing -SizeBytes 80GB
New-VM -Name "IndyPoSh-DC1" -MemoryStartupBytes 1GB -VHDPath 'D:\Hyper-V\Virtual Hard Disks\IndyPoSh-DC1.vhdx' -SwitchName "Private Network"
New-VM -Name "IndyPoSh-DSC1" -MemoryStartupBytes 2GB -VHDPath 'D:\Hyper-V\Virtual Hard Disks\IndyPoSh-DSC1.vhdx' -SwitchName "Private Network"
New-VM -Name "IndyPoSh-IIS1" -MemoryStartupBytes 2GB -VHDPath 'D:\Hyper-V\Virtual Hard Disks\IndyPoSh-IIS1.vhdx' -SwitchName "Private Network"
New-VM -Name "IndyPoSh-IIS2" -MemoryStartupBytes 2GB -VHDPath 'D:\Hyper-V\Virtual Hard Disks\IndyPoSh-IIS2.vhdx' -SwitchName "Private Network"
Get-VM -Name IndyPoSh* | Start-VM
```

#  Step 2: Performing initial configuration of VM's

This step could be further automated with some non-PowerShell tasks. To setup this demonstration will require you walk through the OOB (Out of box) Experience and provide the default password of P@ssw0rd! on all four VM's. Once that tasks is completed and you are logged in as Administrator you want to execute the below commands.

## IndyPoSh-DC1

```
$int = Get-NetIPAddress | Where-Object { $_.InterfaceAlias -eq 'Ethernet' -and $_.AddressFamily -eq 'IPv4' }
New-NetIPAddress -InterfaceIndex $int.InterfaceIndex -IPAddress 10.10.0.10 -PrefixLength 24 -DefaultGateway 10.10.0.1
Set-DnsClientServerAddress -InterfaceIndex $int.InterfaceIndex -ServerAddresses 127.0.0.1,10.10.0.10
Rename-Computer -NewName "IndyPoSh-DC1" -Restart
#Restart Server - Login after Restart
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
Install-ADDSForest -DomainName "IndyPoSh.Demo" -InstallDNS -SafeModeAdministratorPassword (ConvertTo-SecureString -String "P@ssw0rd!" -AsPlainText -Force)
#Restart Server - Login after Restart (Not a required step)
Get-WindowsFeature *GUI* | Uninstall-WindowsFeature -Restart
```

##  IndyPoSh-DSC1

```
$int = Get-NetIPAddress | Where-Object { $_.InterfaceAlias -eq 'Ethernet' -and $_.AddressFamily -eq 'IPv4' }
New-NetIPAddress -InterfaceIndex $int.InterfaceIndex -IPAddress 10.10.0.11 -PrefixLength 24 -DefaultGateway 10.10.0.1
Set-DnsClientServerAddress -InterfaceIndex $int.InterfaceIndex -ServerAddresses 10.10.0.10
Rename-Computer -NewName "IndyPoSh-DSC1" -Restart
#Restart Server - Login after Restart
$User = "IndyPoSh\Administrator"
$PWord = ConvertTo-SecureString –String "P@ssw0rd!" –AsPlainText -Force
$Credential = New-Object –TypeName System.Management.Automation.PSCredential –ArgumentList $User, $PWord
Add-Computer -DomainName IndyPoSh.Demo -Restart -Credential $Credential
#Server Restarts
```

##  IndyPoSh-IIS1

```
$int = Get-NetIPAddress | Where-Object { $_.InterfaceAlias -eq 'Ethernet' -and $_.AddressFamily -eq 'IPv4' }
New-NetIPAddress -InterfaceIndex $int.InterfaceIndex -IPAddress 10.10.0.12 -PrefixLength 24 -DefaultGateway 10.10.0.1
Set-DnsClientServerAddress -InterfaceIndex $int.InterfaceIndex -ServerAddresses 10.10.0.10
Rename-Computer -NewName "IndyPoSh-IIS1" -Restart
#Restart Server - Login after Restart
$User = "IndyPoSh\Administrator"
$PWord = ConvertTo-SecureString –String "P@ssw0rd!" –AsPlainText -Force
$Credential = New-Object –TypeName System.Management.Automation.PSCredential –ArgumentList $User, $PWord
Add-Computer -DomainName IndyPoSh.Demo -Restart -Credential $Credential
#Server Restarts
```

 

##  IndyPoSh-IIS2

```
$int = Get-NetIPAddress | Where-Object { $_.InterfaceAlias -eq 'Ethernet' -and $_.AddressFamily -eq 'IPv4' }
New-NetIPAddress -InterfaceIndex $int.InterfaceIndex -IPAddress 10.10.0.13 -PrefixLength 24 -DefaultGateway 10.10.0.1
Set-DnsClientServerAddress -InterfaceIndex $int.InterfaceIndex -ServerAddresses 10.10.0.10
Rename-Computer -NewName "IndyPoSh-IIS2" -Restart
#Restart Server - Login after Restart
$User = "IndyPoSh\Administrator"
$PWord = ConvertTo-SecureString –String "P@ssw0rd!" –AsPlainText -Force
$Credential = New-Object –TypeName System.Management.Automation.PSCredential –ArgumentList $User, $PWord
Add-Computer -DomainName IndyPoSh.Demo -Restart -Credential $Credential
#Server Restarts
```

#  Step 3: Cheating with some DSC Configuration

I call this cheating, as for some of these servers you could package these modules in a special way on the Pull Server, and it would work for part of the demonstration. However for simplicity sake I cheated... I admit it!

1. Copy and paste the extracted PowerShell Modules you downloaded from the TechNet Gallery that are a part of the DSC Resource Kit to C:\\Program Files\\WindowsPowerShell\\Modules on IndyPoSh-DSC1, IndyPoSh-IIS1 and IndyPoSh-IIS2
2. Copy WebDeploy.ps1 from C:\\Program Files\\WindowsPowerShell\\Modules\\xPSDesiredStateConfiguration\\Examples\\Sample\_xDscWebService.ps1 to C:\\PoSh\\Sample\_xDscWebService.ps1 on IndyPoSh-DSC1
3. Create a Shared Folder at C:\\Websites\\, grant Everyone Full Control under Share Permissions on IndyPoSh-DSC1
4. Under C:\\Websites\\Example create a file named Index.htm that has some kind of content

# Step 4: Pushing a DSC Configuration

In this step we have a pre-built DSC Configuration that we will be working with. This DSC Configuration is named WebDeploy. Notice that it is structured like a function, it even has a param block that accepts a string array parameter called ComputerName. With this you can build this exact configuration for multiple computers in your organization by simply passing it an array of computers, by default it'll go against the local machine.

Within this DSC Configuration we are also importing an experimental resource - keep in mind these are not supported by Microsoft as they are currently being tested. The resources we use in this configuration vary but overall it is going to install IIS with ASP.Net 4.5, it will then stop the default site in IIS, create a new AppPool, a new Website and even copy the web content from a network share.

At the very end we call the WebDeploy Configuration Function to generate this configuration for IndyPoSh-IIS1.

```
configuration WebDeploy {

    param(
        [string[]]
        $ComputerName = "localhost"
    )

    Import-DscResource -Module xWebAdministration
    Node $ComputerName {

        WindowsFeature IIS {
            Ensure = "Present"
            Name = "Web-Server"
        }

        WindowsFeature ASP {
            Ensure = "Present"
            Name = "Web-Asp-Net45"
        }

        WindowsFeature Backup {
            Ensure = "Present"
            Name = "Windows-Server-Backup"
        }

        xWebsite DefaultSite {
            Name = "Default"
            State = "Stopped"
            PhysicalPath = "C:\inetpub\wwwroot"
            DependsOn = "[WindowsFeature]IIS"
        }

        xWebAppPool Example {
            Name = "Example"
            Ensure = "Present"
        }

        xWebsite ExampleSite {
            Name = "Example"
            PhysicalPath = "C:\websites\Example"
            State = "Started"
            ApplicationPool = "Example"
            DependsOn = "[WindowsFeature]IIS"
        }

        File ExampleSiteContent {
            Ensure = "Present"
            SourcePath = "\\IndyPoSh-DSC1\Websites\Example"
            DestinationPath = "C:\websites\Example"
            Recurse = $true
            Type = "Directory"
        }
    }
}

WebDeploy -ComputerName IndyPOSh-IIS1
```

##  Steps to follow:

1. Log into IndyPoSh-DSC1
2. Open the PowerShell ISE
3. Copy/Paste the content of WebDeploy.ps1 from above into the Scripting Pane
4. In the Integrated PowerShell run "Set-Location C:\\PoSh"
5. Click the Green Play button to Run Script
    1. This will create the MOF Files used by DSC to configure the computer in C:\\PoSh\\WebDeploy
6. In the Integrated PowerShell run "Start-DscConfiguration -Path C:\\PoSh\\WebDeploy -Wait -Verbose
    1. If you do not use the -Wait parameter it'll be created as a PowerShell Job
    2. I recommend using -Verbose so that you can review what DSC actually did

Now if you navigate to http://IndyPoSh-IIS1/index.htm you will see the page you had stored in the Shared Folder you created earlier at C:\\Websites\\Example\\index.htm on IndyPoSh-DSC1.

# Step 5: Creating a DSC Pull Server

In this step we are going to perform a mix of manual and automated steps to create a Web Service that acts as a DSC Pull Server. Unlike a DSC Push Configuration, the server will check-in every 15 minutes and apply the new configuration every 30 minutes - including self-mending any miss-configurations.

## Steps to follow:

1. In the PowerShell ISE run in the Integrated PowerShell console "PSEdit C:\\PoSh\\Sample\_xDscWebService.ps1"
2. Modify line 31 to set the "CertificateThumbPrint" to the value "AllowUnencryptedTraffic"
    1. DO NOT DO THIS IN A PRODUCTION SYSTEM
    2. Can be considered a major security vulnerability
    3. Example modified script below
3. At the bottom of the script (Line 52) add "Sample\_xDscWebService"
4. Save the file
5. Run the Script
6. In the Integrated PowerShell run "Start-DscConfiguration -Path C:\\PoSh\\Sample\_xDscWebService -Wait -Verbose
    1. This will take a few minutes to run
    2. If you do not use the -Wait parameter it'll be created as a PowerShell Job
    3. I recommend using -Verbose so that you can review what DSC actually did

### Example Script

An example of what your Sample\_xDscWebResource file should look like what is below. Please note that this may change slightly in future Resource Wave Releases.

```
# DSC configuration for Pull Server and Compliance Server
# Prerequisite: Certificate "CN=PSDSCPullServerCert" in "CERT:\LocalMachine\MY\" store
# Note: A Certificate may be generated using MakeCert.exe: http://msdn.microsoft.com/en-us/library/windows/desktop/aa386968%28v=vs.85%29.aspx

configuration Sample_xDscWebService
{
    param 
    (
        [string[]]$NodeName = 'localhost',

        [ValidateNotNullOrEmpty()]
        [string] $certificateThumbPrint
    )

    Import-DSCResource -ModuleName xPSDesiredStateConfiguration

    Node $NodeName
    {
        WindowsFeature DSCServiceFeature
        {
            Ensure = "Present"
            Name   = "DSC-Service"            
        }

        xDscWebService PSDSCPullServer
        {
            Ensure                  = "Present"
            EndpointName            = "PSDSCPullServer"
            Port                    = 8080
            PhysicalPath            = "$env:SystemDrive\inetpub\wwwroot\PSDSCPullServer"
            CertificateThumbPrint   = "AllowUnencryptedTraffic"         
            ModulePath              = "$env:PROGRAMFILES\WindowsPowerShell\DscService\Modules"
            ConfigurationPath       = "$env:PROGRAMFILES\WindowsPowerShell\DscService\Configuration"            
            State                   = "Started"
            DependsOn               = "[WindowsFeature]DSCServiceFeature"                        
        }

        xDscWebService PSDSCComplianceServer
        {
            Ensure                  = "Present"
            EndpointName            = "PSDSCComplianceServer"
            Port                    = 9080
            PhysicalPath            = "$env:SystemDrive\inetpub\wwwroot\PSDSCComplianceServer"
            CertificateThumbPrint   = "AllowUnencryptedTraffic"
            State                   = "Started"
            IsComplianceServer      = $true
            DependsOn               = @("[WindowsFeature]DSCServiceFeature","[xDSCWebService]PSDSCPullServer")
        }
    }
 }

 Sample_xDscWebService
```

#  Step 6: Creating a Configuration on the Pull Server

Once you have setup the Pull Server Web Service on IndyPoSh-DSC1 you need to create a configuration that can actually be pulled! Please note that there are capabilities to have the nodes pull missing DSC Resources from the Pull Server in addition to the configurations, however we will not be covering that in this blog post.

## Steps to follow:

1. On IndyPoSh-DSC1, open the PowerShell ISE
    1. If it isn't still open from the last step
2. Copy/Paste the WebDeploy.ps1 script from step 4 (or open the previously saved script)
3. Run the script (if you didn't do this in step 4)
4. Execute the below code
5. **Leave this open for Step 7**

In the below code we are using a .NET Method to generate a valid GUID. We will then use that generated GUID to copy the IndyPoSh-IIS1.mof file and rename it to a new location that the DSC WebService is looking in for configurations. At the very end we are also running a command named New-DscCheckSum, which will generate a check sum file that the node will use to verify the configuration has not become corrupted.

```
$guid = [guid]::NewGuid()
$Path = "C:\PoSh\WebDeploy\IndyPoSh-IIS1.mof"
$Destination = "C:\Program Files\WindowsPowerShell\DscService\Configuration\$guid.mof"
Copy-Item -Path $Path -Destination $Destination
New-DscCheckSum -ConfigurationPath $Destination
```

#  Step 7: Configuring the Node to Pull Configuration

In this step we are actually going to Push a new DSC Local Configuration Manager configuration to the end node, so that it knows where and which configuration to pull from the DSC Pull Web Service that we setup previously.

## Steps to follow:

1. Save the below example PullConfig to the local machine on IndyPoSh-DSC1
2. Run the script

```
Configuration ConfigPull {
    param(
        [string[]]
        $ComputerName = "localhost",
        [string]$Guid)

        Node $ComputerName {

            LocalConfigurationManager {
                AllowModuleOverwrite = $true
                ConfigurationMode = "ApplyAndAutoCorrect"
                ConfigurationID = $Guid
                ConfigurationModeFrequencyMins = 15
                RefreshMode = "Pull"
                DownloadManagerName = "WebDownloadManager"
                DownloadManagerCustomData = @{ 
                    ServerUrl = 'http://IndyPoSh-DSC1.IndyPoSh.Demo:8080/PSDSCPullServer.svc';
                    AllowUnsecureConnection = 'true' }
            }
        }
}

ConfigPull -ComputerName IndyPoSh-IIS2 -Guid $guid
Set-DscLocalConfigurationManager -ComputerName IndyPoSh-IIS2 -Path .\ConfigPull -Verbose
```

Notice that the PullConfig Configuration script is a bit different then a Push configuration. In this one we are having to specify a specific settings so that it knows where it is pulling it's configuration, we also have to specify the GUID for the configuration that we want this node to pull. This is why we needed to leave the PowerShell ISE open from the previous step. It isn't a requirement; however we would need to look up the GUID if we didn't.