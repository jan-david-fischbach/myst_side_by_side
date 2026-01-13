# Side-by-Side Directive Example

This example demonstrates how to use the `side-by-side` directive to display notebook cells.

## Basic Usage

::::{side-by-side} #my-notebook-cell
This shows the code on the left and output on the right
::::

## With Caption Option

::::{side-by-side} #another-cell
:caption: Figure 1: Example of side-by-side cell display
::::

## Expected Output Structure

The above directives will be transformed into figure containers with embedded cells:
- Left side: Code in a card
- Right side: Output
- Caption below both
