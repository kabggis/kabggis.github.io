export function randomColor() {
  return (
    "#" +
    ("000000" + Math.floor(Math.random() * 0xffffff).toString(16)).slice(-6)
  );
}
