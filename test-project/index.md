---
export:
  - format: pdf
    template: lapreprint-typst
    output: paper.pdf
abstract: Dummy Abstract
authors: 
    - name: Jan David Fischbach
      orcid: 0009-0003-8765-8920
      affiliation: 
        - name: Institute for Nanotechnology, Karlsruhe Institute of Technology
          url: https://kit.edu
      github: jan-david-fischbach
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

## Example 4: Custom Label
::::{side-by-side} #geometry-polygon
:caption: Figure 2: GDSFactory polygon geometry
:label: fig-custom
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


## Expected Behavior

The plugin should transform these directives into a layout that shows:
- Left side: The notebook cell code in a card
- Right side: The notebook cell output
- Caption below (if provided)

Further it let's you refer to the figure using standard MyST referencing syntax (see [](#fig-geometry-polygon)). You can also refer to the subfigures with `-code` and `-output` suffixes (see [](#fig-geometry-polygon-code) and [](#fig-geometry-polygon-output)).

The same holds for custom labels (see [](#fig-custom)). You can also refer to the subfigures with `-code` and `-output` suffixes (see [](#fig-custom-code) and [](#fig-custom-output)).
