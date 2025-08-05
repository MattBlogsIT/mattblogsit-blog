---
title: "My Microsoft HoloLens Adventure - Setting up the Development Tools"
date: 2016-05-16
categories: 
  - "developer"
  - "microsoft"
tags: 
  - "adventure"
  - "development"
  - "hololens"
  - "microsoft"
  - "windows-10"
---

I've started my adventure of learning how to program for the Microsoft HoloLens. If you haven't heard about this new adventure please check out my blog post [My Microsoft HoloLens Adventure - Introduction](http://mattblogsit.com/microsoft/windows/my-microsoft-hololens-adventure-introduction). On that blog post I have a video introducing myself, and my intentions. In addition I've included a video of the unboxing of the Microsoft HoloLens. Throughout this blog post I will highlight the steps required to get your PC setup to program the HoloLens.

[![Matt wearing the Hololens](/mattblogsit-dev/assets/images/20160513_195217-e1463184960514-225x300.jpg)](http://mattblogsit.com/wp-content/uploads/2016/05/20160513_195217-e1463184975460.jpg)

# System Requirements:

- Windows 7 SP 1 or greater (Windows 10 recommended) - Must be Professional, Enterprise or Education edition
- Hyper-V enabled on the system
- 64-bit CPU with at least 4 cores
- 8 GB of RAM
- BIOS that supports:
    - Hardware-assisted virtualization
    - Second Level Address Translation (SLAT)
    - Hardware-based Data Execution Prevention (DEP)
- GPU that supports:
    - DirectX 11.0 or later
    - WDDM 1.2 driver or later

# Enable Hyper-V:

1. Open Control Panel
2. Click Programs
3. Click Turn Windows features on or off
4. Check Hyper-V
5. Click OK
6. Restart computer when install finishes

# Installing Visual Studio 2015:

To write applications for the HoloLens you must use Visual Studio 2015 with Update 2 installed to write the Universal Windows App. Luckily you can use the Visual Studio 2015 Community edition at no cost! The community edition will provide enough features for you to get started, however if you are an experienced developer and want to dig into more depth you may want to evaluate the Professional or Enterprise editions. To compare what each edition has check out the [Compare Visual Studio 2015 Offerings](https://www.visualstudio.com/en-us/products/compare-visual-studio-2015-products-vs.aspx) page.

## Procedure:

1. Download [Visual Studio Community Edition](https://go.microsoft.com/fwlink/p/?LinkId=534599)
2. Run the Installer
3. Choose custom install
4. Select Tools and Windows 10 SDK
5. Click Install

# HoloLens Emulator:

To develop for the HoloLens doesn't require that you have a HoloLens - although it does make it more entertaining! If you do not own one do not fear - you can download and install the HoloLens Emulator.

## Procedure:

1. Download the [HoloLens Emulator](http://go.microsoft.com/fwlink/?LinkID=724053)
2. Run the Installer
3. Click Next
4. Click Next
5. Read and review the License Agreement
6. Click Accept
7. Click Install

# Unity HoloLens Technical Preview Beta:

To build holographic applications you need to use the Unity HoloLens Technical Preview - this gives you the ability to place 3D Models into your applications to be treated as Holograms.

## Procedure:

1. Download the [32-bit](http://beta.unity3d.com/download/8b4340e08ab1/UnitySetup32.exe) or [64-Bit](http://beta.unity3d.com/download/8b4340e08ab1/UnitySetup64.exe) client based on your needs.
2. Run the Installer
3. Click Next >
4. Read and review the License Agreement
5. Click I Agree
6. Click Next >
7. Click Install
8. Click Finish
9. Download the [UWP Runtime](http://beta.unity3d.com/download/8b4340e08ab1/UnitySetup-Metro-Support-for-Editor-5.4.0b16-HTP.exe)
10. Run the Installer
11. Click Next >
12. Read and review the License Agreement
13. Click I Agree
14. Click Install
15. (Optional) Download the offline documentation
16. Run the Installer
17. Click Next >
18. Read and review the License Agreement
19. Click I Agree
20. Click Install
21. Click Finish
