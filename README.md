# js-pattern
Tiny javascript library for pattern matching. Inspired by [ts-pattern](https://github.com/gvergnaud/ts-pattern).

## Dependencies
None.

## Usage
The library exposes a single function called `match`. 

Use the `.with` operator to add cases. `.with` receives two parameters:
* condition -> condition for the match, can be literal, an array of literals, a boolean or a lambda
* lambda -> function to run on match

The `.with` operator can be chained endlessly.

Use the `.like` operator for comparing object fields. It can be endlessly chained and combined with the `.with` operator.

```js
import match from 'js-pattern'

const matchResponse = response => match(response)
    .like({status: 200}, () => console.log('OK'))
    .like({status: 400}, () => console.log('Bad arguments'))
    .like({status: 404}, () => console.log('Not found'))
    .otherwise(() => console.log('Unknown error'))
```

Use the `.otherwise` operator to add a default case. It takes a single parameter,
`lambda`, which is the function to be run upon match. Using the `.otherwise` operator will run the matching.

Use the `.execute` to run the actual matching.

```js
import match from 'js-pattern'

const sayHiToMihai = name => match(name)
    .with('Mihai Miuta', () => console.log('Hi, my creator'))
    .with(name === 'Mihai Radulescu', () => console.log('Hi, fellow Nerd Mihai'))
    .with(() => name === 'Other Mihai', () => console.log('Hi, fellow Mihai'))
    .otherwise(() => console.log(`Hi, person who's not Mihai`))
```
