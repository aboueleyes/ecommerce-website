# Ecommerce

## References 
**Add your reference here**


- [VSCode](https://code.visualstudio.com/) The Editor That we will be using
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) vscode plugin to format the code 
- [Basic React + Typescript tutorial](https://www.youtube.com/watch?v=Z5iWr6Srsj8&ab_channel=BenAwad)
- [Material-UI](https://material-ui.com/components/buttons/) 
- [State hoisting](https://reactjs.org/docs/lifting-state-up.html) 
- [Basic authentication](https://dev.to/eidorianavi/authentication-and-jwt-in-node-js-4i13) 

### Code Formatter

- Add a `.vscode` directory
- Create a file `settings.json` inside `.vscode`
- Install Prettier - Code formatter in VSCode
- Add the following snippet:  

```json

    {
      "editor.formatOnSave": true,
      "prettier.singleQuote": true,
      "prettier.arrowParens": "avoid",
      "prettier.jsxSingleQuote": true,
      "prettier.trailingComma": "none",
      "javascript.preferences.quoteStyle": "single",
    }

```

## Tools

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)

## **For setting up project:**

## Initial steps:

### Node

[Download Node](https://nodejs.org/en/download/)  

### Database

[Download MongoDB](https://www.mongodb.com/try/download/community?tck=docs_server)  
[Install Mongo](https://docs.mongodb.com/manual/administration/install-community/)
- To create a database follow [this tut](https://streamable.com/ql4ee6)

Each one of us will use a different local DataBase, we will host a shared DB online later

## Project Structure
```
.
├── app.js              <- Start the website
├── bin
│   └── www
├── LICENSE
├── package.json
├── public              <- Static files
│   ├── images
│   │   ├── background1.jpg
│   │   ├── books.png
│   │   ├── boxing.jpg
│   │   └── ...
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── README.md
├── routes             
│   ├── index.js
│   └── users.js
└── views               <- templates for the web pages 
    ├── books.ejs
    ├── login.ejs
    ├── registration.ejs
    ├── searchresults.ejs
    └── ... 
```
