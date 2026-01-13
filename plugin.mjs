/**
 * MyST Side-by-Side Plugin
 * 
 * This plugin adds a directive that transforms notebook cell references
 * into a side-by-side layout showing code on the left and output on the right.
 */

/**
 * The side-by-side directive transformer
 * @param {Object} node - The directive node to transform
 * @param {Object} vfile - The virtual file
 * @param {Object} data - Additional data
 */
function sideBySideDirective(node, vfile, data) {
  // Extract the id from the directive arguments
  const id = node.arguments?.[0]?.value || node.args || '';
  
  // Extract caption from directive body if present
  let caption = '';
  if (node.children && node.children.length > 0) {
    // Find text content in children for caption
    const captionNodes = node.children.filter(child => 
      child.type === 'text' || child.type === 'paragraph'
    );
    if (captionNodes.length > 0) {
      caption = captionNodes.map(n => n.value || '').join('\n');
    }
  }
  
  // Get caption from options if provided
  if (node.options?.caption) {
    caption = node.options.caption;
  }

  // Create the transformed structure
  // Outer figure container
  const outerFigure = {
    type: 'container',
    kind: 'figure',
    children: [
      // Left side - Code with card wrapper
      {
        type: 'container',
        kind: 'figure',
        children: [
          {
            type: 'card',
            children: [
              {
                type: 'embed',
                source: id,
                'remove-output': true,
                'remove-input': false
              }
            ]
          }
        ]
      },
      // Right side - Output
      {
        type: 'container',
        kind: 'figure',
        children: [
          {
            type: 'embed',
            source: id,
            'remove-output': false,
            'remove-input': true
          }
        ]
      }
    ]
  };
  
  // Add caption if present
  if (caption) {
    outerFigure.children.push({
      type: 'caption',
      children: [
        {
          type: 'text',
          value: caption
        }
      ]
    });
  }
  
  // Replace the node with the transformed structure
  Object.assign(node, outerFigure);
}

/**
 * Plugin export
 */
const plugin = {
  name: 'myst-side-by-side',
  directives: [
    {
      name: 'side-by-side',
      doc: 'Display external notebook cells side by side with code on left and output on right',
      arg: {
        type: String,
        doc: 'The reference ID of the notebook cell to embed (e.g., #cell-id)'
      },
      options: {
        caption: {
          type: String,
          doc: 'Caption for the figure'
        }
      },
      body: {
        type: String,
        doc: 'Caption text (alternative to caption option)'
      },
      run(data) {
        return [data];
      }
    }
  ],
  transforms: [
    {
      stage: 'document',
      plugin: 'myst-side-by-side',
      transform({ node, vfile, data }) {
        if (node.type === 'directive' && node.name === 'side-by-side') {
          sideBySideDirective(node, vfile, data);
        }
      }
    }
  ]
};

export default plugin;
