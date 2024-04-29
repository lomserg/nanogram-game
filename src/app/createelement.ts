export default class ElementCreator {
  private tag: string;
  private classNames: string | string[];
  private textContent?: string | null; // Making textContent optional
  private callback?: Function | null;
  element: HTMLElement | null = null;
  constructor(
    tag: string,
    classNames: string | string[],
    textContent?: string,
    callback?: Function
  ) {
    this.tag = tag;
    this.classNames = classNames;
    this.textContent = textContent || null;
    this.callback = callback || null;
  }

  createElement() {
    this.element = document.createElement(this.tag);
    this.setCssClasses(this.classNames);
    if (this.textContent) {
      this.setTextContent(this.textContent);
    }
    if (this.callback) {
      this.callback(this.element);
    }
  }

  getElement(): HTMLElement | null {
    this.createElement();
    return this.element;
  }

  setCssClasses(cssClasses: string | string[] = []) {
    if (this.element) {
      if (typeof cssClasses === "string") {
        this.element.classList.add(cssClasses);
      } else {
        cssClasses.forEach((cssClass) => this.element!.classList.add(cssClass));
      }
    }
  }

  setTextContent(text = "") {
    if (this.element) this.element.textContent = text;
  }
}
