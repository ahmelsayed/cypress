---
title: closest
comments: false
---

Get the first DOM element that matches the selector (whether it be itself or one of it's ancestors).

# Syntax

```javascript
.closest(selector)
.closest(selector, options)
```

## Usage

`.closest()` requires being chained off another cy command that *yields* a DOM element.

**{% fa fa-check-circle green %} Valid Usage**

```javascript
cy.get('td').closest('.filled') // Yield closest el with class '.filled'
```

**{% fa fa-exclamation-triangle red %} Invalid Usage**

```javascript
cy.closest('.active')  // Errors, cannot be chained off 'cy'
cy.url().closest()     // Errors, 'url' does not yield DOM element
```

## Arguments

**{% fa fa-angle-right %} selector**  ***(String selector)***

A selector used to filter matching DOM elements.

**{% fa fa-angle-right %} options**  ***(Object)***

Pass in an options object to change the default behavior of `.closest()`.

Option | Default | Notes
--- | --- | ---
`log` | `true` | Whether to display command in Command Log
`timeout` | {% url `defaultCommandTimeout` configuration#Timeouts %} | Total time to retry getting the element

## Yields

`.closest()` yields the new DOM elements found by the command.

## Timeout

`.closest()` will continue to look for the closest element for the duration of the {% url `defaultCommandTimeout` configuration#Timeouts %}.

# Examples

## Closest

**Find the closest element of the 'error' with the class 'banner'**

```javascript
cy.get('p.error').closest('.banner')
```

# Command Log

**Find the closest element of 'active li' with the class 'nav'**

```javascript
cy.get('li.active').closest('.nav')
```

The commands above will display in the command log as:

![Command Log closest](/img/api/commands/closest/find-closest-nav-element-in-test.png)

When clicking on the `closest` command within the command log, the console outputs the following:

![console.log closest](/img/api/commands/closest/closest-console-logs-elements-found.png)

# See also

- {% url `.first()` first %}
- {% url `.parent()` parent %}
- {% url `.parents()` parents %}
- {% url `.parentsUntil()` parentsuntil %}
- {% url `.prev()` prev %}
- {% url `.prevAll()` prevall %}
- {% url `.prevUntil()` prevuntil %}