import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { InputHTMLAttributes, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Control, FieldErrors, useFormContext } from "react-hook-form";

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  refCallback?: any;
  errors: FieldErrors;
  control?: Control<any>;
  register?: any;
  className?: string;
  textGroup?: any;
}

/* Password Input */
const PasswordInput = ({
  name,
  placeholder,
  refCallback,
  errors,
  register,
  className,
  textGroup,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <InputGroup className="mb-0">
        {!!textGroup && <InputGroup.Text>{textGroup}</InputGroup.Text>}
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          id={name}
          as="input"
          ref={(r: HTMLInputElement) => {
            if (refCallback) refCallback(r);
          }}
          className={className}
          isInvalid={errors && errors[name] ? true : false}
          {...(register ? register(name) : {})}
          autoComplete={name}
        />
        <div
          className={classNames(
            "input-group-text",
            "input-group-password",
            "cursor-pointer",
            {
              "show-password": showPassword,
            }
          )}
          data-password={showPassword ? "true" : "false"}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </div>
      </InputGroup>
    </>
  );
};

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  containerClass?: string;
  refCallback?: any;
  children?: any;
  readOnly?: boolean;
  value?: any;
  disabled?: boolean;
  textGroup?: any;
}

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  className,
  labelClassName,
  containerClass,
  children,
  value,
  readOnly,
  disabled,
  textGroup,
  ...otherProps
}: FormInputProps) => {
  // handle input type
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const comp =
    type === "textarea" ? "textarea" : type === "select" ? "select" : "input";
  return (
    <>
      {type === "hidden" ? (
        <input
          type={type}
          {...(register ? register(name) : {})}
          {...otherProps}
        />
      ) : (
        <>
          {type === "password" ? (
            <>
              <Form.Group className={containerClass}>
                {label ? (
                  <>
                    <Form.Label className={labelClassName}>{label}</Form.Label>
                    {children}
                  </>
                ) : null}
                <PasswordInput
                  name={name}
                  placeholder={placeholder}
                  errors={errors!}
                  register={register}
                  className={className}
                  textGroup={textGroup}
                />
                {errors && errors[name] ? (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    <>{errors?.[name]?.["message"]}</>
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </>
          ) : (
            <>
              {type === "checkbox" || type === "radio" ? (
                <>
                  <Form.Group className={containerClass}>
                    <Form.Check
                      type={type}
                      label={label}
                      id={name}
                      value={value}
                      readOnly={readOnly}
                      className={className}
                      isInvalid={!!errors && !!errors[name]}
                      {...(register ? register(name) : {})}
                      {...otherProps}
                      disabled={disabled}
                    />

                    {errors && errors[name] ? (
                      <Form.Control.Feedback type="invalid">
                        <>{errors?.[name]?.["message"]}</>
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </>
              ) : (
                <Form.Group className={containerClass}>
                  {label ? (
                    <Form.Label className={labelClassName}>{label}</Form.Label>
                  ) : null}
                  <InputGroup>
                    {!!textGroup && (
                      <InputGroup.Text>{textGroup}</InputGroup.Text>
                    )}
                    <Form.Control
                      {...otherProps}
                      type={type}
                      placeholder={placeholder}
                      id={name}
                      maxLength={255}
                      as={comp}
                      size={undefined}
                      disabled={disabled}
                      className={className}
                      isInvalid={!!errors && !!errors[name]}
                      {...(register ? register(name) : {})}
                      autoComplete={name}
                    >
                      {children ? children : null}
                    </Form.Control>
                  </InputGroup>
                  {errors && !!errors[name] ? (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      <>{errors?.[name]?.["message"]}</>
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default FormInput;
