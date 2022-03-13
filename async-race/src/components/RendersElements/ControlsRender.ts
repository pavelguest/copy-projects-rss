class ControlsRender {
  callback: (event: MouseEvent) => void;
  typeControl: string;
  text: string;
  button: HTMLButtonElement | null;

  constructor(
    typeControl: string,
    text: string,
    callback: (event: MouseEvent) => void
  ) {
    this.callback = callback;
    this.typeControl = typeControl;
    this.text = text;
    this.button = null;
  }

  render() {
    this.button = document.createElement('button');
    this.button.classList.add('buttons');
    this.button.dataset.id = this.typeControl;
    this.button.textContent = this.text;

    this.button.addEventListener('click', this.callback);

    return this.button;
  }
  set disable(flag: boolean) {
    this.button!.disabled = flag;
  }
}

export default ControlsRender;
