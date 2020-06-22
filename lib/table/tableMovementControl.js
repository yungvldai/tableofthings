import TableState from './tableState';
import { getDocumentCoords } from "../utils";

export default class TableMovementControl extends TableState {
  $onMouseup() {
    this.$forgetThings();
  }

  $onTouchend() {
    this.$forgetThings();
  }

  $onMousemove(event) {
    let { clientX, clientY } = event;
    let [ elx, ely ] = getDocumentCoords(this.tableElement);
    this.$setSidePosition([clientX - elx, clientY - ely]);
  }

  $onTouchmove(event) {
    let { clientX, clientY } = event.touches[0];
    let [ elx, ely ] = getDocumentCoords(this.tableElement);
    if (this.activeThings.length > 0) {
      this.$setSidePosition([clientX - elx, clientY - ely]);
      event.preventDefault();
    }
  }
}
