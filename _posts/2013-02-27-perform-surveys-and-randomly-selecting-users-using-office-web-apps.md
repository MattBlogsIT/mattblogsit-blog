---
categories:
- administrator
- microsoft
date: '2013-02-27'
excerpt: Next week we have the first **[Indianapolis PowerShell User Group](http://IndyPowerShell.org)**
  meeting and I was tasked with getting the survey for our meetings setup. I did not
  want to follow the...
tags:
- community
- indyposh
- powershell
- scripting
- skydrive
title: Perform Survey's and Randomly Selecting Users - Using Office Web Apps
---

Next week we have the first **[Indianapolis PowerShell User Group](http://IndyPowerShell.org)** meeting and I was tasked with getting the survey for our meetings setup. I did not want to follow the standard here is a piece of paper please fill out and turn back in. So I decided to use the "cloud" way of passing out surveys.

The nice thing about SkyDrive is the Office Web Apps. These web apps include Word, Excel, PowerPoint and OneNote. With Excel you are able to create Survey's and provide anyone the link. These surveys are saved in an Excel document and synced with any computer that you have SkyDrive running on. These documents are being saved to my local machine gives me the ability to execute a PowerShell script on them which will throw out winners from the list of people who submitted the survey.

![Excel_Survey_WebApp]({{ site.baseurl }}/assets/img/Excel_Survey_WebApp.jpg)

Lets start...

<!--more-->

# Building a Survey

1. Go to [http://skydrive.live.com](http://skydrive.live.com)
2. Sign in
3. Navigate to folder you wish to save the Excel document in
4. Click Create
5. Click Excel survey
6. Type in the file name and click Create
7. Fill in the questions you want to ask
8. Click Share survey
9. Click Create
10. Copy the link and share with anyone you want to fill it out

# Randomly Selecting Winners

Simply edit the variables for the location of the Survey and run the script. Make sure that Excel is installed on the system you are running this on.

> #region Variables $x = 0 $xlsx = "C:\\Users\\user1\\SkyDrive\\Documents\\Test.xlsx" $csv = $xlsx + ".csv" $numWinners = 5
> 
> #endregion
> 
> #region ConvertXLSX-ToCSV
> 
> if(Test-Path $csv) {} else { $excel = new-object -ComObject "Excel.Application" $excel.DisplayAlerts=$True $excel.Visible =$false $wb = $excel.Workbooks.Open($xlsx) $wb.SaveAs($dst\_dir + $xlsx + ".csv", 6)# 6 -> csv $wb.Close($True)
> 
> $excel.Quit() \[void\]\[System.Runtime.Interopservices.Marshal\]::ReleaseComObject($excel) } #endregion
> 
> #region Get-RandomEntry
> 
> $entries = Import-Csv $csv
> 
> Get-Random -InputObject $entries.'Full Name' -Count $numWinners
> 
> #endregion