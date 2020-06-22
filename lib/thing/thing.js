import ThingMovementControl from "./thingMovementControl";
import { isElement, bindCtxForMethods, getSize as getSizeUtil } from "../utils";
import log from "../log";

const defaultOptions = {
  el: null,
  initialX: null,
  initialY: null
};

export default class Thing extends ThingMovementControl {
  constructor(userOptions = {}) {
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

    if (this.options.initialX != null || this.options.initialY != null) {
      this.$setPosition([this.options.initialX, this.options.initialY]);
    }
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

  getPosition() {
    return this.position;
  }

  getSize() {
    return getSizeUtil(this.thingElement);
  }

  getSpeed() {
    return [
      this.speedX.get(), 
      this.speedY.get()
    ];
  }

  getDOM() {
    return this.thingElement;
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
