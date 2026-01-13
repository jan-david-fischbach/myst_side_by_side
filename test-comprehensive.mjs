import plugin from './plugin.mjs';

console.log('Running comprehensive tests for MyST Side-by-Side Plugin...\n');

let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    testsPassed++;
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  Error: ${error.message}`);
    testsFailed++;
  }
}

function assertEquals(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\n  Expected: ${JSON.stringify(expected)}\n  Actual: ${JSON.stringify(actual)}`);
  }
}

// Test 1: Plugin structure
test('Plugin has correct name', () => {
  assertEquals(plugin.name, 'myst-side-by-side', 'Plugin name should be myst-side-by-side');
});

test('Plugin has one directive', () => {
  assertEquals(plugin.directives.length, 1, 'Should have exactly one directive');
});

test('Directive is named side-by-side', () => {
  assertEquals(plugin.directives[0].name, 'side-by-side', 'Directive name should be side-by-side');
});

test('Plugin has one transform', () => {
  assertEquals(plugin.transforms.length, 1, 'Should have exactly one transform');
});

// Test 2: Transformation with caption in options
test('Transform with caption in options', () => {
  const node = {
    type: 'directive',
    name: 'side-by-side',
    arguments: [{ value: '#cell-123' }],
    options: { caption: 'Test Caption' },
    children: []
  };
  
  plugin.transforms[0].transform({ node, vfile: {}, data: {} });
  
  assertEquals(node.type, 'container', 'Node type should be container');
  assertEquals(node.kind, 'figure', 'Node kind should be figure');
  assertEquals(node.children.length, 3, 'Should have 3 children (left figure, right figure, caption)');
  
  // Check left side (code)
  const leftSide = node.children[0];
  assertEquals(leftSide.type, 'container', 'Left side should be container');
  assertEquals(leftSide.kind, 'figure', 'Left side should be figure');
  assertEquals(leftSide.children[0].type, 'card', 'Left side should have card');
  
  const leftEmbed = leftSide.children[0].children[0];
  assertEquals(leftEmbed.type, 'embed', 'Should have embed');
  assertEquals(leftEmbed.source, '#cell-123', 'Embed source should be #cell-123');
  assertEquals(leftEmbed['remove-output'], true, 'Should remove output on left');
  assertEquals(leftEmbed['remove-input'], false, 'Should keep input on left');
  
  // Check right side (output)
  const rightSide = node.children[1];
  assertEquals(rightSide.type, 'container', 'Right side should be container');
  assertEquals(rightSide.kind, 'figure', 'Right side should be figure');
  
  const rightEmbed = rightSide.children[0];
  assertEquals(rightEmbed.type, 'embed', 'Should have embed');
  assertEquals(rightEmbed.source, '#cell-123', 'Embed source should be #cell-123');
  assertEquals(rightEmbed['remove-output'], false, 'Should keep output on right');
  assertEquals(rightEmbed['remove-input'], true, 'Should remove input on right');
  
  // Check caption
  const caption = node.children[2];
  assertEquals(caption.type, 'caption', 'Should have caption');
  assertEquals(caption.children[0].value, 'Test Caption', 'Caption should have correct text');
});

// Test 3: Transformation without caption
test('Transform without caption', () => {
  const node = {
    type: 'directive',
    name: 'side-by-side',
    arguments: [{ value: '#another-cell' }],
    options: {},
    children: []
  };
  
  plugin.transforms[0].transform({ node, vfile: {}, data: {} });
  
  // Should have 2 children (left and right figures only, no caption)
  assertEquals(node.children.length, 2, 'Should have 2 children without caption');
});

// Test 4: Different ID formats
test('Transform with different ID format', () => {
  const node = {
    type: 'directive',
    name: 'side-by-side',
    arguments: [{ value: 'my-notebook-cell' }],
    options: {},
    children: []
  };
  
  plugin.transforms[0].transform({ node, vfile: {}, data: {} });
  
  const leftEmbed = node.children[0].children[0].children[0];
  assertEquals(leftEmbed.source, 'my-notebook-cell', 'Should handle ID without #');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests passed: ${testsPassed}`);
console.log(`Tests failed: ${testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✅ All tests passed!');
} else {
  console.log('\n❌ Some tests failed!');
  process.exit(1);
}
