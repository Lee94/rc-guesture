import each from './each';
import splitStr from './split-str';
/**
 * @private
 * addEventProps with multiple events at once
 * @param {Props} target
 * @param {String} types
 * @param {Function} handler
 */
export default function addEventProps(target, types, handler) {
  each(splitStr(types), (type) => {
    target[type] = function() {
      handler.call(null, ...arguments, type);
    };
  });
}
