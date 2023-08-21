---
date: 2023-08-01
title: "GUADEC 2023 Recap and FlatSync Update"
description: Recap of GUADEC 2023 in Riga, Latvia, and an update on FlatSync.
category: Development
tags: 
  - gnome
  - gsoc
  - rust
  - gtk
  - flatpak
  - flatsync
---

This post will cover my experiences at GUADEC 2023 in Riga, Latvia, and will also give a status update on FlatSync's latest progress.

![Sponsored by GNOME](./assets/sponsored-by-foundation.png)

## GUADEC 2023

Due to my GSoC internship, I was given the opportunity to attend GUADEC 2023 in Riga, Latvia. First of all, I am very grateful for giving me this possibility and want to give my sincere thanks.

GUADEC 2023 allowed me first and foremost connect with other members of the GNOME and FOSS community. It was very nice meeting everyone and having the opportunity to exchange opinions and thoughts, as well as getting to know the people behind their online persona. 

I've attended GUADEC alongside my GSoC Mentor, [Cogitri](https://cogitri.dev/), and we did manage a lot of progress on our GSoC project, FlatSync, but more on that later.

I do want to encourage all of you to check out the talks if you haven't done so already, the live streams are all up on [YouTube](https://youtube.com/playlist?list=PLcb5uDX8FIoCXfTI9t2a47WUDoPG7sIMD), basically all of them have timestamps if you're only interested in a couple of talks. Personally, my highlight was the [GNOME Design](https://www.youtube.com/live/WVWrllJQJ_s?feature=share&t=15491) talk, and more specifically the [window management part](https://www.youtube.com/live/WVWrllJQJ_s?feature=share&t=17320). I'm very interested in how the mixture of tiling and floating modes will come out in the end, and the improvements to edge tiling look very nice as well (imo. Windows currently has the edge over GNOME on this, and these changes look to be very promising in overcoming this gap). Furthermore, I like the idea of putting maximized windows onto a new Workspace a lot, as this is what I'm currently doing manually most of the time anyway. Also, at the end of GUADEC, we had GNOME intern lightning talks, you can check those out [here](https://www.youtube.com/live/hv-bkYpHSbQ?feature=share&t=22594). I also got a few responses regarding FlatSync, and so far the feedback has been positive, so I'm glad others are looking forward to FlatSync's release and growth as well! : )

Lastly, if I piqued your interest in the GUADEC, next year will be in Denver, Colorado, though if the US is a bit too far for you, there will also be a "mini-GUADEC" in Berlin, Germany.

## FlatSync

My last FlatSync dates back quite a while, this is mainly due to me and my mentor being stuck fighting a nasty limitation with manipulating Flatpak installations from within a Flatpak sandbox (which is where the FlatSync daemon lives in). Basically, this is currently not possible without workarounds. Luckily though, there's been a discussion around this [here](https://github.com/flatpak/flatpak/issues/4046), and we were able to use some of the workarounds from the [Souk project](https://gitlab.gnome.org/haecker-felix/souk/-/tree/souk-next?ref_type=heads) for use with FlatSync. We were thus able to continue development and installing FlatSync's daemon as a Flatpak as well. Otherwise, we'd have had to require users to either install all sub-parts of the project (CLI, GUI, daemon) or the daemon exclusively natively to the system instead of getting it bundled as a Flatpak.

### Current State

Currently, FlatSync is now able to differentiate between local and remote states and to properly diff and prioritize between the two by using timestamps indicating when the installation list was last changed.

If the remote state differs from the local state and is newer, missing applications are installed on the target systems (same goes for remotes), and locally installed applications no longer residing within the remote are respectively uninstalled.

There's also been a lot of work behind the scenes, cleaning up the codebase and preparing it for easy adaptation of additional API providers.

Though the progress is summed up pretty easily, it's a rather big milestone for the project. The daemon's (very) basic functionality is now complete, and you can test the project already if you're interested (and not intimidated by CLI), though please be aware that it's still very much in early development and not stable or ready for everyday use at all.

### Next Steps

As for the next steps, we want to move from polling for local changes to using libflatpak's monitoring capabilities and listen for local changes that way. Furthermore, we plan on respecting monitored networking, thus holding back remote synchronization until the user is connected to a non-metered connection again.

Furthermore, we plan on getting a basic GUI ready to accompany the CLI for the setup and configuration of the daemon.

### The Long Run

We do have some issues open on the project page, both within and after GSoC's timespan, and we also got some inspiration for extended functionality, most notably from [Flatseal's](https://github.com/tchx84/Flatseal) maintainer to also synchronize Flatpak overrides.

Other than that, we plan on making the synchronization process more verbose and interactive (e.g. pausing synchronization, only respecting user- or system-wide installations, splitting between hostnames).
