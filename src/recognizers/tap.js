import {
  INPUT_START,
  INPUT_END,
} from '../inputjs/input-consts';
import getDistance from '../inputjs/get-distance';
import Recognizer from '../recognizerjs/recognizer-constructor';
import setTimeoutContext from '../utils/set-timeout-context';
import {
  STATE_RECOGNIZED,
  STATE_BEGAN,
  STATE_FAILED
} from '../recognizerjs/recognizer-consts';

export default class TapRecognizer extends Recognizer{

  constructor() {
    super(...arguments);
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
  }


  process(input) {
    let { options } = this;

    let validPointers = input.pointers.length === options.pointers;
    let validMovement = input.distance < options.threshold;
    let validTouchTime = input.deltaTime < options.time;

    this.reset();
    if ((input.eventType & INPUT_START) && (this.count === 0)) {
      return this.failTimeout();
    }

    // we only allow little movement
    // and we've reached an end event, so a tap is possible
    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType !== INPUT_END) {
        return this.failTimeout();
      }

      let validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
      let validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

      this.pTime = input.timeStamp;
      this.pCenter = input.center;

      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }

      this._input = input;

      // if tap count matches we have recognized it,
      // else it has began recognizing...
      let tapCount = this.count % options.taps;
      if (tapCount === 0) {
        // no failing requirements, immediately trigger the tap event
        // or wait as long as the multitap interval to trigger
        if (!this.hasRequireFailures()) {
          return STATE_RECOGNIZED;
        } else {
          this._timer = setTimeoutContext(() => {
            this.state = STATE_RECOGNIZED;
            this.tryEmit();
          }, options.interval, this);
          return STATE_BEGAN;
        }
      }
    }
    return STATE_FAILED;
  }

  failTimeout() {
    this._timer = setTimeoutContext(() => {
      this.state = STATE_FAILED;
    }, this.options.interval, this);
    return STATE_FAILED;
  }

  emit() {
    if (this.state === STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  }

  reset() {
    clearTimeout(this._timer);
  }
}

TapRecognizer.prototype.defaults = {
  event: 'tap',
  pointers: 1,
  taps: 1,
  interval: 300, // max time between the multi-tap taps
  time: 250, // max time of the pointer to be down (like finger on the screen)
  threshold: 9, // a minimal movement is ok, but keep it low
  posThreshold: 10 // a multi-tap can be a bit off the initial position
};