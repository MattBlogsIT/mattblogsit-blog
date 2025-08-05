---
categories:
- Out of Band
date: 2012-11-09
excerpt: As I promised I would blog about the additional backup procedures I planned
  on putting in place after the outage I had last time. I still have more things I'd
  like to implement but have not had the...
tags:
- backups
- scripting
- tumblr
title: Backups are Important! Here is How I do it!
---

As I promised I would blog about the additional backup procedures I planned on putting in place after the outage I had last time. I still have more things I'd like to implement but have not had the time in the evening to do the custom development work.

1. Cron jobs that backup to the local file system
2. A WordPress Plugin that backups on a schedule to my Drop Box (WordPress Backup to Dropbox)
3. A Tumblr! I have setup a Tumblr and found a WordPress Plugin that automatically post everything I write to my Tumblr (Social Networks Auto-Poster)

If you would like to know a bit more detail on my backup stuff please continue reading below.<!--more-->

# Local Backups using Cron

This was the backup procedure I had in place prior to the VPS failure, this is fantastic backup solution if you are mainly worried about a plugin update breaking something; which has happened in the past and I had to restore from my backups. This backup procedure requires 3 scripts, technically I could combine them but I prefer to keep it all separate.

## Script 1 -  Database Backup

This script I wrote myself with some help from googling commands here and there. There are a couple of variables to modify but it is quite simple.

>  
> 
> #!/bin/sh # Backup Database Script using cron # By: Matt Griffin # Date: 07-28-2012 # ------------------------------------------------------------------------------
> 
> #Current Date NOW=$(date +"%F")
> 
> #Update with Database info DB="db\_name" DBUSER="db\_user" DBPASS="db\_password" DBHOST="hostname"
> 
> #Where to save the backup to, make sure the cron user has access to this folder BACKUPLOC="/opt/backups/mysql/$DB-$NOW.sql.gz"
> 
> #Environment variables MYSQLDUMP="/usr/bin/mysqldump" GZIP="/bin/gzip"
> 
> $MYSQLDUMP -u $DBUSER -p$DBPASS $DB | $GZIP -v9 > $BACKUPLOC

## Script 2 - HTML Backup

This script I was also able to write on my own by searching a couple of commands.

>  #!/bin/sh # Backup Webroot script used for Cron # By: Matt Griffin # Date: 07-28-2012 # ------------------------------------------------------------------------------
> 
> #Current Date NOW=$(date +"%F")
> 
> #File Locations HTMLROOT="/webroot/file/location" BACKUPLOC="/backup/location/file(site)name-$NOW.tar.gz"
> 
> #Environment Variables GZIP="/bin/gzip" TAR="/bin/tar"
> 
> $TAR -zcvf $BACKUPLOC $HTMLROOT

## Monthly Cleanup

Luckily enough I was able to find this already written by [AKN of Amit k nepal](http://www.amitnepal.com). No matter how much we increase the size of Hard Drives we never can keep infinite backups, it's a simple reality and so I've also included a cleanup script to remove dated files. If you would like to view the script you can find it [**HERE**](http://www.amitnepal.com/shell-script-to-delete-files-and-folders-older-than-x-days/).

# WordPress Backup to Dropbox

This was the easiest one to implement, all you need to do is install this plugin to your WordPress, do a small amount of configuring and you are on your way to have scheduled backups completed of WordPress. You can find this plugin by clicking [**HERE**](http://wordpress.org/extend/plugins/wordpress-backup-to-dropbox/).

# Backup Tumblr Blog

This is my all time favorite backup mechanism, I had never used Tumblr until someone mentioned to me that Kotaku was using Tumblr since their datacenter was down because of Sandy; I have to say it is very crafty and easy to implement solution. The best part is that not only is this backing up my blog posts, it is also providing me another outlet to bring traffic to my blog. Plus if my VPS ever goes down again for an extended time all I need to do is route my main domain to my tumblr domain which I setup as [tumblr.mattblogsit.com](http://tumblr.mattblogsit.com).

1. Create an account at [Tumblr](http://www.tumblr.com).
2. Install [NextScripts: Social Networks Auto-Poster](http://wordpress.org/extend/plugins/social-networks-auto-poster-facebook-twitter-g/) on your WordPress Blog.
3. Activate the new plugin.
4. Under the WordPress Dashboard Settings click {SNAP} Social Networks Auto Poster.
5. Click Add New Account
6. Select Tumblr
7. Most of this is self-explanatory except for the Tumblr OAuth Consumer Key and Tumblr Secret Key.
8. Please follow the instructions at [Tumblr: Setup/Installation](http://www.nextscripts.com/setup-installation-tumblr-social-networks-auto-poster-wordpress/)

Once all configuration is done you will be live to go with 3 backup methods. I still plan on writing a PowerShell Script that will use WinSCP DLL's to download my backups from my server directly to my desktop so I can maintain historical backups at a remote location.