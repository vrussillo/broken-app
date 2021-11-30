### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
callbacks, promises, and async/await.

- What is a Promise?
A promise is the resulting value of an async operation.

- What are the differences between an async function and a regular function?
a regular function is synchronous, it evaluates at once an async function is asynchronous which can be evaluated out of sync or be performed when specified.

- What is the difference between Node.js and Express.js?
Node.js is a runtime environment like venv is to flask. It can run code locally as a server opposed to running a server on the web. Express.js is a frame work like Flask is to python. It can help manage GET and POST routes amongst other helpful features to help communicate with our server side web app.

- What is the error-first callback pattern?
is a function that has a dedicated error response to handle inaccuracies at the beginning of the function. The function will also handle accurate responses to run the function successfully.

- What is middleware?
Middleware can be implemented as custom software outside the scope of what is provided automatically through the operating system

- What does the `next` function do?
The next function can be used as a 3rd arguement for a function. It is a self defined parameter that can executed.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
The promises will run one after the other and don't need to be stored as variables to execute. 

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```


