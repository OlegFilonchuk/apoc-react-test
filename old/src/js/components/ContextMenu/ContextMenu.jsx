import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MenuItem, MenuList, MenuButton } from 'react-menu-list';

import ContextButton from './ContextButton';
import './ContextMenu.less';
import { Z_INDEX } from '../Modal/configuration';

const HIDE_CONTEXT_MENU_INTERVAL = 300; // in milliseconds

const contextMenuItemsClass = 'context-menu__items';

export default class ContextMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.timeout = null;
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    window.removeEventListener('scroll', this.onScroll);
  }

  onMenuEnter = () => {
    if (!this.timeout) {
      return;
    }

    this.timeout = clearTimeout(this.timeout);
  };

  onMenuMouseOver = event => {
    event.stopPropagation();

    this.props.onMenuMouseOver(event);
    this.onMenuEnter();
  };

  onScroll = () => {
    this.hide();
  };

  onHidden = () => {
    this.setState({ isOpen: false });
    window.removeEventListener('scroll', this.onScroll);
  };

  onShown = () => {
    this.setState({ isOpen: true }, this.addScrollEvent);
  };

  hideOnMenuLeave = event => {
    this.props.onMenuMouseLeave(event);
    this.hideOnTimeout();
  };

  hideOnButtonLeave = () => {
    this.props.onMouseLeave();

    if (!this.state.isOpen) {
      return;
    }

    this.hideOnTimeout();
  };

  hideOnTimeout = () => {
    if (this.timeout) {
      return;
    }

    this.timeout = setTimeout(() => this.hide(), HIDE_CONTEXT_MENU_INTERVAL);
  };

  hide = () => {
    this.menuButtonRef.close();
    this.timeout = clearTimeout(this.timeout);
  };

  addScrollEvent = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  render() {
    const {
      ButtonComponent,
      children,
      className,
      closeOnOptionClick,
      menuZIndex,
      onButtonClick,
      onButtonMouseOver,
      title,
      disabled
    } = this.props;

    const contextMenuContainerClasses = classNames('sc-dropdown', 'context-menu');
    const menuClasses = classNames(
      'sc-dropdown-menus',
      'sc-dropdown-menus--relative',
      contextMenuItemsClass,
      className,
      {
        [`${contextMenuItemsClass}--open`]: this.state.isOpen,
        [`${contextMenuItemsClass}--closed`]: !this.state.isOpen
      }
    );

    return (
      <MenuButton
        menuZIndex={menuZIndex}
        disabled={disabled}
        ref={menuButtonRef => {
          this.menuButtonRef = menuButtonRef;
        }}
        menu={
          <div className={contextMenuContainerClasses}>
            <ul className={menuClasses} onMouseOver={this.onMenuMouseOver} onMouseLeave={this.hideOnMenuLeave}>
              <MenuList>{closeOnOptionClick ? <MenuItem>{children}</MenuItem> : children}</MenuList>
            </ul>
          </div>
        }
        positionOptions={this.props.positionOptions}
        ButtonComponent={
          (ButtonComponent &&
            (props => (
              <ButtonComponent
                {...props}
                title={title}
                onClick={onButtonClick}
                onMouseOver={onButtonMouseOver}
                onMouseLeave={this.hideOnButtonLeave}
              />
            ))) ||
          (props => (
            <ContextButton
              {...props}
              title={title}
              onClick={onButtonClick}
              onMouseLeave={this.hideOnButtonLeave}
              onMouseOver={onButtonMouseOver}
            />
          ))
        }
        onDidOpen={this.onShown}
        onWillClose={this.onHidden}
      />
    );
  }
}

ContextMenu.propTypes = {
  /**
   * Title to show when hover on menu (including button & items)
   */
  title: PropTypes.string,

  /**
   * Will be triggered on 'burger' button click
   */
  onButtonClick: PropTypes.func,

  /**
   * Will be triggered when mouse hovers 'burger' button
   */
  onButtonMouseOver: PropTypes.func,

  /**
   * Controls how the menu is aligned to the
   */
  positionOptions: PropTypes.shape({
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'cover']),
    hAlign: PropTypes.oneOf(['center', 'left', 'right']),
    vAlign: PropTypes.oneOf(['center', 'top', 'bottom'])
  }),

  /**
   * Will be triggered when mouse leaves 'burger' button
   */
  onMouseLeave: PropTypes.func,

  /**
   * Will be triggered when mouse hovers menu
   */
  onMenuMouseOver: PropTypes.func,

  /**
   * Will be triggered when mouse leaves menu
   */
  onMenuMouseLeave: PropTypes.func,

  /**
   * Menu items list
   */
  children: PropTypes.node.isRequired,

  /**
   * Easy way to change ZIndex of ContextMenu's dialog if necessary.
   * Defalt value is Modal's z-index + 1
   */
  menuZIndex: PropTypes.number,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * Disable menu button
   */
  disabled: PropTypes.bool,

  closeOnOptionClick: PropTypes.bool,
  ButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

ContextMenu.defaultProps = {
  ButtonComponent: null,
  className: '',
  closeOnOptionClick: false,
  disabled: false,
  menuZIndex: Z_INDEX + 1,
  onButtonClick: () => true,
  onButtonMouseOver: () => true,
  onMenuMouseLeave: () => true,
  onMenuMouseOver: () => true,
  onMouseLeave: () => true,
  title: '',
  positionOptions: { position: 'bottom', vAlign: 'bottom', hAlign: 'right' }
};
