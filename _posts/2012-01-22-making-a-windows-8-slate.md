---
categories:
- "Administrator"
- "Microsoft"
- "User"
date: 2012-01-22
excerpt: Back when Windows 8 was shown off at the Developers conference someone I
  work with mentioned it in a meeting, I went into depth about what I knew about it
  which somehow lead me into being the person...
tags:
- slate
- windows-8
title: Making a Windows 8 Slate
---

Back when Windows 8 was shown off at the Developers conference someone I work with mentioned it in a meeting, I went into depth about what I knew about it which somehow lead me into being the person spearheading a project of trying to get Apparatus to buy a Slate device we can install Windows 8 on. I went back and forth in some emails with our CTO a couple times about getting a device and keeping cost low. This ended up with us looking at the HP Slate 500 mostly. I noticed that the requirements document for Windows 8 was released and found out that the minimum resolution for a Windows 8 Slate would be 1366 x 768 looking at the technical details of the HP Slate 500 mentioned it’s max resolution of 1024×768.

![Samsung Series 7 Slate Running Windows 8]({{ site.baseurl }}/assets/img/IMG_0544.jpg)
*Samsung Series 7 Slate Running Windows 8*

<!--more-->My first task was to figure out what Slates offered the minimum resolution which my results turned up that the Samsung Series 7 Slate was the only one on the market currently. After looking at the price I looked to see what we would miss out on not having the minimum resolution which would be the side-by-side apps using the metro UI. I couldn’t find anything else specifically however there may be more.

I spoke with the CTO and it was decided we get the Samsung Series 7 Slate, next day it was sitting on my desk ready for an Install of Windows 8. So if you don’t have one I suggest you buy one on [Amazon](https://www.amazon.com/dp/B005OUQ9WO/ref=as_li_tf_til?tag=mattblogsit-20&camp=0&creative=0&linkCode=as1&creativeASIN=B005OUQ9WO&adid=0CMJ493PHYSBXA4G4BDY&). If you read on you will see instructions on building your own Windows 8 Slate using a Samsung Series 7 Slate. These instructions will apply to other Slates also. however some steps may very when it comes to booting to install.

 

# Installing the OS

With this being a Slate Device I knew that it would be an OS install from flash drive, so my first step was formatting a flash drive that could store the ISO Files. So I needed a flash drive that could handle storing 4.8 GB of storage for me to install the [Windows 8 Developer Preview with developer tools 64-bit](http://msdn.microsoft.com/en-us/windows/apps/br229516). I wasn’t able to locate anymore than 4GB at work so I first installed a 32-bit OS which is only 2.8 GB to play around with. Once I got home I used my 32GB flash drive and re-installed with the Preview with developer tools 64-bit. The instructions on formatting the drive are below.

## Formatting the Drive (Using Windows 7)

Note: The exact steps are using Windows 7, using other versions of Windows are very similar.

1. Open up an Administrative command prompt
    1. Click Start
    2. Type cmd
    3. Right click cmd.exe
    4. Click Run as administrator
    5. Click Yes on the UAC prompt
2. Type _diskpart_ in the command prompt
3. Type _list disk_
4. Once you know which is the Flash drive type _select disk__n_ (select disk 1)
5. Type _clean_
6. Type _create partition primary_
7. Type _select partition 1_
8. Type _active_
9. Type _format quick fs=NTFS_
10. Type _assign_
11. Type _exit_
12. This part is easy, you will need to mount the ISO using your program of choice, I use Virtual Clone Drive by [SlySoft](http://www.slysoft.com/en/virtual-clonedrive.html)
13. Next you will open the folder in Windows Explorer
14. You will also open your empty flash drive with Windows Explorer
15. Then copy all files off the ISO to the flash drive

You have now made a Bootable USB device with Windows 8 installation on it.

#  Booting the USB and Installing Windows 8

Before installing Windows 8 make sure you update the BIOS with the Windows 7 installation it comes with. I am not going to have you boot into the BIOS just the boot selection screen.

1. Boot the system by holding the Windows button and pressing the Power button, hold it while powering on if you want in the BIOS.

![Samsung Series 7 Slate Boot Selection]({{ site.baseurl }}/assets/img/IMG_0538.jpg)
*Samsung Series 7 Slate Boot Selection*
2. If you just tapped the buttons to power it on a Boot selection screen will appear
3. Select your USB flash drive
4. Use volume up/down to move, and the screen lock button to select
5. Once the USB installer loads you can use the touch interface.
6. Click Next
7. Click Install now
8. Read the license terms, and check I accept the license terms
9. Click Next
10. Click Custom (advanced)
11. Click Drive Options
12. Delete all volumes
13. Click New
14. Click Ok
15. Click Next

You will be guided through the rest of the Installation and Setup by Windows, congratulations you have created a Windows 8 Slate using the Samsung Series 7 Slate.
