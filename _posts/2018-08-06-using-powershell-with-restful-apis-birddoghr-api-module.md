---
categories:
- "Administrator"
- "Microsoft"
date: 2018-08-06
excerpt: In the last few months at work, we have been concentrating on integrating
  different cloud-hosted systems with our on-premise systems. Integration usually
  means using some ETL Tool to interact with an...
tags:
- automation
- birddoghr
- powershell
- restful
title: Using PowerShell with RESTful API's - BirdDogHR API Module
---

In the last few months at work, we have been concentrating on integrating different cloud-hosted systems with our on-premise systems. Integration usually means using some ETL Tool to interact with an API, and either use an API with the on-premise application or dumping directly into a Database.

We decided to start automating our Onboarding Processes. The hurdle came up that the ETL Tool isn't going to trigger Account Creation and other IT related actions. My logical thought was I can interact with an API using PowerShell! I had done this a little bit in the past but nothing significant - so I had a bit of learning to do!

<!--more-->

After jumping into this, I decided it was appropriate to build a PowerShell Module for interacting with the API. Shortly after starting work on the module, I decided this needed to be open-source.

Inside of this PowerShell Module, you find a collection of 7 functions. The most critical one is Get-BirdDogAccessToken. To invoke this function, you need to provide an APIKey, UserName, and Password that has API Access that your BirdDogHR Account Representative can provide you. As an Administrator inside of BirdDog, you cannot create your API Access. Take a look at a snippet of the module below.

> **⚠️ Security Warning**: This example demonstrates credential handling for educational purposes. The conversion of secure strings to plain text should only be done when absolutely necessary for API integration. Always use **Get-Credential** and avoid storing credentials in scripts.
{:.security-warning}

```powershell
function Get-BirdDogAccessToken {
    <#
    .SYNOPSIS
        Get an AccessToken - required for all other API Interactions.
    .EXAMPLE
        PS C:\> Get-BirdDogAccessToken -ApiKey 'AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE' -Credential (Get-Credential)
        By specifying your ApiKey, UserName and Password provided by BirdDog Account Rep you can get an AccessToken to interact with other API Functions
    .OUTPUTS
        Access Token String used with other API Functions
    #>
    [CmdletBinding()]
    param (
        [parameter(Mandatory=$true)]
        [string]$ApiKey,
        [parameter(Mandatory=$true)]
        [PSCredential]$Credential,
        [string]$Version = 'v2',
        [string]$ApiUri = 'https://api.birddoghr.com'
    )

    begin {
        $UserName = $Credential.UserName
        $Password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($Credential.Password))
    }

    process {
        $uri = "$ApiUri/$Version/accesstoken"
        $body = @{
            apiKey = $ApiKey;
            userName = $UserName;
            password = $Password
        }
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $json = $body | ConvertTo-Json
        $token = Invoke-RestMethod -uri $uri -Method POST -ContentType 'application/json' -body $json
    }

    end {
        return $token.token
    }
}
```

You can find the v1.0 release of the BirdDogHR API PowerShell Module on my **[GitHub account](https://github.com/mattgrif)** by **[Clicking Here](https://github.com/mattgrif/BirdDogHR-API-PowerShell-Module/tree/v1.0)**.
