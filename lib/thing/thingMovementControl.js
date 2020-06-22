import ThingState from "./thingState";
import { getDocumentCoords } from "../utils";

export default class ThingMovementControl extends ThingState {
  $onMousedown(event) {
    let { clientX, clientY } = event;
    let [ elx, ely ] = getDocumentCoords(this.thingElement);
    this.$setClickPosition([clientX - elx, clientY - ely]);
    if (this.pushNotifier && typeof this.pushNotifier === 'function') {
      this.pushNotifier(this.thingKey);
    }
  }

  $onTouchstart(event) {
    let { clientX, clientY } = event.touches[0];
    let [ elx, ely ] = getDocumentCoords(this.thingElement);
    this.$setClickPosition([clientX - elx, clientY - ely]);
    if (this.pushNotifier && typeof this.pushNotifier === 'function') {
      this.pushNotifier(this.thingKey);
    }
  }
}
