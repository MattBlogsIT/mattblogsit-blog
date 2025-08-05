---
categories:
- microsoft
date: '2012-11-09'
excerpt: After about a week of excitement and playing around with features, I decided
  it was time to start optimizing and making this thing run the way I wanted. The
  first thing I noticed was that I could not...
tags:
- how-to
- microsoft-surface
- surface-rt
- windows-8
title: Configure Surface to use MicroSD as Primary Storage
---

After about a week of excitement and playing around with features, I decided it was time to start optimizing and making this thing run the way I wanted. The first thing I noticed was that I could not use my SD card with my Libraries, so all my apps are going to by default save to the local SSD, which is far from what I want. I knew there had to be a way around this, so I started digging in. I feel I finally have it to the point where others should be doing the same thing, and once done, you can forget about it.

- Create a VHDX and save it on the SD card
- Create directories on this VHD for your specific libraries
    - Documents
    - Music
    - Video
    - Pictures
- Configure the libraries
- Enable Indexing on the VHDX - This is important because the Photos app doesn't work right without it.
- Have a script automatically Attach the VHD on Boot

If you would like to know the exact steps to take, please continue reading.

# Creating a VHD

1. Open Charms Menu (Swipe in from the right side of the screen)
2. Click Settings
3. Click Tiles
4. Change "Show administrative tools" to Yes
5. Swipe from the bottom of the screen
6. Click All apps
7. Under "Administrative Tools" click Computer Management
8. Click "Disk Management"
9. Click "Action"
10. Click "Create VHD"
11. Browse to the SD Card's storage and name the VHD whatever you want
12. Allocate as much of the SD's storage you want to this VHD,
13. You can decide between Fixed or Dynamically expanding. I went with Dynamically expanding.
14. Find the newly created disk in the lower panel, which should be "Disk 2"
15. Right-click where it says "Disk 2"
16. Click "Initialize Disk"
17. Click OK
18. Right-click "Unallocated"
19. Click "New Simple Volume..."
20. Click "Next >"
21. Click "Next >"
22. Select the Drive letter you want (can be anything)
23. Click "Next >"
24. Name the Volume whatever you want
25. Click "Next >"
26. Click "Finish"

# Create/Configure Library Directories on VHD

1. Click the "Libraries" icon from the "Task Bar"
2. Single click "Documents"
3. Click "Manage under "Library Tools" from the ribbon
4. Click "Manage library"
5. Click "Add"
6. Browse to the newly Attached VHD you just created
7. Click "New Folder"
8. Name it whatever you want (Eg: Documents)
9. DO NOT OPEN THE FOLDER, select the folder and click "Include folder"
10. Remove the Default Personal folder
11. Click OK
12. Click "Set save location"
13. Select the newly created folder
14. Repeat steps 1-13 for the following
    1. Music
    2. Pictures
    3. Videos

# Enable Indexing on VHD - Very Important

1. Open the "Charms Menu"
2. Click "Search"
3. Type "Indexing Options"
4. Click Settings
5. Open "Indexing Options"
6. Click "Modify"
7. Select the newly Attached VHD
8. Click OK
9. Click Close

# Create Script to Auto Attach on Startup

1. Open PowerShell as an Administrator
2. Type "Set-ExecutionPolicy RemoteSigned"
3. Press Enter
4. Type "y"
5. Press Enter
6. Click Computer from the navigation bar on the left of the Libraries folder
7. Open the C: Drive
8. Create a new folder named "PoSH"
9. Double click the new folder
10. Right-click in the white area and navigate to "New > Text Document"
11. Name it Auto-Mount.ps1
12. Open the new file with Notepad
13. Paste the below code in, don't forget to modify the red text to the path you saved the VHDX file at
    1. "Mount-DiskImage D:\\YourVHD.vhdx"
14. Open the "Charms Menu"
15. Click "Search"
16. Type "Task Scheduler" and open it
17. Click "Task Scheduler Library"
18. Click "Action"
19. Click "Create Task..."
20. General Tab
    1. Name: Attach SD VHD
    2. Location: \\
    3. Description: This is the Task that automatically attaches the VHD file on the SD card on system boot.
    4. "Click Change User or Group..." type in SYSTEM
    5. Check "Run with highest privileges"
21. Triggers Tab
    1. Click "New..."
    2. Begin the task: At startup
    3. Click OK
22. Action Tab
    1. Action: Start a program
    2. Program/script: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe
    3. Add arguments: C:\\PoSH\\Auto-Mount.ps1
    4. Click "OK"
23. Conditions Tab
    1. Under Power uncheck "Start the task only if the computer is on AC power
    2. Click "OK"
24. Have fun testing. I recommend opening the Camera app and taking some pictures, making sure it index the new ones, try adding music to the folder make sure it shows up in the music app, the same thing for the Video app.

**Update 12-30-2012**: Thank you, Don, for reminding me you need to set the execution policy on the machine first.