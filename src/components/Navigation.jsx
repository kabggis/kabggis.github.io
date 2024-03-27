import NavLink from "./NavLink";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {{
 *   to: string;
 *   text: string;
 * }[]} props.navs
 * @returns
 */
export default function Navigation({ navs }) {
  return (
    <nav className="flex items-center justify-center bg-slate-100 drop-shadow-lg">
      <ul className="flex list-none">
        {navs.map((nav) => (
          <li key={nav.to}>
            <NavLink to={nav.to}>{nav.text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  navs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
