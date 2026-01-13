#!/usr/bin/env python3
"""
Simple script to verify the side-by-side plugin is working correctly.
Checks the built JSON output to ensure embed nodes are created properly.
"""

import json
import sys

# Default JSON file to check
DEFAULT_JSON_FILE = '_build/site/content/index.json'

def check_plugin_output(json_file):
    """Check that the plugin generated the expected embed nodes."""
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    def find_embeds(node):
        embeds = []
        if isinstance(node, dict):
            if node.get('type') == 'embed':
                embeds.append(node)
            for value in node.values():
                embeds.extend(find_embeds(value))
        elif isinstance(node, list):
            for item in node:
                embeds.extend(find_embeds(item))
        return embeds
    
    embeds = find_embeds(data)
    
    print("=" * 60)
    print("MyST Side-by-Side Plugin Verification")
    print("=" * 60)
    print()
    
    if not embeds:
        print("❌ FAIL: No embed nodes found!")
        return False
    
    print(f"✅ Found {len(embeds)} embed nodes")
    print()
    
    # Check that we have pairs of embeds (code + output)
    sources = {}
    for embed in embeds:
        source = embed.get('source')
        if source not in sources:
            sources[source] = []
        sources[source].append(embed)
    
    print("Embed pairs by source:")
    all_valid = True
    for source, nodes in sources.items():
        print(f"\n  Source: {source}")
        if len(nodes) != 2:
            print(f"    ❌ Expected 2 nodes (code + output), found {len(nodes)}")
            all_valid = False
        else:
            print(f"    ✅ Found pair of nodes")
            
        for node in nodes:
            has_label = 'label' in node and node['label']
            remove_output = node.get('remove-output', False)
            remove_input = node.get('remove-input', False)
            
            node_type = "code" if not remove_input else "output"
            status = "✅" if has_label else "❌"
            
            print(f"      {status} {node_type.upper()}: label={node.get('label')}, "
                  f"remove-output={remove_output}, remove-input={remove_input}")
            
            if not has_label:
                all_valid = False
    
    print()
    print("=" * 60)
    if all_valid:
        print("✅ Plugin is working correctly!")
        print("The side-by-side directive successfully creates embed node pairs")
        print("with proper labels and output/input removal flags.")
    else:
        print("⚠️  Plugin has some issues (see above)")
    print("=" * 60)
    
    return all_valid

if __name__ == '__main__':
    json_file = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_JSON_FILE
    success = check_plugin_output(json_file)
    sys.exit(0 if success else 1)
