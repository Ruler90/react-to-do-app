// can't use isDown variable because it becomes const after import/export
export const click = {
  mousedown: false
};

export function dragScroll () {
  const main = document.querySelector('main');
  let startX;
  let scrollLeft;

  main.addEventListener('mousedown', function (e) {
    // added if statement for dragScroll to fire not tasks, lists, etc. 
    if (e.target.classList.contains('mainContainer') || e.target === main) {
      click.mousedown = true;
      startX = e.pageX - main.offsetLeft;
      scrollLeft = main.scrollLeft;
      // user-select: none for FF, because it was selecting all text during dragScroll
      main.setAttribute('style', 'cursor: grabbing; user-select: none');
    }
  });

  main.addEventListener('mouseleave', function () {
    click.mousedown = false;
  });

  main.addEventListener('mouseup', function () {
    click.mousedown = false;
    main.removeAttribute('style');
  });

  main.addEventListener('mousemove', function (e) {
    if (!click.mousedown) return;
    // Drag&Drop fn won't work with e.preventDefault()
    // e.preventDefault();
    const x = e.pageX - main.offsetLeft;
    const walk = (x - startX) * 2;
    main.scrollLeft = scrollLeft - walk;
  });
}
