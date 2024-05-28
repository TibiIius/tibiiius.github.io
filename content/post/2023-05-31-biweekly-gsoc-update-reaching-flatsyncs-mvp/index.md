---
date: 2023-05-31
title: "Bi-weekly GSoC Update: Reaching FlatSync's MVP"
description: Latest status update on GSoC for FlatSync.
categories: Development
tags: 
  - gnome
  - gsoc
  - rust
  - gtk
  - flatpak
  - flatsync
---

In this post, I want to sum up the latest events regarding GSoC and FlatSync, and what's been done to reach our project's MVP goal.

## Latest GSoC Updates

We participants were invited to a Contributor Summit where tips and tricks regarding GSoC and open-source involvement were shared. We heard talks from previous contributors, mentors as well as Google employees regarding OSS and its development flow. Alongside many other topics, the importance of communication was highlighted a lot. But other than just keeping up-to-date with our mentors, we were encouraged to also engage in a wider range of communication, so e.g. within the org's community, be that through chats like Matrix rooms, project issues and MRs or blogging. Many other topics were being discussed as well, but this would probably go a little too far for this blog entry.

## FlatSync Development Progress

To reach our MVP goal, we only had one remaining issue left open: autostarting FlatSync's daemon on user login, and adding the ability to toggle this behavior.

### Implementing Autostart Functionality

What sounds easy at first turned out to be quite a bit of a challenge already.

At first, we started by writing a custom `.desktop` file that was meant to install to `$XDG_CONFIG_HOME/autostart` (or just `$HOME/.config/autostart`). After a bit of trial and error, we managed to code a working implementation. But since the actual function to install the autostart file resides inside the daemon executable and is called via D-Bus (so that this code can easily be shared between CLI and GUI later on), we needed a way to automatically start up the daemon when trying to call the D-Bus interface from our CLI. For that, we implemented a D-Bus service, which took quite a bit of trial and error actually, but in the end, we managed to get the (un-)installation of our `.desktop` file implemented and working correctly.

That's what we managed to pull off for a native build, though. We quickly realized that this method does not work within a Flatpak build, and since we're building an app to assist with Flatpaks anyway, we need to make sure this also works properly as a Flatpak. There were two underlying problems with our previous approach:

1. We need permanent rw access to the user's autostart directory which maybe could be avoided.
2. The autostart file that's installed is not a Flatpak-configured one.

Whilst the first point is pretty straightforward, the second may not be. By default, our autostart file has the following content:
```
[Desktop Entry]
Name=FlatSync Daemon
Comment=Start Flatsync Daemon
Type=Application
Exec=flatsync-daemon
Icon=app.drey.FlatSync.Devel
Terminal=false
Categories=GNOME;GTK;
# Translators: Search terms to find this application. Do NOT translate or localize the semicolons! The list MUST also end with a semicolon!
Keywords=Gnome;GTK;
# Translators: Do NOT translate or transliterate this text (this is an icon file name)!
StartupNotify=false
NoDisplay=true
```
The `Exec=flatsync-daemon` line is what's interesting here. As long as `flatsync-daemon` is in our `$PATH` (which should be the case when installing natively), this executes properly. However, since we need to call the `flatsync-daemon` executable that's within our Flatpak sandbox, a file like this won't do us any good. Luckily, Flatpak automatically rewrites all the `.desktop` files to properly wrap the command and saves them to `$XDG_DATA_HOME/flatpak/exports/share/applications` (or `/var/lib/flatpak/exports` for system-wide installations). A properly configured version of the file above would then look like the following:
```
[Desktop Entry]
Name=FlatSync Daemon
Comment=Start Flatsync Daemon
Type=Application
Exec=/usr/bin/flatpak run --branch=master --arch=x86_64 --command=flatsync-daemon app.drey.FlatSync.Devel
Icon=app.drey.FlatSync.Devel
Terminal=false
Categories=GNOME;GTK;
Keywords=Gnome;GTK;
StartupNotify=false
NoDisplay=true
X-Flatpak=app.drey.FlatSync.Devel
```
As we can see, we're now passing `flatsync-daemon` as the command to run inside our application's Flatpak sandbox. Now, the problem here is that all the `.desktop` files within our app are *not* the exported but the default ones! We could hack our way around this, but both my mentor and I were not satisfied with that, so I looked around in search of a different approach. I ended up finding out about Portals. Portals are API methods exposed via D-Bus that are meant to assist with the permissions of sandboxed applications. Furthermore, they expose `org.freedesktop.portal.Background`, which is used to allow applications to reside in the background and also auto-start, so just what we need! Sadly, the Portal API currently doesn't play nice with native apps all the time, so we currently just fall back to our previous approach when running natively. Other than that, with the help of [ashpd](https://github.com/bilelmoussaoui/ashpd/), implementing the required autostart functionality was very easy, here's a code snippet (the `install` bool is used to switch between installation and uninstallation):
```rust
    async fn autostart_file_sanbox(&self, install: bool) -> Result<(), Error> {
        // `dbus_activatable` has to be set to false, otherwise this doesn't work for some reason.
        // I guess this has something to do with the fact that in our D-Bus service file we call `app.drey.FlatSync.Daemon` instead of `app.drey.FlatSync`?
        Background::request()
            .reason("Enable autostart for FlatSync's daemon")
            .auto_start(install)
            .command(&["flatsync-daemon"])
            .dbus_activatable(false)
            .send()
            .await?;

        Ok(())
    }
```
By calling this method, a file with the following contents is created within our autostart directory:
```
[Desktop Entry]
Type=Application
Name=app.drey.FlatSync.Devel
Exec=flatpak run --command=flatsync-daemon app.drey.FlatSync.Devel
X-Flatpak=app.drey.FlatSync.Devel
```
And that's basically all there's to it! We now have proper autostart functionality for both native as well as Flatpak builds.

### Fixing Default Flatpak Permissions

As we previously only tested native implementations, we didn't notice that we were missing some required permission sets within our Flatpak sandbox environment.
We specifically needed the following:
- Enabling communication via our own D-Bus interface
- Getting our installed Flatpak applications
- Communicating via the host's network

All of this was actually pretty easy to fix by extending `finish-args` within our build manifest:

D-Bus communication was enabled by setting `--own-name=app.drey.FlatSync.Daemon`. This tells Flatpak that our app owns this interface and lets us communicate via D-Bus without problems.

By default, only our own application was saved and pushed into our GH Gist file. To fix this issue, the app now has read-only access to the user's as well as the system's Flatpak applications. This was done by setting `--filesystem=xdg-data/flatpak:ro` as well as `--filesystem=/var/lib/flatpak:ro`.

Network communication was simply added by setting `--share=network`.

With all that done, our application now also worked properly within a Flatpak environment!
