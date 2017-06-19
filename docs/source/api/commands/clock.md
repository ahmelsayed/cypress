---
title: clock
comments: false
---

`cy.clock()` overrides native global functions related to time allowing them to be controlled synchronously via {% url `cy.tick()` tick %} or the yielded `clock` object. This includes controlling:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date` Objects

The clock starts at the unix epoch (timestamp of 0). This means that when you instantiate `new Date` in your application, it will have a time of `January 1st, 1970`.

# Syntax

```javascript
cy.clock()
cy.clock(now)
cy.clock(now, functionNames)
cy.clock(options)
cy.clock(now, options)
cy.clock(now, functionNames, options)
```

## Usage

`cy.clock()` cannot be chained off any other cy commands, so should be chained off of `cy` for clarity.

**{% fa fa-check-circle green %} Valid Usage**

```javascript
cy.clock()
```

## Arguments

**{% fa fa-angle-right %} now** ***(Date)***

A timestamp specifying where the clock should start.

**{% fa fa-angle-right %} functionNames** ***(Array)***

Name of native functions that clock should override.

**{% fa fa-angle-right %} options** ***(Object)***

Pass in an options object to change the default behavior of `cy.clock()`.

Option | Default | Notes
--- | --- | ---
`log` | `true` | Whether to display command in Command Log

## Yields

`cy.clock()` yields a `clock` object with the following methods:

- **`clock.tick(milliseconds)`**

  Move the clock the specified number of `milliseconds`. Any timers within the affected range of time will be called.

- **`clock.restore()`**

  Restore all overridden native functions. This is automatically called between tests, so should not generally be needed.

You can also access the `clock` object via `this.clock` in a {% url `.then()` then %} callback.

## Timeout

# Examples

## Clock

**Create a clock and use it to trigger a setInterval**

```javascript
// your app code
var seconds = 0

setInterval(function(){
  $('#seconds-elapsed').text(++seconds + ' seconds')
}, 1000)
```

```javascript
cy.clock()
cy.visit('/index.html')
cy.tick(1000)
cy.get('#seconds-elapsed').should('have.text', '1 seconds')
cy.tick(1000)
cy.get('#seconds-elapsed').should('have.text', '2 seconds')
```

**Access the clock object to synchronously move time**

In most cases, it's easier to use {% url `cy.tick()` tick %} to move time, but you can also use the `clock` object yielded by `cy.clock()`.

```javascript
cy.clock().then(function (clock) {
  clock.tick(1000)
})
```

You can call `cy.clock()` again for this purpose later in a chain if necessary.

```javascript
cy.clock()
cy.get('input').type('Jane Lane')
cy.clock().then(function (clock) {
  clock.tick(1000)
})
```

The clock object is also available via `this.clock` in any {% url `.then()` then %} callback.

```javascript
cy.clock()
cy.get('form').then(function ($form) {
  this.clock.tick(1000)
  // do something with $form ...
})
```

**Access the clock object to restore native functions**

In general, it should not be necessary to manually restore the native functions that `cy.clock()` overrides since this is done automatically between tests. But if you need to, the `clock` object yield has a `.restore()` method.

```javascript
cy.clock().then(function (clock) {
  clock.restore()
})
```

Or via `this.clock`:

```javascript
cy.clock()
cy.get('.timer').then(function ($timer) {
  this.clock.restore()
  // do something with $timer ...
})
```

## Now

**Specify a now timestamp**

```javascript
// your app code
$('#date').text(new Date().toJSON())
```

```javascript
const now = new Date(2017, 2, 14).getTime() // March 14, 2017 timestamp

cy.clock(now)
cy.visit('/index.html')
cy.get('#date').contains('2017-03-14')
```

## Function Names

**Specify which functions to override**

This example below will only override `setTimeout` and `clearTimeout` and leave the other time-related functions as they are.

```javascript
cy.clock(null, ['setTimeout', 'clearTimeout'])
```

**Using cy.clock() and cy.tick()**

{% note info %}
{% url 'Check out our example recipe testing spying, stubbing and time.' https://github.com/cypress-io/cypress-example-recipes/blob/master/cypress/integration/spy_stub_clock_spec.js%}
{% endnote %}

# Notes

**iframes not supported**

Note that `cy.clock()` only applies to the `top` window on a web page. It will not override the time functions of any `iframe` embedded on the page.

**clock behavior before `cy.visit()`**

If you call `cy.clock()` before visiting a page with {% url `cy.visit()` visit %}, the page's native global functions will be overridden on window load, before any of your app code runs, so even if `setTimeout`, for example, is called on page load, it can still be controlled via {% url `cy.tick()` tick %}. This also applies if, during the course of a test, the page under test is reloaded or changed.

# Command Log

**Create a clock and tick it 1 second**

```javascript
cy.clock()
cy.tick(1000)
```

The command above will display in the command log as:

![Command Log clock](/img/api/commands/clock/clock-displays-in-command-log.png)

When clicking on the `clock` command within the command log, the console outputs the following:

![console.log clock command](/img/api/commands/clock/clock-displays-methods-replaced-in-console.png)

# See also

- {% url 'Guide: Stubs, Spies and Clocks' stubs-spies-clocks %}
- {% url `cy.spy()` spy %}
- {% url `cy.stub()` stub %}
- {% url 'Recipe: Controlling Behavior with Spies, Stubs, and Clocks' https://github.com/cypress-io/cypress-example-recipes %}
- {% url `cy.tick()` tick %}