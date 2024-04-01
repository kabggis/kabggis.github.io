import PropTypes from "prop-types";

export default function If({ condition, children }) {
  return condition ? children : null;
}

If.propTypes = {
  condition: PropTypes.bool,
  children: PropTypes.node,
};
