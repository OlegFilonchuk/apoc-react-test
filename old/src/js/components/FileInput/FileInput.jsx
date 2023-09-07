import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';
import Button from '../Button/Button';

import './FileInput.less';

class FileInput extends Component {
  static formatFileNames(files) {
    if (files) {
      return Array.prototype.map.call(files, file => file.name).join('; ');
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.fileInput = this.props.selectedFile;
  }

  get className() {
    return classNames('fileInput__wrapper', {
      fileInput__wrapper__disabled: this.props.disabled
    });
  }

  get buttonClassName() {
    return classNames('sc-btn', 'sc-btn-primary-outline', 'fileInput__button', this.props.className, {
      'sc-disabled': this.props.disabled
    });
  }

  get fileName() {
    if (this.props.selectedFile) {
      return this.props.selectedFile.name;
    }

    return FileInput.formatFileNames(this.fileInput && this.fileInput.files) || this.props.noFileLabel;
  }

  clickHandler = e => {
    if (this.disabled) return false;
    if (!this.fileInput) return false;

    if (this.props.onClick && !this.props.onClick(e)) {
      return false;
    }

    return this.fileInput.click();
  };

  fileHandler = () => {
    this.props.onChange(this.fileInput.files);
    this.forceUpdate();
  };

  render() {
    const { disabled, id, name, label, multiple, accept } = this.props;

    return (
      <div className={this.className} onClick={this.clickHandler}>
        <Button
          id={id}
          type="button"
          className={this.buttonClassName}
          onClick={() => true}
          {...getDataTestElementProps(this.props, dataTestElementValue => `${dataTestElementValue}Button`)}
        >
          {label}
        </Button>
        <input
          name={name}
          type="file"
          multiple={multiple}
          className="fileInput__fileInput"
          accept={accept}
          ref={node => {
            this.fileInput = node;
          }}
          onChange={this.fileHandler}
          disabled={disabled}
          {...getDataTestElementProps(this.props, dataTestElementValue => `${dataTestElementValue}Input`)}
        />
        {this.fileName}
      </div>
    );
  }
}

FileInput.propTypes = {
  /**
   * Button id
   */
  id: PropTypes.string,

  /**
   * Name of the file input element
   */
  name: PropTypes.string,

  /**
   * Is the browse button disabled
   */
  disabled: PropTypes.bool,

  /**
   * Additional onClick handler
   */
  onClick: PropTypes.func,

  /**
   * Inherited classes. For more details check Buttons section in Chameleon.
   * Defaults to 'sc-btn-default'.
   */
  className: PropTypes.string,

  /**
   * Button label
   */
  label: PropTypes.node,

  /**
   * Can multiple files be selected
   */
  multiple: PropTypes.bool,

  /**
   * Mime types accepted by the file input
   */
  accept: PropTypes.string,

  /**
   * No file chosen text
   */
  noFileLabel: PropTypes.node,

  /**
   * Selected file
   */
  selectedFile: PropTypes.node,

  /**
   * onChange handler. Process the selected files here.
   */
  onChange: PropTypes.func.isRequired,
  ...dataTestElementPropTypes
};

FileInput.defaultProps = {
  id: '',
  name: '',
  disabled: false,
  className: 'sc-btn-default',
  label: 'Browse',
  multiple: false,
  accept: '*/*',
  noFileLabel: 'No file chosen',
  selectedFile: null,
  onClick: () => true
};

export default FileInput;
