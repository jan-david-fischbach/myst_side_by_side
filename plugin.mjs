/**
 * MyST Side-by-Side Plugin
 * 
 * This plugin adds a directive that transforms notebook cell references
 * into a side-by-side layout showing code on the left and output on the right.
 */

/**
 * Plugin export
 */

/**
 * Remove leading # from cell ID if present.
 * @param {string} id - Cell ID that might have a leading #
 * @returns {string} Cell ID without leading #
 */
function normalizeId(id) {
  return id.startsWith('#') ? id.substring(1) : id;
}

const plugin = {
  name: 'myst-side-by-side',
  directives: [
    {
      name: 'side-by-side',
      doc: 'Display external notebook cells side by side with code on left and output on right',
      arg: {
        type: String,
        required: true,
        doc: 'The reference ID of the notebook cell to embed (e.g., #cell-id)'
      },
      options: {
        caption: {
          type: 'myst',
          doc: 'Caption for the figure'
        },
        label: {
          type: String,
          doc: 'label to reference the figure later'
        }
      },
      body: {
        type: 'myst',
        doc: 'Caption text (alternative to caption option)'
      },
      run(data) {
        // Extract and normalize the cell ID from directive arguments
        const rawId = data.arg || '';
        let id = normalizeId(rawId);
        
        // Extract caption from directive body if present
        let captionNodes = [];
        if (data.body && data.body.length > 0) {
          captionNodes = data.body;
        }
        
        // Get caption from options if provided (takes precedence)
        if (data.options?.caption) {
          captionNodes = data.options.caption;
        }
        
        console.log(data.options?.label)
        const label = data.options?.label ?? "fig-".concat(id)

        // Create the nested container structure matching the reference:
        // Outer figure container with two nested figure subcontainers
        // According to MyST embed transform code, embed nodes need source.label
        const outerChildren = [
          // Left side - Code only in a figure container
          {
            type: 'container',
            kind: 'figure',
            subcontainer: true,
            label: label.concat("-code"),
            children: [
              {
                type: 'card',
                children: [
                  {
                    type: 'embed',
                    source: {
                      label: id
                    },
                    'remove-output': true,
                    'remove-input': false,
                    children: []
                  }
                ]
              }
            ]
          },
          // Right side - Output only in a figure container
          {
            type: 'container',
            kind: 'figure',
            subcontainer: true,
            label: label.concat("-output"),
            children: [
              {
                type: 'embed',
                source: {
                  label: id
                },
                'remove-output': false,
                'remove-input': true,
                children: []
              }
            ]
          }
        ];
        
        // Add caption if present
        if (captionNodes.length > 0) {
          outerChildren.push({
            type: 'caption',
            children: captionNodes
          });
        }
        
        // Return the outer figure container
        return [
          {
            type: 'container',
            kind: 'figure',
            label: label,
            identifier: label,
            children: outerChildren
          }
        ];
      }
    }
  ]
};

export default plugin;
