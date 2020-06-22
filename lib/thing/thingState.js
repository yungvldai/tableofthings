import { getSize, unique } from "../utils";
import Speed from '../speed';

export default class ThingState {
  constructor() {
    this.clickPosition = [0, 0];
    this.position = [0, 0];
    this.thingElement = null;
    this.thingKey = unique();
    this.pushNotifier = null;
    this.options = null;
    this.listeners = {
      'dragstart': [],
      'dragend': []
    };
    this.tableRef = null;
    this.speedX = new Speed();
    this.speedY = new Speed();
  }

  $setTableRef(table) {
    this.tableRef = table;
  }

  $setClickPosition(position) {
    this.clickPosition = position;
  }

  $initOptions(options) {
    this.options = options;
  }

  $setThingElement(el) {
    this.thingElement = el;
  }

  $eventPayload() {
    return {
      thingRef: {
        ...this,
        size: getSize(this.thingElement)
      },
      tableRef: {
        ...this.tableRef,
        size: getSize(this.tableRef.tableElement)
      }
    };
  }

  $addPushNotifier(callback) {
    this.pushNotifier = (...args) => {
      this.speedX.reset();
      this.speedY.reset();
      callback(...args);
      this.$callListeners('dragstart', {
        type: 'dragstart',
        ...this.$eventPayload()
      });
    }
  }

  $pullNotify() {
    this.speedX.reset();
    this.speedY.reset();
    this.$callListeners('dragend', {
      type: 'dragstart',
      ...this.$eventPayload()
    });
  }

  $setPosition(coords) {
    this.speedX.update(coords[0]);
    this.speedY.update(coords[1]);
    this.position = coords;
    this.thingElement.style.left = coords[0] - this.clickPosition[0] + 'px';
    this.thingElement.style.top = coords[1] - this.clickPosition[1] + 'px';
  }

  $callListeners(type, payload) {
    this.listeners[type].forEach(fn => fn(payload));
  }
}
