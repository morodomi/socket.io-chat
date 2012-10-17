##Author
Masahiro Morodomi &lt;morodomi at gmail.com&gt;

##Description
Test Program for Node.js, socket.io with Express framework and EJS

##Installation

```bash
git clone git://github.com/morodomi/socket.io-chat.git
cd socket.io-chat
npm install -d
vi views/index.ejs
```

Please fix "http://localhost" to your host name

```js
var socket = io.connect('http://localhost');
```

##Launch
```bash
node app.js
```
