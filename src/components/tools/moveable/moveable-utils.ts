export enum DirectionType {
  "w",
  "e",
  "n",
  "s",
  "nw",
  "ne",
  "sw",
  "se",
}
export const getDirection = (direction: number[]): DirectionType | null => {
  const directionStr = String(direction);
  switch (directionStr) {
    case "0,-1":
      return DirectionType.n;
    case "-1,0":
      return DirectionType.w;
    case "1,0":
      return DirectionType.e;
    case "0,1":
      return DirectionType.s;
    case "-1,-1":
      return DirectionType.nw;
    case "1,-1":
      return DirectionType.ne;
    case "-1,1":
      return DirectionType.sw;
    case "1,1":
      return DirectionType.se;
    default:
      return null;
  }
};
