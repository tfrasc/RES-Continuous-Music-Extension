# Radio Reddit Chrome Extension
*This is currently in development*
- Originally, the goal of this extension was to build on top of the Reddit Enhancement Suite (RES), opening and closing each RES iFrame as the songs started and ended. Unfortunately, the iFrame's provided by RES don't allow Cross-Origin events to allow me to trigger starting the music player/video. Through a bit of trial, error, and research this project evolved into a dynamic music player that automatically cycles through the links on a music subreddit, independent of RES.

## Goal
The goal of this extension is to simulate a radio-type streaming experience on music subreddits. Just click play on the extension pop-up in Chrome's menu bar and let the music play! You can even pause, play, and move forward/backward through songs on any Chrome tab :)

## Branches
- release_v1.0: This branch has finalized Soundcloud play through. ~~All controls work correctly, but the background media doesn't play when a new iFrame is loaded unless you're on the tab that it's loaded on.~~ After even more research I found a workaround for this setting in Chrome (see the Usage section for instructions). The extension now works as planned and is ready for release after adding art and fixing styling!  :)
- soundcloud_api: This branch now loads Soundcloud links through their api and detects an end event when the music is over (however they don't cycle to the next video yet). Youtube videos play, however they don't currently have an end event (you have to manually click next).
- iframe_no_api: This branch opens up each link in an iframe that plays on the subreddit page itself. This is currently only compatible with youtube videos as those can simply use a different link to play in iframes. However, this will allow to use the youtube iframe api and souncloud player widget that will allow detecting end of song, therefore allowing easy navigation to next link.
- message_api: This branch opens up a new tab by grabbing the url from each thread title. Some controls have been implemented through the extension's popup icon.  
- no_chrome_api: This branch opens up a new tab by grabbing the url from each thread title.
