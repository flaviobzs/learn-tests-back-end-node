test('Devo conhecer as principais assertivas do jest', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Devo conhecer as principais assertivas do jest', () => {
  const obj = { name: 'Flavio', mail: 'john@mail.com' };
  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('name', 'Flavio');
  expect(obj.name).toBe('Flavio');

  const obj2 = { name: 'Flavio', mail: 'john@mail.com' };

  expect(obj).toEqual(obj2);
  expect(obj).toBe(obj);
});
