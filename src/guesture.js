import Manager from "./manager";
//recognizer
import TapRecognizer from './recognizer/tap';
import PressRecognizer from './recognizer/press';
import PanRecognizer from './recognizer/pan';
//utils
import splitStr from './utils/split-str';
import each from './utils/each';
import ifUndefined from './utils/if-undefined';


import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, DIRECTION_ALL } from './inputjs/input-consts';

export default class Guesture {
  constructor(options) {
    options = options || {};
    options.recognizers = ifUndefined(
      options.recognizers,
      Guesture.defaults.preset
    );
    return new Manager(options);
  }
}

Guesture.defaults = {
  nativeEvents: false,
  preset: [
    [TapRecognizer],
    [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
    [PressRecognizer],
    [PanRecognizer, { direction: DIRECTION_HORIZONTAL }],
  ]
};

Guesture.Manager = Manager;

Guesture.Tap = TapRecognizer;
Guesture.Press = PressRecognizer;
Guesture.Pan = PanRecognizer;
Guesture.DIRECTION = {
  DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL,
  DIRECTION_ALL
}