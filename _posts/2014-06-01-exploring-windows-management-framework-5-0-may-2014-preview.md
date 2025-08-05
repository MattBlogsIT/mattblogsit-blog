---
title: "Exploring Windows Management Framework 5.0 May 2014 Preview"
date: 2014-06-01
categories: 
  - "administrator"
  - "microsoft"
tags: 
  - "powershell"
  - "powershell-v5"
  - "server-2012-r2"
  - "windows-management-framework-5-0"
---

The Windows Management Framework 5.0 Preview was released in early April, and an update to it was posted during Microsoft TechEd in May. Some major things are changing with PowerShell; the main one being that new versions of PowerShell are not going to be tied to major OS releases. PowerShell will be released as it is ready, and then added into the OS for the latest version.

Two of the major changes with PowerShell v5.0 include two new modules; the OneGet Module and the PowerShellGet Module. In this blog post we are going to explore some of the basics for these modules. If you would like to play with the Windows Management Framework 5.0, if can be downloaded from the [Microsoft Download Center](http://www.microsoft.com/en-us/download/details.aspx?id=42936). Please note that this is preview code and should not be used in production. You are using this at your own risk and I strongly encourage testing it on the VM until the final code is released.

Please note that this is just a very quick overview of the modules and we will dive into more depth on them in upcoming blog posts.

[![psv5]({{ "/assets/images/psv5.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/psv5.png)<!--more-->

 

# PowerShell OneGet Module:

The PowerShell OneGet Module was available in the April preview of the WMF 5.0. The OneGet Module is used as a method to obtain software in an automated fashion; very similar to YUM (Yellowdog Updated, Modified) or APT-GET (Advanced Packaging Tool) that you would have used while working with Linux distributions. While in a Windows World you may have worked with the [Chocolatey Gallery](http://chocolatey.org/) which is a NuGet based package installer.

I personally have been using Chocolatey for about a year now, and I am very excited to see OneGet coming along. It is even more exciting to see that Microsoft isn't just ignoring the existence of Chocolatey, they are using it as their first publicly available software repository.

## The Cmdlet's:

Currently detailed Help documents do not exist for the below cmdlets. I've provided a quick summary of what these cmdlets can do from what I've gathered by analyzing the parameters available with them.

[![OneGetCmdlets]({{ "/assets/images/OneGetCmdlets.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/OneGetCmdlets.png)

### Add-PackageSource

Add-PackageSource will add additional sources outside of the default ones provided with PowerShell OneGet. The below parameters are available.

[![add-packagesource]({{ "/assets/images/add-packagesource.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/add-packagesource.png)

### Find-Package

Fine-Package will perform a search of multiple Package Sources with ability to filter by Version, Name, Provider, and Source. On top of the parameters that the Get-help returns it also has additional Parameters in including...

- AllowPrereleaseVersions
- AllVersions
- LocalOnly
- Hint
- LeavePartialPackageInstalled

[![find-package]({{ "/assets/images/find-package.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/find-package.png)

### Get-Package

Get-Package will return a list of all packages currently installed with a few parameters you can use to filter the results a bit.

[![get-package]({{ "/assets/images/get-package.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/get-package.png)

### Get-PackageSource

Get-PackageSource will return a list of PackageSource repositories that you have setup with OneGet. It includes some minor filtering parameters you can use.

[![Get-PackageSource]({{ "/assets/images/Get-PackageSource.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/Get-PackageSource.png)

### Install-Package

This is one of the more self explanatory cmdlets included with the OneGet Module. This will install a package that you specify or multiple packages that you specify. This cmdlet includes quite a few parameters that you can use to filter for where you want the package installed from all the way down to exactly which version of the package you want installed.

[![Install-Package]({{ "/assets/images/Install-Package-959x1024.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/Install-Package.png)

### Remove-PackageSource

Remove-PackageSource is used to remove package repositories that have been added to your OneGet Module.

[![Remove-PackageSource]({{ "/assets/images/Remove-PackageSource.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/Remove-PackageSource.png)

### Uninstall-Package

Another fairly self explanatory cmdlet. This will uninstall a package that you have previously installed using OneGet.

[![Uninstall-Package]({{ "/assets/images/Uninstall-Package.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/Uninstall-Package.png)

# PowerShellGet Module:

The PowerShellGet Module is new in the May preview and is similar to OneGet in the manor that it will automatically download files for you and place them in the correct folder. The big difference between OneGet and PowerShellGet is that PowerShellGet is used to download PowerShell Modules from a trusted repository hosted by Microsoft. Currently there isn't much in the repository, only 62 modules with 18 of them being experimental currently.

## The Cmdlet's:

The nice thing about the PowerShellGet Module is that a lot of the help is already available if you run an Update-Help. The Module includes only 4 cmdlets, but that is all it really needs.

[![PowerShellGetCmdlets]({{ "/assets/images/PowerShellGetCmdlets.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/PowerShellGetCmdlets.png)

### Find-Module

[![Find-Module]({{ "/assets/images/Find-Module.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/Find-Module.png)

### Install-Module

[![Install-Module]({{ "/assets/images/Install-Module.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/Install-Module.png)

### Publish-Module

[![Publish-Module]({{ "/assets/images/Publish-Module-876x1024.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/Publish-Module.png)

### Update-Module

[![Update-Module]({{ "/assets/images/Update-Module.png" | relative_url }})](http://mattblogsit.com/wp-content/uploads/2014/06/Update-Module.png)
