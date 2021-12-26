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
    let decorDrop = document.querySelectorAll('.decor__img');
    (this.mapTree as HTMLElement).ondragover = (event) => {
      event.preventDefault();
    }
    decorDrop.forEach((decor, index) => {
      if(decor instanceof HTMLImageElement)
      decor.ondragstart = (event) => {
        event.dataTransfer!.setData('dataset', decor.dataset.img!.toString());
        event.dataTransfer!.setData('coordX', event.offsetX.toString());
        event.dataTransfer!.setData('coordY', event.offsetY.toString());
        let coordX =  event.dataTransfer!.getData('coordX');
        let coordY =  event.dataTransfer!.getData('coordY');
        let toy = decorDrop[+index];
        let parentToy = document.getElementById(event.dataTransfer!.getData('dataset'));
        let countToy = parentToy!.querySelector('span');
        this.isDrag = false;
        this.mapTree!.ondrop = (event) => {
          if(toy instanceof HTMLImageElement) {
            toy.style.left = event.pageX - this.treeContainer!.offsetLeft - +coordX + 'px';
            toy.style.top = event.pageY - this.treeContainer!.offsetTop - +coordY + 'px';
            this.mapTree!.append(toy);
            this.isDrag = true;
          }
          countToy!.textContent = parentToy!.getElementsByClassName('decor__img').length.toString();
        }
        document.body.ondragend = () => {
          if(!this.isDrag && toy.parentNode === this.mapTree) {
            if(toy instanceof HTMLImageElement) {
              toy.style.left = 'auto';
              toy.style.top = 'auto';
            }
            parentToy!.append(toy);
          }
          countToy!.textContent = parentToy!.getElementsByClassName('decor__img').length.toString();
        }
      }
    })
  }
}

export const dragDecors = new DragDecors();


