---
title: parentsUntil
comments: false
---

Get all ancestors of each DOM element in a set of matched DOM elements up to, but not including, the element provided.

# Syntax

```javascript
.parentsUntil(selector)
.parentsUntil(selector, filter)
.parentsUntil(selector, filter, options)
.parentsUntil(element)
.parentsUntil(element, filter)
.parentsUntil(element, filter, options)
```

## Usage

`.parentsUntil()` requires being chained off another cy command that *yields* a DOM element or set of DOM elements.

**{% fa fa-check-circle green %} Valid Usage**

```javascript
cy.get('p').parentsUntil('.article') // Yield parents of 'p' until '.article'
```

**{% fa fa-exclamation-triangle red %} Invalid Usage**

```javascript
cy.parentsUntil()                  // Errors, cannot be chained off 'cy'
cy.location().parentsUntil('href') // Errors, 'location' does not yield DOM element
```

## Arguments

**{% fa fa-angle-right %} selector**  ***(String selector)***

The selector where you want finding parent ancestors to stop.

**{% fa fa-angle-right %} element**  ***(DOM node, jQuery Object)***

The element where you want finding parent ancestors to stop.

**{% fa fa-angle-right %} filter**  ***(String selector)***

A selector used to filter matching DOM elements.

**{% fa fa-angle-right %} options**  ***(Object)***

Pass in an options object to change the default behavior of `.parentsUntil()`.

Option | Default | Notes
--- | --- | ---
`log` | `true` | Whether to display command in Command Log
`timeout` | {% url `defaultCommandTimeout` configuration#Timeouts %} | Total time to retry getting the element(s)

## Yields

`.parentsUntil()` yields the new DOM element(s) found by the command.

## Timeout

`.parentsUntil()` will continue to look for the parent element(s) for the duration of the {% url `defaultCommandTimeout` configuration#Timeouts %}.

# Examples

## Selector

**Find all of the `.active` element's ancestors until `.nav`**

```html
<ul class="nav">
  <li>
    <a href="#">Clothes</a>
    <ul class="menu">
      <li>
        <a href="/shirts">Shirts</a>
      </li>
      <li class="active">
        <a href="/pants">Pants</a>
      </li>
    </ul>
  </li>
</ul>
```

```javascript
// yields [ul.menu, li]
cy.get('.active').parentsUntil('.nav')
```

# Command Log

**Find all of the `active` element's ancestors until `.nav`**

```javascript
cy.get('.active').parentsUntil('.nav')
```

The commands above will display in the command log as:

![Command Log parentsUntil](/img/api/commands/parentsuntil/get-all-parents-until-nav-selector.png)

When clicking on `parentsUntil` within the command log, the console outputs the following:

![Console Log parentsUntil](/img/api/commands/parentsuntil/show-parents-until-nav-in-console.png)

# See also

- {% url `.parent()` parent %}
- {% url `.parents()` parents %}
- {% url `.prevUntil()` prevuntil %}
- {% url `.nextUntil()` nextuntil %}