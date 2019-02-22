```html
<!DOCTYPE HTML>
<html>
  <head>
    <script type="text/javascript" src="embedded-router.js"></script>
  </head>
  <body>
    <viewer>
      <view href="#/" src="home.html" default></view>
      <view href="#/page1" src="page1.html"></view>
      <view href="#/page2" src="page2.html"></view>
      <view not-found src="404.html"></view>
      <while-loading>
        Loading page...
      </while-loading>
    </viewer>
  </body>
</html>
```
