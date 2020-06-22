import TableMovementControl from "./tableMovementControl";
import { bindCtxForMethods, isElement } from "../utils";
import log from '../log';
import Thing from "../thing/thing";

const defaultOptions = {
  el: null
};

export default class Table extends TableMovementControl {
  constructor(userOptions) {
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
  }

  addThing(thing) {
    if (!(thing instanceof Thing)) {
      log.err('addThing can add only Thing instances!');
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

  $unlistenEvents() {
    document.removeEventListener('mouseup', this.$onMouseup);
    this.tableElement.removeEventListener('mousemove', this.$onMousemove);
    document.removeEventListener('touchend', this.$onTouchend);
    this.tableElement.removeEventListener('touchmove', this.$onTouchmove);
  }

  $listenEvents() {
    document.addEventListener('mouseup', this.$onMouseup);
    this.tableElement.addEventListener('mousemove', this.$onMousemove);
    document.addEventListener('touchend', this.$onTouchend);
    this.tableElement.addEventListener('touchmove', this.$onTouchmove);
  }

  $addStyles() {
    this.tableElement.style.position = 'relative';
    this.tableElement.style.userSelect = 'none';
  }
}
