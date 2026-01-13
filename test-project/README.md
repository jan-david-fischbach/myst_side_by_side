# MyST Side-by-Side Plugin Test Project

This directory contains a test project to verify that the `myst-side-by-side` plugin works correctly.

## Project Structure

- `myst.yml` - MyST configuration file that loads the plugin
- `notebook.ipynb` - Sample Jupyter notebook with test cells
- `index.md` - Markdown file demonstrating the `side-by-side` directive
- `verify_plugin.py` - Script to verify the plugin output

## How to Test the Plugin

### 1. Build the Plugin

From the repository root:

```bash
npm run build
```

This creates `dist/index.mjs` which is referenced in `myst.yml`.

### 2. Build the MyST Project

```bash
cd test-project
myst build --all
```

This will:
- Load the plugin (you should see: `🔌 myst-side-by-side ... loaded: 1 directive`)
- Parse the markdown and notebook files
- Transform the `side-by-side` directives into embed node pairs
- Output the build to `_build/site/content/`

### 3. Verify the Plugin Output

```bash
python3 verify_plugin.py
```

This script checks that:
- Embed nodes were created with proper labels
- Each directive creates a pair of embeds (code + output)
- The `remove-output` and `remove-input` flags are set correctly

Expected output:
```
✅ Plugin is working correctly!
The side-by-side directive successfully creates embed node pairs
with proper labels and output/input removal flags.
```

## Plugin Usage

The `side-by-side` directive embeds notebook cells with code on the left and output on the right:

### Basic Usage

```markdown
::::{side-by-side} #cell-id
Optional caption text
::::
```

### With Caption Option

```markdown
::::{side-by-side} #cell-id
:caption: Figure 1: Description
::::
```

## How It Works

The plugin transforms each `side-by-side` directive into two embed nodes:

1. **Left side (code)**: `embed` node with `remove-output: true, remove-input: false`
2. **Right side (output)**: `embed` node with `remove-output: false, remove-input: true`

These embed nodes reference notebook cells by their ID and filter the content appropriately.

## Limitations

- The MyST server (`myst start`) requires internet access to download templates from `api.mystmd.org`
- In offline environments, you can still verify the plugin works by checking the build output
- The plugin creates the correct AST nodes, which MyST will render properly when the full environment is available
