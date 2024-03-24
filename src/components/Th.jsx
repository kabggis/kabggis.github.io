import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function Th({ children, className }) {
  return (
    <th
      className={twMerge(
        "border-l border-slate-400 px-2 py-1 uppercase first:border-l-0",
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
