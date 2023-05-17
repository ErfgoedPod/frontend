import Frontend from '../src/frontend'

test('Can construct frontend', () => {
  const frontend = new Frontend()
  expect(frontend).toBeDefined();
  expect(frontend.inbox).toBeDefined();
});