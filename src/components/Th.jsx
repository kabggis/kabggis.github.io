import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function Th({ children, className }) {
  return (
    <th
      className={twMerge(
        "border-l border-slate-400 px-4 py-2 first:border-l-0",
        className,
      )}
    >
      {children}
    </th>
  );
}

Th.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
