import Guesture from './guesture';
import assign from './utils/assign';
import {
    INPUT_START,
    INPUT_MOVE,
    INPUT_END,
    INPUT_CANCEL
} from './inputjs/input-consts';
import {
    STATE_POSSIBLE,
    STATE_BEGAN,
    STATE_CHANGED,
    STATE_ENDED,
    STATE_RECOGNIZED,
    STATE_CANCELLED,
    STATE_FAILED
} from './recognizerjs/recognizer-consts';
import {
    DIRECTION_NONE,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP,
    DIRECTION_DOWN,
    DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL,
    DIRECTION_ALL
} from './inputjs/input-consts';

import Manager from './manager';
import Input from './inputjs/input-constructor';
import TouchInput from './input/touch';
import PanTouchInput from './input/pantouch';

import Recognizer from  './recognizerjs/recognizer-constructor';
import AttrRecognizer from './recognizers/attribute';
import TapRecognizer from './recognizers/tap';
import PanRecognizer from './recognizers/pan';
import PressRecognizer from './recognizers/press';

import addEventListeners from './utils/add-event-listeners';
import removeEventListeners from './utils/remove-event-listeners';
import each from './utils/each';
import merge from './utils/merge';
import extend from './utils/extend';
import inherit from './utils/inherit';
import bindFn from './utils/bind-fn';
import prefixed from './utils/prefixed';
import toArray from'./utils/to-array';
import uniqueArray from'./utils/unique-array';
import splitStr from'./utils/split-str';
import inArray from'./utils/in-array';
import boolOrFn from'./utils/bool-or-fn';
import hasParent from'./utils/has-parent';

assign(Guesture, {
  INPUT_START,
  INPUT_MOVE,
  INPUT_END,
  INPUT_CANCEL,

  STATE_POSSIBLE,
  STATE_BEGAN,
  STATE_CHANGED,
  STATE_ENDED,
  STATE_RECOGNIZED,
  STATE_CANCELLED,
  STATE_FAILED,

  DIRECTION_NONE,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL,
  DIRECTION_ALL,

  Manager,
  Input,

  TouchInput,
  PanTouchInput,

  Recognizer,
  AttrRecognizer,
  Tap: TapRecognizer,
  Pan: PanRecognizer,
  Press: PressRecognizer,

  on: addEventListeners,
  off: removeEventListeners,
  each,
  merge,
  extend,
  assign,
  inherit,
  bindFn,
  prefixed,
  toArray,
  inArray,
  uniqueArray,
  splitStr,
  boolOrFn,
  hasParent,
  addEventListeners,
  removeEventListeners
});

module.exports = Guesture;