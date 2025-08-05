---
title: "Pre-load awesome background images for Microsoft Teams Virtual Background using PowerShell"
date: 2020-07-09
categories: 
  - "administrator"
  - "microsoft"
  - "user"
tags: 
  - "automation"
  - "microsoft-teams"
  - "powershell"
  - "reddit"
  - "virtual-background"
---

Microsoft Teams officially rolled out Virtual Backgrounds back in March, around the time COVID-19 went crazy in the United States. With COVID-19 came a slew of people working from home, me included.

I spend a considerable chunk of my week on conference calls for work, volunteering, and honesty - just keeping up with friends. After a while, I had to spice up my virtual background with something new. The current implementation of Virtual Backgrounds in Microsoft Teams is limited in user-friendliness to add custom background images.

To add a custom background, you have to save the file to "%AppData%\\Microsoft\\Teams\\Backgrounds\\Uploads\\" which isn't bad once you know this. However, getting fresh background images is the problematic part. I love browsing Reddit and finding the beautiful pictures on EarthPorn or SpacePorn subreddits.

I'm a massive fan of automation, so I choose to play around with PowerShell and create a quick script. Luckily, I was able to snag the bulk of my code from [u/uspeoples](https://www.reddit.com/user/uspeoples/) from a comment posted on the PowerShell subreddit.

All you need to do is change lines 2 and 4 to match your preference and run it. The script will automatically throw the images returned from Reddit into the correct directory.

```powershell
#I also recommend SpacePorn, but any reddits will work.
$subReddit = "EarthPorn"
#You can use hot, new, or top for the filter
$redditFilter = "top"

#Don't change anything below this line
$teamsDirectory = "$env:AppData\Microsoft\Teams\Backgrounds\Uploads\"
$redditData = (invoke-restmethod "http://www.reddit.com/r/$subReddit/$redditFilter/.json").data.children.data.url

foreach($data in $redditData){
    Invoke-WebRequest -Uri $data -OutFile ($teamsDirectory + $data.split('/')[-1])
}
```

Now, one major caveat when running this, Reddit won't always have the best pictures; as my girlfriend put it, "They will also get ugly pictures, and it'll flood their Teams." With that said, I promised her I would let my readers know that they can navigate to "%AppData%\\Microsoft\\Teams\\Backgrounds\\Uploads\\" and delete any that they do not like.
