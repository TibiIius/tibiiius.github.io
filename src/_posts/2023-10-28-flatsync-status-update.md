---
date: 2023-10-28
title: FlatSync Status Update
description: Quick status update on FlatSync's current state.
category: Development
tags:
  - gnome
  - rust
  - gtk
  - flatpak
  - flatsync
---

This post gives a long overdue status update on FlatSync's progress.

## Absence

My last update post dates back quite a bit as I'm currently in the process of writing my bachelor's thesis, and I'm thus a bit more occupied. Furthermore, I was struggling along a lot with FlatSync's latest development. Nevertheless, I wanted to give a quick status update on where we currently stand and what to expect going forward.

## FlatSync

### New Features

In my last update post, I mentioned moving away from polling and listening for changes to Flatpak installations instead, as well as respecting monitored networking settings. Both of these features are now implemented in FlatSync and working properly. 

A basic GUI is also present, though this is currently being reworked and polished.

### Current Work in Progress

Currently, the authentication is being reworked, swapping from GitHub PATs to using a GitHub App (GitHub's flavor of OAuth2). This required **a lot** of work since the original provider implementation was not written by myself, so I had a hard time understanding the implementation details as I had to re-write much of the implementation.

Luckily, after getting help from the original author, we were able to properly port the implementation to a GitHub App, and future OAuth implementations should be way easier to realize now as well.

The CLI part is already done and working, and the UI part is currently being worked on.