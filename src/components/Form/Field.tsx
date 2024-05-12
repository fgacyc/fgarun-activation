import { getTodayDate } from "@/helper";
import { Field as FormikField, useFormikContext } from "formik";
import Link from "next/link";
import { type FocusEvent } from "react";

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
  const { errors } = useFormikContext<T>();
  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex w-full flex-row overflow-hidden rounded-md border ${errors[formikKey] ? "border-red-600" : "border-white"}`}
      >
        <div className="flex min-w-[100px] max-w-[100px] flex-row items-center bg-[#000]">
          <label
            className="pl-2 font-sf text-sm font-semibold text-white"
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
          className={`w-full bg-white px-2 font-sf outline-none disabled:bg-opacity-80 disabled:text-gray-500${formikKey === "dob" ? " font-bold" : ""}`}
        >
          {options?.map((s, i) => (
            <option key={i} value={s.value ?? s.label}>
              {s.label}
            </option>
          ))}
        </FormikField>
      </div>

      <div className="min-h-[24px] w-full py-1 pr-2 text-right font-sf text-xs italic text-red-600">
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
      <div
        className={`flex w-full flex-col overflow-hidden rounded-md border ${errors[formikKey] ? "border-red-600" : "border-white"}`}
      >
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
          className={`w-full bg-white px-2 font-sf outline-none disabled:bg-opacity-80 disabled:text-gray-500${formikKey === "dob" ? " font-bold" : ""}`}
        >
          {options?.map((s, i) => (
            <option disabled={!s.label} key={i} value={s.value ?? s.label}>
              {s.label === "" ? "Choose one..." : s.label}
            </option>
          ))}
        </FormikField>
      </div>

      <div className="min-h-[24px] w-full py-1 pr-2 text-right font-sf text-xs italic text-red-600">
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

      <div className="min-h-[24px] w-full py-1 pr-2 text-right font-sf text-xs italic text-red-600">
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
      <div
        className={`flex w-full flex-col overflow-hidden rounded-md border ${errors[formikKey] ? "border-red-600" : "border-white"}`}
      >
        <div className="flex w-full flex-row items-center bg-black">
          <label
            className="py-0.5 pl-2 font-sf text-sm font-semibold text-white"
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
      <div
        className={`flex w-full flex-row overflow-hidden rounded-md border ${errors[formikKey] ? "border-red-600" : "border-white"}`}
      >
        <div className="flex min-w-[100px] max-w-[100px] flex-row items-center bg-[#000]">
          <label
            className="pl-2 font-sf text-sm font-semibold text-white"
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
          className={`w-full bg-white px-2 font-sf outline-none disabled:bg-opacity-80 disabled:text-gray-500`}
        >
          {options?.map((s, i) => (
            <option key={i} value={s.value ?? s.label}>
              {s.label}
            </option>
          ))}
        </FormikField>
      </div>

      <div className="min-h-[24px] w-full py-1 pr-2 text-right font-sf text-xs italic text-white">
        Not You?{" "}
        <Link className="text-[#d7fe00]" href="/api/auth/logout">
          Logout
        </Link>
      </div>
    </div>
  );
};
