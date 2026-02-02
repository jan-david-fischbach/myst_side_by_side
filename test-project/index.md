---
exports:
  - format: pdf
---

# Testing Side-by-Side Plugin

This is a test document to demonstrate the `side-by-side` directive with embedded notebook cells.

## Example 1: Basic Side-by-Side

::::{side-by-side} #test-cell-1
Basic example showing code and output side by side
::::

## Example 2: With Caption Option

::::{side-by-side} #test-cell-2
:caption: Figure 1: Calculation showing code and result
::::


## Structure that is generated under the hood

The plugin transforms the `side-by-side` directive into nested containers. Conceptually, it generates:
- An outer `figure` container
- Two `subfigure` containers (one for code, one for output)
- Each subfigure contains an `embed` node with appropriate filters
- Caption at the outer figure level

## Pure `embed`
::::{embed} #test-cell-2
:caption: Figure 1: Calculation showing code and result
::::

## Expected Behavior

The plugin should transform these directives into a layout that shows:
- Left side: The notebook cell code
- Right side: The notebook cell output
- Caption below (if provided)
