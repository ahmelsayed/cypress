---
title: location
comments: false
---

Get the remote `window.location` as an object.

# Syntax

```javascript
cy.location()
cy.location(key)
cy.location(options)
cy.location(key, options)
```

## Usage

`cy.location()` cannot be chained off any other cy commands, so should be chained off of `cy` for clarity.

**{% fa fa-check-circle green %} Valid Usage**

```javascript
cy.location()       // Get location object
```

## Arguments

**{% fa fa-angle-right %} key** ***(String)***

A key on the location object.

**{% fa fa-angle-right %} options** ***(Object)***

Pass in an options object to change the default behavior of `cy.location()`.

Option | Default | Notes
--- | --- | ---
`log` | `true` | Whether to display command in Command Log

## Yields

`cy.location()` yields the location object with the following properties:

- `hash`
- `host`
- `hostname`
- `href`
- `origin`
- `pathname`
- `port`
- `protocol`
- `search`
- `toString`

## Timeout

# Examples

## Location Properties

**Make assertions about every location property**

```javascript
cy.visit('http://localhost:8000/app/index.html?q=dan#/users/123/edit')

cy.location().should(function(location) {
  expect(location.hash).to.eq('#/users/123/edit')
  expect(location.host).to.eq('localhost:8000')
  expect(location.hostname).to.eq('localhost')
  expect(location.href).to.eq('http://localhost:8000/app/index.html?q=dan#/users/123/edit')
  expect(location.origin).to.eq('http://localhost:8000')
  expect(location.pathname).to.eq('/app.index.html')
  expect(location.port).to.eq('8000')
  expect(location.protocol).to.eq('http:')
  expect(location.search).to.eq('?q=dan')
  expect(location.toString()).to.eq('http://localhost:8000/app/index.html?q=brian#/users/123/edit')
})
```

**Check location for query params and pathname**

We can yield the location object within a {% url `.should()` should %} command and work with it directly.

```javascript
cy.get('#search').type('niklas{enter}')
cy.location().should(function(location){
  expect(location.search).to.eq('?search=niklas')
  expect(location.pathname).to.eq('/users')
})
```

## Key

**Assert that a redirect works**

```javascript
cy.visit('http://localhost:3000/admin')
cy.location('pathname').should('eq', '/login')
```

# Notes

**No need to use `window.location`**

Cypress automatically normalizes the `cy.location()` command and strips out extraneous values and properties found in `window.location`. Also, the object literal yielded by `cy.location()` is just a basic object literal, not the special `window.location` object.

When changing properties on the real `window.location` object, it forces the browser to navigate away. In Cypress, the object yielded is a plain object, so changing its properties will have no effect on navigation.

***Console output of `window.location`***

```javascript
cy.window().then(function(window){
  console.log(window.location)
})
```

![Console.log of window.location](/img/api/commands/location/window-location-object-printed-in-console-log.png)

***Console output of `.location()`***

```javascript
cy.location().then(function(location){
  console.log(location)
})
```

![Console Log of Cypress location command](/img/api/commands/location/special-cypress-location-object-logged-in-console-output.png)

# Command Log

**Assert on the location's href**

```javascript
cy.location().should(function(location){
  expect(location.href).to.include('commands/querying')
})
```

The commands above will display in the command log as:

![Command Log](/img/api/commands/location/make-assertion-about-location-url-in-tests.png)

When clicking on `location` within the command log, the console outputs the following:

![Console Log](/img/api/commands/location/location-object-in-console-log.png)

# See also

- {% url `cy.hash()` hash %}
- {% url `cy.url()` url %}
- {% url `cy.window()` window %}