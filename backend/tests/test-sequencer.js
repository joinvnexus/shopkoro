const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    // Run unit tests first, then integration tests
    const unitTests = tests.filter(test => !test.path.includes('/integration/'));
    const integrationTests = tests.filter(test => test.path.includes('/integration/'));
    
    return [...unitTests, ...integrationTests];
  }
}

module.exports = CustomSequencer;
