# myst_side_by_side

A MyST markdown plugin that adds a directive to embed external notebook cells in a side-by-side layout, showing code and results in a PDF-friendly format.

## Installation

```bash
npm install myst-side-by-side
```

Or add to your `myst.yml`:

```yaml
project:
  plugins:
    - myst-side-by-side
```

## Usage

Use the `side-by-side` directive to display notebook cells with code on the left (in a card) and output on the right:

```markdown
::::{side-by-side} #my-cell-id
Caption text goes here
::::
```

Or with the caption option:

```markdown
::::{side-by-side} #my-cell-id
:caption: My figure caption
::::
```

## How it works

The directive transforms your input into the following MyST structure:

```markdown
:::::: {figure}

::::: {subfigure}
:::{embed} #my-cell-id
:remove-output: true
:remove-input: false
:::
:::::

::::: {subfigure}
:::{embed} #my-cell-id
:remove-output: false
:remove-input: true
:::
:::::

Caption text
::::::
```

This creates:
- An outer figure container
- Left side: A subfigure containing the code (input only, no output)
- Right side: A subfigure containing the output (output only, no input)
- Optional caption at the bottom

## Development

Build the plugin:

```bash
npm run build
```

Run tests:

```bash
npm test
```

### Testing the Plugin

See [TESTING.md](TESTING.md) for detailed instructions on how to verify the plugin works correctly with a real MyST project.

Quick test:
```bash
npm run build
cd test-project
myst build --all
python3 verify_plugin.py
```

## License

MIT
