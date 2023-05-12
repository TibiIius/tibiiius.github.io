---
date: 2023-05-12
category: Development
tags: 
  - gnome
  - gsoc
  - rust
  - gtk
  - flatpak
  - flatsync
---

# Starting Out With GSoC 2023

With GSoC right around the corner, I recently stumbled upon a project running under the GNOME Foundation that piqued my interest.

*~{{ Math.round($page.readingTime.minutes) }} minutes to read ({{ $page.readingTime.words }} words).*

## Getting Interested in GSoC 2023

I have both used and learned from quite a few different FOSS applications and projects in the past, but I never really contributed to one before, which always bugged me. I either never really found the time, lacked the required skill(s), or just didn't find anything that interested me enough to get started. 

However, I then stumbled across [FlatSync](https://gitlab.gnome.org/Cogitri/flatsync), a tool to keep your Flatpaks in sync across reinstalls and/or multiple machines. Switching over from NixOS to Silverblue, I missed declaring all my packages in one module and then having all of them available after a single `nixos-rebuild switch`, especially since I use 2 different machines regularly. Needless to say, I was instantly hooked on the idea and began setting up a dev environment to start working on the project.

## First Contribution to the Project

I reached out to the project's mentor on Matrix and got to work on implementing basic interaction with GitHub's Gist API. After a bit of chatting and mentoring (or getting mentored, I guess), I got my first MR ready and merged.

## Applying to GSoC

After successfully getting involved in the project, I decided upon signing up for GSoC. I had mixed feelings about this, as I only have some basic experience regarding Rust and DBus. 

Fast-forward to today, and I've been accepted into the program. I am both **very** excited as well as grateful to be a part of such a big project, and I'm very much looking forward to engaging in development!

## Start of GSoC

With GSoC's Community Bonding Phase now starting, I'm currently working on setting up required socials and getting into the project again.

### Project Progress

I've reached out to the project's mentor once again and we laid out some issues for the first week to tackle.

For this first week, we mostly did some refactoring work. There was a big MR against `main` open, but it was stale for about a month and had some major merge conflicts with the current state of `main`. As such, we resolved conflicts locally and refactored the code to accurately represent the current project's state. This was mostly unifying structs and other data types, as there have been different variations of essentially the same data models in both branches. Getting the MR merged meant we now had basic daemon-cli-connection via DBus. Furthermore, we now serialize `libflatpak`'s installation information to JSON and push that to GH Gist instead of just the application's name, which should make version management and different remotes way easier to handle in the future. We can also create a basic diff between local and remote already, which should help us later down the road when we actually want to merge together both states.

### Community Bonding

As a GSoC student participating alongside the GNOME Foundation, you are meant to pursue strong community bonding. This means getting on to Planet GNOME, joining GNOME Discourse as well as getting to know the other GSoC projects and its members.

As you can see from this post, I'm currently doing exactly that. I played with the idea of setting up a blog in the past already, and, well, now is definitely a good time to start. :p

I feel both excited and honored to be given the opportunity of such a strong integration into the GNOME community, and I very much look forward to it!

## Future Outlook

I very much look forward to this opportunity and hope that FlatSync as well as all other projects will be having a great and successful time.

I hope to learn a lot about our used software stack (Rust, DBus, GTK) as well as the general development cycle of open-source projects, GNOME projects in particular, and I hope to continue working on this and maybe other projects after GSoC is over!