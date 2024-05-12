import { FaCheck } from "react-icons/fa6";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { useId } from "react";

export default function Checkbox({
  defaultChecked,
  onChange,
  label,
  color,
  disabled,
  className,
}) {
  const id = useId();

  return (
    <div
      className={twMerge(
        "flex gap-1 hover:bg-slate-200 has-[:disabled]:cursor-not-allowed",
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer hidden"
        defaultChecked={defaultChecked}
        id={id}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="h-4 w-4 flex-none cursor-pointer rounded border border-[var(--backgroundColor,#39f)] bg-slate-100 text-slate-100 peer-checked:bg-[var(--backgroundColor,#39f)] peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        style={{
          "--backgroundColor": color,
        }}
      >
        <FaCheck className="h-full w-full" />
      </label>
      <label
        htmlFor={id}
        className="flex-auto cursor-pointer leading-4 peer-disabled:cursor-not-allowed"
      >
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
