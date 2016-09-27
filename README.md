# Reddit-Continuous-Music-Extension
*This is currently in early development*
- iFrame's do not allow cross-domain click events, so I'm researching a way to trigger actually playing music players and videos.
- This may be accomplishable through Cross-Origin XMLHttpRequests

## Goal
The Goal of this extension is to simulate a radio-type experience on music subreddits.
Ideally, this extension will open the first music player/video on the subreddit, play the music on that page, close the current tab, and repeat on the next reddit thread. There may also be opportunity to develop an extension on top of the Reddit Enhancement Suite, however this method currently runs into the issue that's presented with iFrames.

## Branches
- iframe_no_api: This branch opens up each link in an iframe that plays on the subreddit page itself. This is currently only compatible with youtube videos as those can simply use a different link to play in iframes. However, this will allow to use the youtube iframe api and souncloud player widget that will allow detecting end of song, therefore allowing easy navigation to next link.
- message_api: This branch opens up a new tab by grabbing the url from each thread title. Some controls have been implemented through the extension's popup icon.  
- no_chrome_api: This branch opens up a new tab by grabbing the url from each thread title.
