---
title: first
comments: false
---

Get the first DOM element within a set of DOM elements.

# Syntax

```javascript
.first()
.first(options)
```

## Usage

`.first()` requires being chained off another cy command that *yields* a DOM element or set of DOM elements.

**{% fa fa-check-circle green %} Valid Usage**

```javascript
cy.get('nav a').first()     // Yield first link in nav
```

**{% fa fa-exclamation-triangle red %} Invalid Usage**

```javascript
cy.first()                  // Errors, cannot be chained off 'cy'
cy.getCookies().first()     // Errors, 'getCookies' does not yield DOM element
```

## Arguments

**{% fa fa-angle-right %} options**  ***(Object)***

Pass in an options object to change the default behavior of `.first()`.

Option | Default | Notes
--- | --- | ---
`log` | `true` | Whether to display command in Command Log
`timeout` | {% url `defaultCommandTimeout` configuration#Timeouts %} | Total time to retry getting the element

## Yields

`.first()` yields the new DOM element found by the command.

## Timeout

`.first()` will continue to look for the first element for the duration of the {% url `defaultCommandTimeout` configuration#Timeouts %}.

# Examples

## First element

**Get the first list item in a list.**

```html
<ul>
  <li class="one">Knick knack on my thumb</li>
  <li class="two">Knick knack on my shoe</li>
  <li class="three">Knick knack on my knee</li>
  <li class="four">Knick knack on my door</li>
</ul>
```

```javascript
// yields <li class="one">Knick knack on my thumb</li>
cy.get('li').first()
```

# Command Log

**Find the first input in the form**

```javascript
cy.get('form').find('input').first()
```

The commands above will display in the command log as:

![Command Log first](/img/api/commands/first/get-the-first-in-list-of-elements.png)

When clicking on `first` within the command log, the console outputs the following:

![console.log first](/img/api/commands/first/console-log-the-first-element.png)

# See also

- {% url `.last()` last %}