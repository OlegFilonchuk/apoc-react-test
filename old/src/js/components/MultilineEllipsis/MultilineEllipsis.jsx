import React from 'react';
import PropTypes from 'prop-types';
import ReactMeasure from 'react-measure';
import elementClass from 'element-class';

import './MultilineEllipsis.less';

const CLASS_ELLIPSED = 'multiline-ellipsis--on';
const BASE_CLASS = 'multiline-ellipsis';

/**
 * Uses browser's native multiline ellipsis (`-webkit-line-clamp`) but fallbacks to a workaround when necessary.
 *
 * Advantage of it - comparing to pure css - is easily accessible information in JS World that a text overflows.
 *
 * Uses Render Prop.
 */
class MultilineEllipsis extends React.PureComponent {
  static propTypes = {
    /**
     * Render prop.
     * @param {function} obj.ellipsisRef a ref function necessary to be passed via `ref` prop
     * @param {Boolean} obj.ellipsed `true` or `false` whether ellipsed is visible or not
     */
    children: PropTypes.func.isRequired,
    /**
     * Defined cells max height in text lines
     */
    maxLines: PropTypes.number,
    /**
     * Use this to access the internal component `ref`. The one to which ellipsisRef from render prop is passed.
     */
    innerRef: PropTypes.func
  };

  static defaultProps = {
    maxLines: 3,
    innerRef: () => null
  };

  state = {
    ellipsed: false
  };

  componentDidUpdate(prevPros, prevState) {
    if (!this.ellipsisElement) {
      return;
    }

    if (prevState.ellipsed !== this.state.ellipsed) {
      this.setEllipsisElementClasses(this.state.ellipsed);
    }

    const ellipsed = this.shouldBeEllipsed({
      scrollHeight: this.ellipsisElement.scrollHeight,
      clientHeight: this.ellipsisElement.clientHeight
    });

    /* eslint-disable react/no-did-update-set-state */
    if (ellipsed !== this.state.ellipsed) {
      this.setState({ ellipsed });
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  /**
   * @param {Number} clientHeight
   * @param {Number} scrollHeight
   */
  onResize = ({ client: { height: clientHeight }, scroll: { height: scrollHeight } }) => {
    const ellipsed = this.shouldBeEllipsed({ clientHeight, scrollHeight });

    this.setState({ ellipsed });
  };

  /**
   * @param {HTMLElement} element
   */
  setEllipsisElement = element => {
    if (!element || this.ellipsisElement === element) {
      return;
    }

    this.ellipsisElement = element;
    this.ellipsisElement.style['-webkit-line-clamp'] = this.props.maxLines;
    this.ellipsisElement.style['max-height'] = `${this.getMaxHeight()}px`;
    elementClass(this.ellipsisElement).add(BASE_CLASS);
    this.setEllipsisElementClasses(this.state.ellipsed);

    this.props.innerRef(element);
  };

  /**
   * @return {number}
   */
  getMaxHeight() {
    return getElementLineHeight(this.ellipsisElement) * this.props.maxLines;
  }

  /**
   * @param {Boolean} ellipsed
   */
  setEllipsisElementClasses(ellipsed) {
    const refClasses = elementClass(this.ellipsisElement);

    if (ellipsed && !refClasses.has(CLASS_ELLIPSED)) {
      refClasses.add(CLASS_ELLIPSED);
    }
    if (!ellipsed && refClasses.has(CLASS_ELLIPSED)) {
      refClasses.remove(CLASS_ELLIPSED);
    }
  }

  ellipsisElement;

  /* eslint-disable class-methods-use-this */
  /**
   * @param {Number} clientHeight
   * @param {Number} scrollHeight
   * @return {boolean}
   */
  shouldBeEllipsed({ clientHeight, scrollHeight }) {
    return scrollHeight > clientHeight;
  }

  /* eslint-enable class-methods-use-this */

  render() {
    return (
      <ReactMeasure onResize={this.onResize} scroll client innerRef={this.setEllipsisElement}>
        {({ measureRef }) =>
          this.props.children({
            ellipsisRef: measureRef,
            ellipsed: this.state.ellipsed
          })
        }
      </ReactMeasure>
    );
  }
}

export default MultilineEllipsis;

/**
 * @param {HTMLElement} element
 * @return {Number}
 */
function getElementLineHeight(element) {
  return parseFloat(window.getComputedStyle(element)['line-height']);
}
