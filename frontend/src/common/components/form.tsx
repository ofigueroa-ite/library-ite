import type { UseFormReturnType } from "@mantine/form";
import { useForm } from "@mantine/form";
import Joi from "joi";

export interface FormProps<T>
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "children" | "onSubmit"> {
  children?: (form: UseFormReturnType<T>) => React.ReactNode;
  initialValues?: T;
  onSubmit: (values: T) => void;
  schema?: Joi.ObjectSchema<T>;
}

export function Form<T>({
  onSubmit,
  initialValues,
  children,
  schema,
  ...props
}: FormProps<T>) {
  const form = useForm<T>({
    initialValues,
    validate: (values) => {
      const result = schema?.validate(values);
      console.log(result);
      return result?.error?.details?.reduce<Record<string, string>>(
        (acc, detail) => {
          const key = detail.path.join(".");
          acc[key] = detail.message;
          return acc;
        },
        {}
      );
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)} {...props}>
      {children ? children(form) : null}
    </form>
  );
}
