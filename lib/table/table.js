import TableMovementControl from "./tableMovementControl";
import { bindCtxForMethods, isElement, getSize as getSizeUtil } from "../utils";
import log from '../log';
import Thing from "../thing/thing";

const defaultOptions = {
  el: null,
  thingsAutoDetect: false
};

export default class Table extends TableMovementControl {
  constructor(userOptions = {}) {
    super();

    this.$initOptions({
      ...defaultOptions,
      ...userOptions
    });

    bindCtxForMethods([
      '$onMouseup', '$onMousemove',
      '$onTouchend', '$onTouchmove'
    ], this);

    if (this.options.el) {
      this.mount(this.options.el);
    }
  }

  mount(el) {
    if (!isElement(el)) {
      log.err('el must be a DOM Element!');
      return;
    }
    this.$setTableElement(el);
    this.$listenEvents();
    this.$addStyles();

    if (this.options.thingsAutoDetect) {
      Array.from(this.tableElement.childNodes).filter(x => x.nodeType !== 3).forEach(x => {
        this.$registerThing(new Thing({
          el: x
        }));
      })
    }
  }

  addThing(thing) {
    if (this.options.thingsAutoDetect) {
      log.err('Cannot add things manually when use thingsAutoDetect!');
      return;
    }
    if (!(thing instanceof Thing)) {
      log.err('addThing() can add only Thing instances!');
      return;
    }
    this.$registerThing(thing);
  }

  destroy() {
    this.$unlistenEvents();
    this.thingElement.style.position = null;
    this.tableElement.style.userSelect = null;
  }

  on(type, callback) {
    if (typeof callback !== 'function') {
      log.err('callback must be a function!');
      return;
    }
    !this.listeners[type] && (this.listeners[type] = []);
    this.listeners[type].push(callback);
  }

  getDOM() {
    return this.tableElement;
  }

  getSize() {
    return getSizeUtil(this.tableElement);
  }

  getThings() {
    return Object.keys(this.registeredThings).map(x => this.registeredThings[x]);
  }

  getActiveThings() {
    return this.activeThings.forEach(x => this.registeredThings[x]);
  }

  $unlistenEvents() {
    document.removeEventListener('mouseup', this.$onMouseup);
    document.removeEventListener('mousemove', this.$onMousemove);
    document.removeEventListener('touchend', this.$onTouchend);
    this.tableElement.removeEventListener('touchmove', this.$onTouchmove);
  }

  $listenEvents() {
    document.addEventListener('mouseup', this.$onMouseup);
    document.addEventListener('mousemove', this.$onMousemove);
    document.addEventListener('touchend', this.$onTouchend);
    this.tableElement.addEventListener('touchmove', this.$onTouchmove);
  }

  $addStyles() {
    this.tableElement.style.position = 'relative';
    this.tableElement.style.userSelect = 'none';
  }
}
