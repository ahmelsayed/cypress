---
title: then
comments: false
---

Yield the previously yielded subject as the first argument of a function.

# Syntax

```javascript
.then(callbackFn)
.then(options, callbackFn)
```

## Usage

`.then()` should be chained off another cy command.

**{% fa fa-check-circle green %} Valid Usage**

```javascript
cy.get('.nav').then(function(nav) {})  // Yields .nav as first arg
cy.location().then(function(loc) {})   // Yields location object as first arg
```

## Arguments

**{% fa fa-angle-right %} callbackFn** ***(Function)***

Pass a function that takes the previously yielded subject as it's first argument.

**{% fa fa-angle-right %} options** ***(Object)***

Pass in an options object to change the default behavior of `.then()`.

Option | Default | Notes
--- | --- | ---
`timeout` | {% url `defaultCommandTimeout` configuration#Timeouts %} | Total time to yield the then

## Yields

`.then()` is modeled identically to the way Promises work in JavaScript.  Whatever is returned from the callback function becomes the new subject and will flow into the next command (with the exception of `null` and `undefined`).

When `null` or `undefined` are returned by the callback function, the subject will not be modified and will instead carry over to the next command.

Just like Promises, you can return any compatible "thenable" (anything that has a `.then()` interface) and Cypress will wait for that to resolve before continuing forward through the chain of commands.

## Timeout

`.then()` will retry for the duration of the {% url `defaultCommandTimeout` configuration#Timeouts %} or the duration of the `timeout` specified in the command's [options](#options).

# Examples

## Work with DOM element

**The element `input` is yielded**

```javascript
cy.get('form').find('input').then(function($input){
  // work with $input here
})
```

## Change subject

**The subject is changed by returning**

```javascript
cy.then(function(){
  return {id: 123}
}).then(function(obj){
  // subject is now the obj {id: 123}
  obj.id === 123 // true
})
```

**Returning `null` or `undefined` will not modify the yielded subject**

```javascript
cy
  .get('form').then(function($form){
    console.log('form is:', $form)
    // undefined is returned here, but $form will be
    // yielded to allow for continued chaining
  }).find('input').then(function($input){
    // we have our $input element here since
    // our form element was yielded and we called
    // .find('input') on it
  })
```

## Promises

**Cypress waits for the Promise to resolve before continuing**

***Example using Q***

```javascript
cy.get('button').click().then(function($button){
  var p = Q.defer()

  setTimeout(function(){
    p.resolve()
  }, 5000)

  return p.promise
})
```

***Example using bluebird***

```javascript
cy.get('button').click().then(function($button){
  return Promise.delay(5000)
})
```

***Example using jQuery deferred's***

```javascript
cy.get('button').click().then(function($button){
  var df = $.Deferred()

  setTimeout(function(){
    df.resolve()
  }, 5000)

  return df
})
```

# Notes

{% partial then_should_difference %}

# Command Log

**`cy.then()` does *not* log in the command log**

# See also

- {% url `.and()` and %}
- {% url `.each()` each %}
- {% url `.invoke()` invoke %}
- {% url 'Chains of Commands' cypress-in-a-nutshell#Chains-of-Commands %}
- {% url `.its()` its %}
- {% url `.should()` should %}
- {% url `.spread()` spread %}