import TableState from './tableState';
import { getDocumentCoords, getSize, minmax } from "../utils";

export default class TableMovementControl extends TableState {
  $onMouseup() {
    this.$forgetThings();
  }

  $onTouchend() {
    this.$forgetThings();
  }

  $onMousemove(event) {
    event.preventDefault();
    let { clientX, clientY } = event;
    let [ elx, ely ] = getDocumentCoords(this.tableElement);
    this.$setSidePosition([clientX - elx, clientY - ely]);
  }

  $onTouchmove(event) {
    event.preventDefault();
    let { clientX, clientY } = event.touches[0];
    let [ elx, ely ] = getDocumentCoords(this.tableElement);
    this.$setSidePosition([clientX - elx, clientY - ely]);
  }
}
