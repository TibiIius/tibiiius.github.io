---
date: 2023-06-26
title: "(Almost) Bi-weekly GSoC Update: FlatSync GSettings Integration"
description: Integrating GSettings into FlatSync for GSoC 2023.
category: Development
tags: 
  - gnome
  - gsoc
  - rust
  - gtk
  - flatpak
  - flatsync
---

This post is going to cover the latest progress on FlatSync as well as my absence from bi-weekly updates and the project.

## Absence From Blog and Project

Normally, I'd write bi-weekly blog post updates regarding GSoC and FlatSync, but both my mentor and I have been very busy with university work in this month's first week, and after that, I've been ill and bed-ridden for a little over a week. As a result, development stagnated in this period, so there was just nothing to write about. I'm somewhat back on my feet though, so you can expect regular updates again.

## Progress on FlatSync

We were thrown behind quite a bit on schedule, but luckily, the still-open, expired milestone we wanted to catch up on turned out to be less work than originally planned, and we were able to fulfill it quite easily.

### GSettings Integration

Initially, we used the OS's keyring to not only store our GitHub Gist API key but also the Gist ID as an attribute attached to the secret, as this was the most straightforward solution. However, referencing the ID later on in the project was a bit messy and involved hard-to-understand code and copy&paste (not to mention that this felt a bit like an abuse for the keyring). We planned to, later on, provide more customization to the user, like whether or not to only push changes automatically and pull them in manually, whether or not to split installed Flatpak packages into hosts or to unify them into one list, and maybe even more in the future. To accomplish our goals, we settled on implementing GSettings into our project for our configuration values. We initially planned a lot of time for this milestone as we didn't know how many configuration variables we had to provide at this stage, and how we would implement storing configuration variables. Luckily, using GSettings was very straightforward, also thanks to my mentor's previous experience regarding GSettings.

We now changed over to using GSettings to save our Gist ID, and we added the possibility to initialize FlatSync with a pre-defined Gist ID. That way, if you delete the secret and/or the Gist ID, you can re-initialize FlatSync without it creating a new Gist. This will be especially useful later on when installing FlatSync on a new or freshly installed device.

## Outro

This about wraps up the current status of the project. 

Next up, we are looking into actually synchronizing the list instead of only pushing it into the Gist. This means comparing the installed packages in the Gist to the ones installed on the device, and adding and/or removing packages when needed. This will need some thought, as we want to avoid (un-)installing packages by mistake (e.g. you remove some package on device 1, boot up device 2 which posts a list of all installed packages into the Gist, including the previously removed one, and it ends up getting reinstalled on device 1 where it should have been removed from device 2 in the first place).