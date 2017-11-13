import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error, type, onChange, glyphicon, placeholder }) => (
  <div>
    <div className={classnames('form-group', { 'has-error': error })}>
    <span className={ glyphicon } /><label className="control-label">{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={field}
        className="form-control"
        placeholder={placeholder}
        required
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  </div>
);

TextFieldGroup.PropTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  glyphicon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextFieldGroup.defaultprops = {
  type: 'text',
};
export default TextFieldGroup;
