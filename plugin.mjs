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
 * Extract cell ID from directive argument data.
 * Handles both string and parsed MyST argument formats.
 * @param {*} rawId - The raw argument data from the directive
 * @returns {string} The extracted cell ID (without leading #)
 */
function extractCellId(rawId) {
  // Handle parsed MyST arguments (array of nodes)
  if (Array.isArray(rawId) && rawId.length > 0 && rawId[0].value) {
    return rawId[0].value;
  }
  
  // Handle string arguments
  if (typeof rawId === 'string') {
    return rawId;
  }
  
  return '';
}

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
        type: 'myst',
        required: true,
        doc: 'The reference ID of the notebook cell to embed (e.g., #cell-id)'
      },
      options: {
        caption: {
          type: 'myst',
          doc: 'Caption for the figure'
        }
      },
      body: {
        type: 'myst',
        doc: 'Caption text (alternative to caption option)'
      },
      run(data) {
        // Extract and normalize the cell ID from directive arguments
        const rawId = data.arg || '';
        const id = normalizeId(extractCellId(rawId));
        
        // Extract caption from directive body if present
        let captionNodes = [];
        if (data.body && data.body.length > 0) {
          captionNodes = data.body;
        }
        
        // Get caption from options if provided (takes precedence)
        if (data.options?.caption) {
          captionNodes = data.options.caption;
        }

        // Create two side-by-side embed directives
        const result = [
          // Left side - Code only
          {
            type: 'embed',
            label: `embed-${id}-code`,
            source: id,
            'remove-output': true,
            'remove-input': false,
            children: []
          },
          // Right side - Output only
          {
            type: 'embed',
            label: `embed-${id}-output`,
            source: id,
            'remove-output': false,
            'remove-input': true,
            children: []
          }
        ];
        
        // Add caption as a separate paragraph if present
        // Note: Ideally this would be in a container, but MyST directive
        // run() methods return flat arrays of nodes
        if (captionNodes.length > 0) {
          result.push({
            type: 'paragraph',
            children: captionNodes
          });
        }
        
        return result;
      }
    }
  ]
};

export default plugin;
