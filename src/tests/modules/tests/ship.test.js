import { Ship } from '../ship';

describe('ship', () => {
  let ship;
  beforeEach(() => {
    ship = Ship(3);
  });

  test('initialize ship', () => {
    expect(ship.length).toBe(3);
    expect(ship.hitCount).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  test('should have the correct length', () => {
    expect(ship.getLength()).toBe(3);
  });

  test('should increment hit count when hit', () => {
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  test('should be sunk when hit count equals length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('should not be sunk when hit count is less than length', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
