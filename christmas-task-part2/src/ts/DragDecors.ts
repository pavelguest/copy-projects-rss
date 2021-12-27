class DragDecors {
  zone1: NodeListOf<Element>;

  mapTree: HTMLElement | null;

  areaTree: HTMLElement | null;

  treeContainer: HTMLElement | null;

  isDrag: boolean;

  constructor() {
    this.zone1 = document.querySelectorAll('.decor__img-container');
    this.mapTree = document.querySelector('.tree-container map');
    this.areaTree = document.querySelector('.tree-container map area');
    this.treeContainer = document.querySelector('.tree-container');
    this.isDrag = false;
  }

  addListener() {
    const decorDrop = document.querySelectorAll('.decor__img');
    (this.mapTree as HTMLElement).ondragover = (event) => {
      event.preventDefault();
    };
    decorDrop.forEach((decor, index) => {
      if (decor instanceof HTMLImageElement)
        decor.ondragstart = (event) => {
          if (event.dataTransfer instanceof DataTransfer) {
            event.dataTransfer.setData('dataset', (decor.dataset.img as string).toString());
            event.dataTransfer.setData('coordX', event.offsetX.toString());
            event.dataTransfer.setData('coordY', event.offsetY.toString());
          }
          const coordX =  (event.dataTransfer as DataTransfer).getData('coordX');
          const coordY =  (event.dataTransfer as DataTransfer).getData('coordY');
          const toy = decorDrop[+index];
          const parentToy = document.getElementById((event.dataTransfer as DataTransfer).getData('dataset'));
          const countToy = (parentToy as HTMLElement).querySelector('span') as HTMLSpanElement;
          this.isDrag = false;
          (this.mapTree as HTMLElement).ondrop = (e) => {
            if (toy instanceof HTMLImageElement && this.treeContainer && this.mapTree) {
              toy.style.left = ((e.pageX - this.treeContainer.offsetLeft - +coordX) * 100) / this.treeContainer.offsetWidth + '%';
              toy.style.top = ((e.pageY - this.treeContainer.offsetTop - +coordY) * 100) / this.treeContainer.offsetHeight + '%';
              this.mapTree.append(toy);
              this.isDrag = true;
            }
            countToy.textContent = (parentToy as HTMLElement).getElementsByClassName('decor__img').length.toString();
          };
          document.body.ondragend = () => {
            if (!this.isDrag && toy.parentNode === this.mapTree) {
              if (toy instanceof HTMLImageElement) {
                toy.style.left = 'auto';
                toy.style.top = 'auto';
              }
              (parentToy as HTMLElement).append(toy);
            }
            countToy.textContent = (parentToy as HTMLElement).getElementsByClassName('decor__img').length.toString();
          };
        };
    });
  }
}

export const dragDecors = new DragDecors();


