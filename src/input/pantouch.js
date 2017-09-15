import {
  INPUT_START,
  INPUT_MOVE,
  INPUT_END,
  INPUT_CANCEL,
  INPUT_TYPE_PAN
} from "../inputjs/input-consts";
import Input from "../inputjs/input-constructor";
import toArray from "../utils/to-array";
import hasParent from "../utils/has-parent";
import uniqueArray from "../utils/unique-array";
import {PanResponder} from 'react-native';

const PAN_TOUCH_INPUT_MAP = {
  onPanResponderGrant: INPUT_START,
  onPanResponderMove: INPUT_MOVE,
  onPanResponderRelease: INPUT_END
};

const PAN_TOUCH_TARGET_EVENTS = 'onPanResponderGrant onPanResponderMove onPanResponderRelease';

const defaultProps = {
  onStartShouldSetPanResponder: (evt, gestureState) => true,
  onMoveShouldSetPanResponder: (evt, gestureState) => false
}
/**
* @private
* Multi-user touch events input
* @constructor
* @extends Input
*/
export default class PanTouchInput extends Input {
  constructor() {
    PanTouchInput.prototype.evTarget = PAN_TOUCH_TARGET_EVENTS;
    PanTouchInput.prototype.evMap = PAN_TOUCH_INPUT_MAP;

    super(defaultProps, ...arguments);
    this.evTarget = PAN_TOUCH_TARGET_EVENTS;
  }

  handler(ev, gs, evtype) {
    let type = PAN_TOUCH_INPUT_MAP[evtype];
    let touches = ev.nativeEvent.touches;
    let changedTouches = ev.nativeEvent.changedTouches || [];

    if(evtype === 'onPanResponderRelease') {
      touches = changedTouches;
    }
    if (!touches) {
      return;
    }

    this.callback(this.manager, type, {
      pointers: touches.map(touch => {
        return convertTouch(touch);
      }),
      changedPointers: changedTouches.map(touch => {
        return convertTouch(touch);
      }),
      pointerType: INPUT_TYPE_PAN,
      srcEvent: ev.nativeEvent
    });

    function convertTouch(touch) {
      let result = {};
      result.x = touch.locationX;
      result.y = touch.locationY;
      result.clientX = touch.pageX;
      result.clientY = touch.pageY;
      return result;
    }
  }

  getOutput() {
    return PanResponder.create(this.target).panHandlers;
  }
}