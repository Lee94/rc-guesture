import { SUPPORT_POINTER_EVENTS,SUPPORT_ONLY_TOUCH,SUPPORT_TOUCH } from './input-consts';
import inputHandler from './input-handler';
import TouchInput from '../input/touch';
import PanTouchInput from '../input/pantouch';

/**
 * @private
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
export default function createInputInstance(manager) {
  let Type;

  if (SUPPORT_TOUCH) {
    Type = TouchInput;
  } else {
    Type = PanTouchInput;
  }
  return new (Type)(manager, inputHandler);
}