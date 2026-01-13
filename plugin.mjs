/**
 * MyST Side-by-Side Plugin
 * 
 * This plugin adds a directive that transforms notebook cell references
 * into a side-by-side layout showing code on the left and output on the right.
 */

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
        // Extract the id from the directive arguments  
        const rawId = data.arg || '';
        let id = Array.isArray(rawId) && rawId.length > 0 && rawId[0].value 
          ? rawId[0].value 
          : (typeof rawId === 'string' ? rawId : '');
        
        // Remove leading # if present (embed source should be without #)
        if (id.startsWith('#')) {
          id = id.substring(1);
        }
        
        // Extract caption from directive body if present
        let captionNodes = [];
        if (data.body && data.body.length > 0) {
          captionNodes = data.body;
        }
        
        // Get caption from options if provided
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
        
        // Add caption if present
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
