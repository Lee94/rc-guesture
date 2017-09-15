import addEventProps from '../utils/add-event-props';
import assign from '../utils/assign';
/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
export default class Input {
  constructor(defaultProps, manager, callback) {
    let self = this;
    this.manager = manager;
    this.callback = callback;
    this.target = assign({}, defaultProps);

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.targetHandler = function() {
      self.handler(...arguments);
    }

    this.init();

  }
  /**
   * @private
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */
  handler() { }

  /**
   * @private
   * bind the events
   */
  init() {
    this.evTarget && addEventProps(this.target, this.evTarget, this.targetHandler);
  }

  getOutput() {
    return this.target;
  }

  /**
   * @private
   * unbind the events
   */
  destroy() {
    this.target = {}
  }
}