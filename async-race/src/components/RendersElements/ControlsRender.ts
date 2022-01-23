class ControlsRender {
  callback: (event: MouseEvent) => void;
  typeControl: string;
  text: string;

  constructor(
    typeControl: string,
    text: string,
    callback: (event: MouseEvent) => void
  ) {
    this.callback = callback;
    this.typeControl = typeControl;
    this.text = text;
  }

  render() {
    const btn: HTMLButtonElement = document.createElement('button');
    btn.classList.add('buttons');
    btn.id = this.typeControl;
    btn.textContent = this.text;

    btn.addEventListener('click', this.callback);

    return btn;
  }
}

export default ControlsRender;
