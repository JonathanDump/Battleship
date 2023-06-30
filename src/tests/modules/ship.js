export function Ship(length) {
  return {
    hitCount: 0,
    sunk: false,
    getLength() {
      return length;
    },
    hit() {
      this.hitCount += 1;
    },
    isSunk() {
      this.sunk = this.getLength() === this.hitCount ? true : false;
    },
  };
}
