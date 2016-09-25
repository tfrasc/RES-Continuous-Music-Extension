# RES-Continuous-Music-Extension
*This is currently in early development and non-functional.*
- iFrame's do not allow cross-domain click events, so I'm researching a way to trigger actually playing music players and videos.
- This may be accomplishable through Cross-Origin XMLHttpRequests

## Goal
The Goal of this extension is to simulate a radio-type experience on music subreddits.
Using the wonderful Reddit Enhancement Suite (RES) Chrome extension, this extension will open an RES box, play the music on that page, close the current RES box, and repeat on the next reddit thread. The second possible solution is to open up a new tab with the initial music source url and continue to update that tab as needed.

## Branches
- no_chrome_api: This branch opens up a new tab by grabbing the url from each thread title.
