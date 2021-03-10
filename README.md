# Theme.jS

## setup 

Download this repositry

```index.html
<link rel="stylesheet" href="./main.css">
<script src="./theme.js"></script>
<script>
  // use simple
  var theme = new theme()

  // add theme
  var theme2 = new theme(['default', 'theme2'])
</script>
```

```main.css
:root[theme="light"] {
  --bgcolor: #f8f9fa;
  --textcolor: #343a40;
}
:root[theme="dark"] {
  --bgcolor: #343a40;
  --textcolor: #f8f9fa;
}
:root[theme="theme2"] {
  --bgcolor: #00b1ae;
  --textcolor: #495057;
}

body {
  background-color: var(--bgcolor);
  color: var(--textcolor);
}
```

## please see demo

[demo URL](https://TakuyaKinoshita.github.io/JS_DarkMode/docs/index.html)

## LICENSE

This software is released under the MIT License, see LICENSE.txt.
