---
export:
  - format: pdf
    template: lapreprint-typst
    output: paper.pdf
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

## Example 3: Complex GDSFactory input
::::{side-by-side} #geometry-polygon
:caption: Figure 2: GDSFactory polygon geometry
::::

## Structure that is generated under the hood
:::::: {figure}
::::: {figure}
::::{card}
:::{embed} #geometry-polygon
:remove-output: true
:remove-input: false
:::
::::
:::::

:::: {figure}
:::{embed} #geometry-polygon
:remove-output: false
:remove-input: true
:::
::::

Basic Caption supported
::::::

## Pure `embed`
::::{embed} #test-cell-2
::::

## Expected Behavior

The plugin should transform these directives into a layout that shows:
- Left side: The notebook cell code in a card
- Right side: The notebook cell output
- Caption below (if provided)
