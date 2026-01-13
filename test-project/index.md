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
:::::: {figure}
::::: {figure}
:::{embed} #test-cell-1
:remove-output: true
:remove-input: false
:::
:::::

:::: {figure}
:::{embed} #test-cell-1
:remove-output: false
:remove-input: true
:::
::::

Basic Caption supported
::::::

## Pure `embed`
::::{embed} #test-cell-2
:caption: Figure 1: Calculation showing code and result
::::

## Expected Behavior

The plugin should transform these directives into a layout that shows:
- Left side: The notebook cell code in a card
- Right side: The notebook cell output
- Caption below (if provided)
