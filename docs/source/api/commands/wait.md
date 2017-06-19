---
title: wait
comments: false
---

Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command.

# Syntax

```javascript
cy.wait(time)
cy.wait(alias)
cy.wait(aliases)
cy.wait(time, options)
cy.wait(alias, options)
cy.wait(aliases, options)
```

## Usage

`cy.wait()` cannot be chained off any other cy commands, so should be chained off of `cy` for clarity.

**{% fa fa-check-circle green %} Valid Usage**

```javascript
cy.wait(500)    
cy.wait('@getProfile')    
```

## Arguments

**{% fa fa-angle-right %} time** ***(Number)***

The amount of time to wait in milliseconds.

**{% fa fa-angle-right %} alias** ***(String)***

An aliased route as defined using the {% url `.as()` as %} command and referenced with the `@` character and the name of the alias.

{% note info %}
{% url 'Read about using aliases here.' aliases %}
{% endnote %}

**{% fa fa-angle-right %} aliases** ***(Array)***

An array of aliased routes as defined using the {% url `.as()` as %} command and referenced with the `@` character and the name of the alias.

**{% fa fa-angle-right %} options** ***(Object)***

Pass in an options object to change the default behavior of `cy.wait()`.

Option | Default | Notes
--- | --- | ---
`log` | `true` | Whether to display command in Command Log
`timeout` | {% url `requestTimeout` configuration#Timeouts %}, {% url `responseTimeout` configuration#Timeouts %} | Override the default requestTimeout and responseTimeout (in ms)

You can also change the `requestTimeout` and `responseTimeout` globally for all `cy.wait()` commands in the {% url 'configuration' configuration %}.

## Yields

When given a `time` argument, `cy.wait()` yields the previous commands yield.

When given an `alias` argument, `cy.wait()` yields the XHR object of the aliased route.

## Timeout

`cy.wait()` will wait for the request the duration of the {% url `requestTimeout` configuration#Timeouts %} and wait for the response for the duration of the {% url `responseTimeout` configuration#Timeouts %} or it will wait for the duration of both the request and response for the `timeout` specified in the command's [options](#options).

# Examples

## Time

In Cypress, you almost never need to use `cy.wait()` for an arbitrary amount of time. If you are finding yourself doing this, there is likely a much better, simpler way.

**Let's imagine the following examples:**

***Unnecessary wait for `cy.request()`***

Waiting here is unnecessary since the {% url `cy.request()` request %} command will not resolve until it receives a response from your server. Adding the wait here only adds 5 seconds after the {% url `cy.request()` request %} has already resolved.

```javascript
cy.request("http://localhost:8080/db/seed")
cy.wait(5000)     // <--- this is unnecessary
```

***Unnecessary wait for `cy.visit()`***

Waiting for this is unnecessary because the {% url '`cy.visit()`' visit %} resolves once the page fires its `load` event. By that time all of your assets have been loaded including javascript, stylesheets, and html.

```javascript
cy.visit("http://localhost/8080")
cy.wait(5000)     // <--- this is unnecessary
```

***Unnecessary wait for `cy.get()`***

Waiting for the {% url `cy.get()` get %} below is unncessary because {% url `cy.get()` get %} automatically retries until the table's `tr` has a length of 2.

Whenever commands have an assertion they will not resolve until their associated assertions pass. This enables you to simply describe the state of your application without having to worry about when it gets there.

```javascript
cy.server()
cy.route("GET", /users/, [{"name": "Maggy"}, {"name": "Joan"}])
cy.get("#fetch").click()
cy.wait(4000)     // <--- this is unnecessary
cy.get("table tr").should("have.length", 2)
```

Alternatively a better solution to this problem is by waiting explicitly for an aliased route.

```javascript
cy.server()
cy.route("GET", /users/, [{"name": "Maggy"}, {"name": "Joan"}]).as("getUsers")
cy.get("#fetch").click()
cy.wait("@getUsers")     // <--- wait explicitly for this route to finish
cy.get("table tr").should("have.length", 2)
```

## Alias

**Wait for a specific XHR to respond**

```javascript
// Wait for the route aliased as 'getAccount' to respond
// without changing or stubbing its response
cy.server()
cy.route('/accounts/*').as('getAccount')
cy.visit('/accounts/123')
cy.wait('@getAccount').then(function(xhr){
  // we can now access the low level xhr
  // that contains the request body,
  // response body, status, etc
})
```

**Wait automatically increments responses**

Each time we use `cy.wait()` for an alias, Cypress waits for the next nth matching request.

```javascript
cy.server()
cy.route('/books', []).as('getBooks')
cy.get('#search').type('Grendel')

// wait for the first response to finish
cy.wait('@getBooks')

// the results should be empty because we
// responded with an empty array first
cy.get('#book-results').should('be.empty')

// now re-define the /books response
cy.route('/books', [{name: 'Emperor of all maladies'}])

cy.get('#search').type('Emperor of')

// now when we wait for 'getBooks' again, Cypress will
// automatically know to wait for the 2nd response
cy.wait('@getBooks')

// we responded with 1 book item so now we should
// have one result
cy.get('#book-results').should('have.length', 1)
```

## Aliases

**You can pass an array of aliases that will be waited on before resolving.**

```javascript
cy.server()
cy.route('users/*').as('getUsers')
cy.route('activities/*').as('getActivities')
cy.route('comments/*').as('getComments')
cy.visit('/dashboard')

cy.wait(['@getUsers', '@getActivities', 'getComments']).then(function(xhrs){
  // xhrs will now be an array of matching XHR's
  // xhrs[0] <-- getUsers
  // xhrs[1] <-- getActivities
  // xhrs[2] <-- getComments
})
```

**Using {% url `.spread()` spread %} to spread the array into multiple arguments.**

```javascript
cy.server()
cy.route('users/*').as('getUsers')
cy.route('activities/*').as('getActivities')
cy.route('comments/*').as('getComments')
cy.wait(['@getUsers', '@getActivities', 'getComments'])
  .spread(function(getUsers, getActivities, getComments){
    // each XHR is now an individual argument
  })
```

# Notes

**requestTimeout and responseTimeout**

When used with an alias, `cy.wait()` goes through two separate "waiting" periods.

The first period waits for a matching request to leave the browser. This duration is configured by {% url `requestTimeout` configuration#Timeouts %} - which has a default of `5000` ms.

This means that when you begin waiting for an aliased XHR, Cypress will wait up to 5 seconds for a matching XHR to be created. If no matching XHR is found, you will get an error message that looks like this:

![Error for no matching XHR](/img/api/commands/wait/error-for-no-matching-route-when-waiting-in-test.png)

Once Cypress detects that a matching XHR has begun its request, it then switches over to the 2nd waiting period. This duration is configured by {% url `responseTimeout` configuration#Timeouts %} - which has a default of `20000` ms.

This means Cypress will now wait up to 20 seconds for the external server to respond to this XHR. If no response is detected, you will get an error message that looks like this:

![Timeout error for XHR wait](/img/api/commands/wait/timeout-error-when-waiting-for-route-response.png)

This gives you the best of both worlds - a fast error feedback loop when requests never go out and a much longer duration for the actual external response.

# Command Log

**Wait for the PUT to users to resolve.**

```javascript
cy.server()
cy.route('PUT', /users/, {}).as('userPut')
cy.get('form').submit()
cy.wait('@userPut').its('url').should('include', 'users')
```

The commands above will display in the command log as:

![Command Log](/img/api/commands/wait/command-log-when-waiting-for-aliased-route.png)

When clicking on `wait` within the command log, the console outputs the following:

![Console Log](/img/api/commands/wait/wait-console-log-displays-all-the-data-of-the-route-request-and-response.png)

# See also

- {% url `.as()` as %}
- {% url `cy.route()` route %}
- {% url `cy.server()` server %}
- {% url `.spread()` spread %}