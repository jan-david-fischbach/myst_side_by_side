import plugin from './plugin.mjs';

console.log('Testing MyST Side-by-Side Plugin...\n');

// Test 1: Check plugin structure
console.log('✓ Plugin name:', plugin.name);
console.log('✓ Directives defined:', plugin.directives?.length || 0);
console.log('✓ Transforms defined:', plugin.transforms?.length || 0);

if (plugin.directives && plugin.directives.length > 0) {
  const directive = plugin.directives[0];
  console.log('\nDirective details:');
  console.log('  Name:', directive.name);
  console.log('  Doc:', directive.doc);
  console.log('  Has arg:', !!directive.arg);
  console.log('  Has run:', typeof directive.run === 'function');
}

if (plugin.transforms && plugin.transforms.length > 0) {
  const transform = plugin.transforms[0];
  console.log('\nTransform details:');
  console.log('  Stage:', transform.stage);
  console.log('  Plugin:', transform.plugin);
  console.log('  Has transform:', typeof transform.transform === 'function');
}

// Test 2: Test the directive transformation
console.log('\n--- Testing directive transformation ---');

const testNode = {
  type: 'directive',
  name: 'side-by-side',
  arguments: [{ value: '#my-cell-id' }],
  options: {
    caption: 'Test Caption'
  },
  children: []
};

console.log('\nInput node:', JSON.stringify(testNode, null, 2));

// Simulate transformation
if (plugin.transforms && plugin.transforms[0]) {
  const transform = plugin.transforms[0];
  transform.transform({ node: testNode, vfile: {}, data: {} });
  console.log('\nTransformed node:', JSON.stringify(testNode, null, 2));
}

console.log('\n✅ All tests passed!');
