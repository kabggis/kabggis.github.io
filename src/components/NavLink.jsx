import { NavLink as NavLinkRouter } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavLink({ to, children }) {
  return (
    <NavLinkRouter
      to={to}
      className={({ isActive }) =>
        `inline-block px-8 py-4 hover:bg-slate-900/10 ${
          isActive ? "bg-slate-900/10" : ""
        }`
      }
    >
      {children}
    </NavLinkRouter>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
