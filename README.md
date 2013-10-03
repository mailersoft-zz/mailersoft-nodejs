# mailersoft.com transactional email API for node.js

# Install

### With NPM

```sh
npm install mailersoft
```

### From source

```sh
git clone https://github.com/mailersoft/mailersoft-nodejs.git
cd mailersoft-nodejs
npm install
```

# Usage

```javascript
var mailersoft = require('mailersoft').Mailersoft;

mailersoft
	.setApiKey('c17c54d0763a096d58cd988bcddf7ae6')
	.setVariables({
		welcome: 'John', 
		confirmLink: 'http://...' 
	})
	.setRecipient('sample.email@gmail.com', 'Sample Client')
	.setMail(10690)
	.send();
```