// test-simple.js
test('simple test to check jest setup', () => {
    expect(true).toBe(true);
  });
  
  test('firebase mock works', () => {
    const firebase = require('firebase/app');
    expect(firebase.initializeApp()).toBeDefined();
  });