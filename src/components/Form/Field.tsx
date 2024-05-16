import { getTodayDate } from "@/helper";
import { Field as FormikField, useFormikContext } from "formik";
import Link from "next/link";
import { useRef, type FocusEvent } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdChevronRight } from "react-icons/md";

interface FieldProps<T> {
  label: string;
  formikKey: keyof T;
  disabled: boolean;
  as?: string;
  options?: { label: string; value: string }[];
}

export const Field = <T,>({
  label,
  formikKey,
  disabled,
  as,
  options,
}: FieldProps<T>) => {
  const { errors, values, isSubmitting } = useFormikContext<T>();

  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center">
        <label
          className="font-sf text-[15px] font-bold text-white"
          htmlFor={String(formikKey)}
        >
          {label}
        </label>
      </div>

      <div
        className={`relative mt-1 flex h-full w-full flex-row items-center overflow-hidden rounded-lg ${isSubmitting ? "bg-[#a5a5a5]" : "bg-white"} ${errors[formikKey] ? "!border-2 border-[#EB5757]" : "border border-[#cccccc]"}`}
      >
        <FormikField
          as={as ?? "input"}
          id={formikKey}
          type={
            formikKey === "dob"
              ? "date"
              : formikKey === "contact"
                ? "tel"
                : "text"
          }
          innerRef={ref}
          placeholder={formikKey === "contact" ? "0123456789" : ""}
          name={String(formikKey)}
          disabled={disabled}
          onFocus={(e: FocusEvent<HTMLInputElement>) => {
            formikKey === "dob"
              ? (e.currentTarget.max = String(
                  new Date().toISOString().split("T")[0],
                ))
              : undefined;
          }}
          max={formikKey === "dob" ? getTodayDate() : undefined}
          className={`w-full rounded-lg ${values[formikKey] === "" ? "text-[#858585]" : "text-black"} bg-white px-3 py-3 font-sf outline-none placeholder:text-[#858585] disabled:bg-[#a5a5a5] disabled:text-black`}
        >
          {options?.map((s, i) => (
            <option disabled={!s.label} key={i} value={s.value ?? s.label}>
              {s.label === "" ? "Choose one..." : s.label}
            </option>
          ))}
        </FormikField>
        {errors[formikKey] ? (
          <div className="h-full p-3" onClick={() => ref.current?.focus()}>
            <RiErrorWarningFill color="#EB5757" size={20} />
          </div>
        ) : as === "select" ? (
          <div className="h-full p-3" onClick={() => ref.current?.focus()}>
            <MdChevronRight color="black" className="rotate-90" size={25} />
          </div>
        ) : null}
      </div>

      <div className="min-h-[24px] w-full pt-1 text-right font-sf text-[15px] font-bold text-red-600">
        {errors[formikKey] && String(errors[formikKey])}
      </div>
    </div>
  );
};

export const AltField = <T,>({
  label,
  formikKey,
  disabled,
  as,
  options,
}: FieldProps<T>) => {
  const { errors } = useFormikContext<T>();
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-center bg-[#000]">
        <label
          className="py-0.5 pl-2 font-sf text-sm font-semibold text-white"
          htmlFor={String(formikKey)}
        >
          {label}
        </label>
      </div>

      <FormikField
        as={as ?? "input"}
        id={formikKey}
        type={
          formikKey === "dob"
            ? "date"
            : formikKey === "contact"
              ? "tel"
              : "text"
        }
        name={String(formikKey)}
        disabled={disabled}
        onFocus={(e: FocusEvent<HTMLInputElement>) => {
          formikKey === "dob"
            ? (e.currentTarget.max = String(
                new Date().toISOString().split("T")[0],
              ))
            : undefined;
        }}
        max={formikKey === "dob" ? getTodayDate() : undefined}
        className={`w-full bg-white px-2 font-sf outline-none disabled:bg-white/70 disabled:text-gray-700${formikKey === "dob" ? " font-bold" : ""}`}
      >
        {options?.map((s, i) => (
          <option disabled={!s.label} key={i} value={s.value ?? s.label}>
            {s.label === "" ? "Choose one..." : s.label}
          </option>
        ))}
      </FormikField>

      <div className="min-h-[24px] w-full py-1 text-right font-sf text-[15px] font-bold text-[#EB5757]">
        {errors[formikKey] && String(errors[formikKey])}
      </div>
    </div>
  );
};

export const RadioField = <T,>({
  label,
  formikKey,
  disabled,
  options,
}: FieldProps<T>) => {
  const { errors, values } = useFormikContext<T>();

  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex w-full flex-row overflow-hidden rounded-md border ${errors[formikKey] ? "border-red-600" : "border-white"}`}
      >
        <div className="flex min-w-[100px] max-w-[100px] flex-row items-center bg-black">
          <label
            className="pl-2 font-sf text-sm font-semibold text-white"
            htmlFor={String(formikKey)}
          >
            {label}
          </label>
        </div>
        <div className="flex w-full flex-row items-center gap-0.5 bg-white p-0.5 font-sf">
          {options?.map((o) => (
            <label
              key={o.label}
              className={`${disabled ? "!bg-opacity-80 !text-opacity-80 " : ""}h-full flex w-full flex-row items-center justify-center rounded-md p-1 text-sm transition-colors duration-300 ${values[formikKey] === o.value ? "bg-black text-white" : ""}`}
            >
              <FormikField
                type="radio"
                name={String(formikKey)}
                disabled={disabled}
                value={o.value}
              />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      <div className="min-h-[24px] w-full py-1 pr-2 text-right font-sf text-xs italic text-[#eb5757]">
        {errors[formikKey] && String(errors[formikKey])}
      </div>
    </div>
  );
};

export const AltRadioField = <T,>({
  label,
  formikKey,
  disabled,
  options,
}: FieldProps<T>) => {
  const { errors, values } = useFormikContext<T>();

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row items-center">
        <label
          className="py-0.5 font-sf text-[15px] font-bold text-white"
          htmlFor={String(formikKey)}
        >
          {label}
        </label>
      </div>
      <div className="mt-1.5 flex w-full flex-row items-center justify-between p-0.5 font-sf">
        {options?.map((o) => (
          <label
            key={o.label}
            className="flex w-full flex-row items-center gap-2 text-[15px] font-semibold text-white"
          >
            <div className="relative max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px] rounded-full border-[2px] border-white">
              {values[formikKey] === o.value && (
                <div className="absolute left-1/2 top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              )}
            </div>
            <FormikField
              type="radio"
              name={String(formikKey)}
              disabled={disabled}
              value={o.value}
            />
            {o.label}
          </label>
        ))}
      </div>

      <div className="min-h-[24px] w-full py-1 pr-2 text-right font-sf text-xs italic text-red-600">
        {errors[formikKey] && String(errors[formikKey])}
      </div>
    </div>
  );
};

export const EmailField = <T,>({
  label,
  formikKey,
  disabled,
  as,
  options,
}: FieldProps<T>) => {
  const { errors } = useFormikContext<T>();
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center">
        <label
          className="font-sf text-[15px] font-bold text-white"
          htmlFor={String(formikKey)}
        >
          {label}
        </label>
      </div>

      <FormikField
        as={as ?? "input"}
        id={formikKey}
        name={String(formikKey)}
        disabled={disabled}
        className={`mt-1 w-full rounded-lg bg-[#bbbbbb] px-3 py-3 font-sf outline-none disabled:text-[#676767] ${errors[formikKey] ? "!border-2 border-[#EB5757]" : "border border-[#cccccc]"}`}
      >
        {options?.map((s, i) => (
          <option key={i} value={s.value ?? s.label}>
            {s.label}
          </option>
        ))}
      </FormikField>

      <div className=" w-full pr-2 pt-1 text-right font-sf text-xs text-white">
        Not You?{" "}
        <Link
          className="font-bold text-[#d6fe00] underline"
          href="/api/auth/logout"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};
