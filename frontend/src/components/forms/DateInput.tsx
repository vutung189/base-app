import { useMemo } from "react";
import { Form } from "react-bootstrap";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FORMAT_DATE } from "utils/constants";
import { convertDateToStrDate, convertStrDateToDate } from "utils/date";

interface Props extends Omit<ReactDatePickerProps, "onChange"> {
  name: string;
  id?: string;
  minField?: string;
  maxField?: string;
  defaultValue?: any;
  placeholder?: string;
  required?: boolean;
  label?: string;
}
export const DateInput = ({
  name,
  minField,
  maxField,
  defaultValue,
  placeholder,
  required,
  label,
  ...props
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const minValue = useWatch({
    control,
    name: minField as string,
  });

  const maxValue = useWatch({
    control,
    name: maxField as string,
  });

  const minDate = useMemo(() => {
    return minField && minValue ? convertStrDateToDate(minValue) : undefined;
  }, [minValue]);

  const maxDate = useMemo(() => {
    return minField && minValue ? convertStrDateToDate(minValue) : undefined;
  }, [maxValue]);

  return (
    <>
      {label ? (
        <Form.Label>
          {label}
          <label className={required ? "required" : ""}></label>
        </Form.Label>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = field.value
            ? convertStrDateToDate(field.value)
            : undefined;
          const onChange = (date: unknown) => {
            if (date && date instanceof Date) {
              field.onChange(convertDateToStrDate(date));
            } else {
              field.onChange(date);
            }
          };

          return (
            <Form.Group>
              <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={FORMAT_DATE}
                className="form-control"
                selected={selected}
                dateFormat={FORMAT_DATE}
                onChange={onChange}
                isClearable
                {...props}
                wrapperClassName={errors?.[name] ? "border-red" : undefined}
                onBlur={field.onBlur}
              />
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors?.[name]?.message}
              </Form.Control.Feedback>
            </Form.Group>
          );
        }}
      />
    </>
  );
};
