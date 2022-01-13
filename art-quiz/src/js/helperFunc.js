function addAnimation(pageOne, pageTwo) {
  pageOne.classList.add("pt-page-rotatePushBottom");
  pageTwo.classList.add("pt-page-ontop", "pt-page-current", "pt-page-rotatePushTop");
}
function delAnimation(pageOne, pageTwo) {
  pageOne.classList.remove("pt-page-current");
  pageTwo.classList.remove("pt-page-ontop", "pt-page-rotatePushTop");
  pageOne.classList.remove("pt-page-rotatePushBottom");
}
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
function randomAuthors(min, max, noRepeat, arr) {
  const result = arr[Math.round(Math.random() * (max - min) + min)];
  if (!noRepeat.includes(result)) {
    return result;
  }
  return randomAuthors(min, max, noRepeat, arr);
}
function randomPic(min, max, noRepeat) {
  const result = Math.round(Math.random() * (max - min) + min);
  if (!noRepeat.includes(result)) {
    return result;
  }
  return randomPic(min, max, noRepeat);
}
export { addAnimation, delAnimation, shuffle, randomAuthors, randomPic };
