//create main iframe player
function load() {
  var iframe = document.createElement('iframe');
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.right = "0";
  iframe.style.zIndex = "100";
  iframe.style.float = "right";
  iframe.id = "RCMiFrame";
  document.body.appendChild(iframe);

  //add iframe css dynamically to page
  var css = '#RCMiFrame {top:0;width:350px;height:200px;left:0;position:fixed;z-index:100;}',
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  }
  else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}
