import { getSize, minmax } from "../utils";
import log from '../log';

export default class TableState {
  constructor() {
    this.tableElement = null;
    this.registeredThings = {};
    this.activeThings = [];
    this.options = null;
    this.listeners = {
      'dragstart': [],
      'dragend': []
    };
  }

  $forgetThings() {
    this.activeThings.forEach(thing => {
      this.registeredThings[thing].$pullNotify();
    })
    this.activeThings = [];
    this.$callListeners('dragend', {
      type: 'dragend',
      ...this.$eventPayload()
    });
  }

  $initOptions(options) {
    this.options = options;
  }

  $setTableElement(el) {
    this.tableElement = el;
  }

  $eventPayload() {
    return {
      tableRef: {
        ...this,
        size: getSize(this.tableElement)
      }
    };
  }

  $thingPushNotifier(thingKey) {
    this.activeThings.push(thingKey);
    this.$callListeners('dragstart', {
      type: 'dragstart',
      ...this.$eventPayload()
    });
  }

  $registerThing(thing) {
    if (this.registeredThings[thing.thingKey]) {
      log.err(`Thing with key ${thing.thingKey} has already been added!`);
      return;
    }
    this.registeredThings[thing.thingKey] = thing;
    thing.$setTableRef(this);
    thing.$addPushNotifier(this.$thingPushNotifier.bind(this));
  }

  $setSidePosition(position) {
    let [ aw, ah ] = getSize(this.tableElement);
    this.activeThings.forEach(thing => {
      let currentThing = this.registeredThings[thing]
      currentThing.$setPosition([
        minmax(
          currentThing.clickPosition[0],
          position[0],
          aw - getSize(currentThing.thingElement)[0] + currentThing.clickPosition[0]
        ),
        minmax(
          currentThing.clickPosition[1],
          position[1],
          ah - getSize(currentThing.thingElement)[1] + currentThing.clickPosition[1]
        )
      ]);
    });
  }

  $callListeners(type, payload) {
    this.listeners[type].forEach(fn => fn(payload));
  }
}
