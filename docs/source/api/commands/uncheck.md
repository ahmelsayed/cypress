---
title: uncheck
comments: false
---

Uncheck checkbox(es).

# Syntax

```javascript
.uncheck()
.uncheck(value)
.uncheck(values)
.uncheck(options)
.uncheck(value, options)
.uncheck(values, options)
```

## Usage

`.uncheck()` requires being chained off another cy command that *yields* a DOM element of type `checkbox`.

**{% fa fa-check-circle green %} Valid Usage**

```javascript
cy.get('[type="checkbox"]').uncheck()   // Unchecks checkbox element
```

**{% fa fa-exclamation-triangle red %} Invalid Usage**

```javascript
cy.uncheck('[type="checkbox"]') // Errors, cannot be chained off 'cy'
cy.get('p:first').uncheck()     // Errors, '.get()' does not yield checkbox
```

## Arguments

**{% fa fa-angle-right %} value**  ***(String)***

Value of checkbox that should be unchecked.

**{% fa fa-angle-right %} values**  ***(Array)***

Values of checkboxes that should be unchecked.

**{% fa fa-angle-right %} options**  ***(Object)***

Pass in an options object to change the default behavior of `.uncheck()`.

Option | Default | Notes
--- | --- | ---
`force` | `false` | Forces check, disables error checking prior to check
`interval` | `16` | Interval which to retry a check
`log` | `true` | Whether to display command in Command Log
`timeout` | {% url `defaultCommandTimeout` configuration#Timeouts %} | Total time to retry the check

# Examples

## Uncheck

**Uncheck all checkboxes**

```javascript
cy.get(':checkbox').uncheck()
```

**Uncheck element with the id 'saveUserName'**

```javascript
cy.get('#saveUserName').uncheck()
```

## Value

**Uncheck the checkbox with the value of 'ga'**

```javascript
cy.get('input[type="checkbox"]').uncheck(['ga'])
```

## Values

**Uncheck the checkboxes with the values 'ga' and 'ca'**

```javascript
cy.get('[type="checkbox"]').uncheck(['ga', 'ca'])
```

# Command Log

**Uncheck the first checkbox**

```javascript
cy
  .get('[data-js="choose-all"]').click()
  .find('input[type="checkbox"]').first().uncheck()
```

The commands above will display in the command log as:

![Command Log](/img/api/commands/uncheck/test-unchecking-a-checkbox.png)

When clicking on `uncheck` within the command log, the console outputs the following:

![Console Log](/img/api/commands/uncheck/console-shows-events-from-clicking-the-checkbox.png)

# See also

- {% url `.check()` check %}
- {% url `.click()` click %}