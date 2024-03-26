import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function PaginationButton({ className, ...rest }) {
  return (
    <button
      className={twMerge(
        "border-l border-slate-400 bg-slate-100 px-4 py-2 text-slate-800 first:rounded-l-md first:border-0 last:rounded-r-md",
        className,
      )}
      {...rest}
    />
  );
}

PaginationButton.propTypes = {
  className: PropTypes.string,
};
