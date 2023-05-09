import Frontend from '../src/app'

test('Can construct frontend', () => {
  const frontend = new Frontend()
  expect(frontend).toBeDefined();
  expect(frontend.inbox).toBeDefined();
});