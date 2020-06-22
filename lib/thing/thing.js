import ThingMovementControl from "./thingMovementControl";
import { isElement, bindCtxForMethods } from "../utils";
import log from "../log";

const defaultOptions = {
  el: null,
  initialX: 0,
  initialY: 0
};

export default class Thing extends ThingMovementControl {
  constructor(userOptions) {
    super();

    this.$initOptions({
      ...defaultOptions,
      ...userOptions
    });

    bindCtxForMethods([
      '$onMousedown', '$onTouchstart'
    ], this);

    if (this.options.el) {
      this.mount(this.options.el);
    }

    this.$setPosition([this.options.initialX, this.options.initialY]);
  }

  mount(el) {
    if (!isElement(el)) {
      log.err('el must be a DOM Element!');
      return;
    }
    this.$setThingElement(el);
    this.$listenEvents();
    this.$addStyles();
    this.$register();
  }

  destroy() {
    this.$unlistenEvents();
    this.thingElement.style.position = null;
    this.thingElement.removeAttribute('data-thing-key');
  }

  on(type, callback) {
    if (typeof callback !== 'function') {
      log.err('callback must be a function!');
      return;
    }
    !this.listeners[type] && (this.listeners[type] = []);
    this.listeners[type].push(callback);
  }

  $unlistenEvents() {
    this.thingElement.removeEventListener('mousedown', this.$onMousedown);
    this.thingElement.removeEventListener('touchstart', this.$onTouchstart);
  }

  $listenEvents() {
    this.thingElement.addEventListener('mousedown', this.$onMousedown);
    this.thingElement.addEventListener('touchstart', this.$onTouchstart);
  }

  $register() {
    this.thingElement.setAttribute('data-thing-key', this.thingKey);
  }

  $addStyles() {
    this.thingElement.style.position = 'absolute';
  }
}
