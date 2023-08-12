/**
 * Build styles
 */
require("./index.css").toString();

export default class Accordion {
  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg>',
      title: "Accordion",
    };
  }

  static get enableLineBreaks() {
    return true;
  }

  static get DEFAULT_TITLE_PLACEHOLDER() {
    return "Title";
  }

  static get DEFAULT_MESSAGE_PLACEHOLDER() {
    return "Message";
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: "cdx-accordion",
      title: "cdx-accordion__title",
      input: this.api.styles.input,
      message: "cdx-accordion__message",
    };
  }

  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;

    this.titlePlaceholder =
      config.titlePlaceholder || Accordion.DEFAULT_TITLE_PLACEHOLDER;
    this.messagePlaceholder =
      config.messagePlaceholder || Accordion.DEFAULT_MESSAGE_PLACEHOLDER;

    this.data = {
      title: data.title || "",
      message: data.message || "",
    };
  }

  render() {
    const container = this._make("div", [this.CSS.baseClass, this.CSS.wrapper]);
    const title = this._make("div", [this.CSS.input, this.CSS.title], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.title,
    });
    const message = this._make("div", [this.CSS.input, this.CSS.message], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.message,
    });

    title.dataset.placeholder = this.titlePlaceholder;
    message.dataset.placeholder = this.messagePlaceholder;

    container.appendChild(title);
    container.appenChild(message);

    return container;
  }

  save(accordionElement) {
    const title = accordionElement.querySelector(`.${this.CSS.title}`);
    const message = accordionElement.querySelector(`.${this.CSS.message}`);

    return Object.assign(this.data, {
      title: title.innerHTML,
      message: message.innerHTML,
    });
  }

  _make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArrat(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }

  static get sanitize() {
    return {
      title: {},
      message: {},
    };
  }
}
