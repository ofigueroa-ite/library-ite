import { Button } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { useForm } from "@mantine/form";
import Joi from "joi";

export interface FormProps<T extends object>
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "children" | "onSubmit"> {
  children?: (form: UseFormReturnType<T>) => React.ReactNode;
  initialValues?: Partial<T>;
  onCancel?: () => void;
  onSubmit?: (values: T) => void;
  schema?: Joi.ObjectSchema<T>;
}

export function Form<T extends object>({
  onSubmit,
  onCancel,
  initialValues,
  children,
  schema,
  ...props
}: FormProps<T>) {
  const form = useForm<T>({
    initialValues: initialValues as T,
    validate: (values) => {
      const result = schema?.validate(values);
      return (
        result?.error?.details?.reduce<Record<string, string>>(
          (acc, detail) => {
            const key = detail.path.join(".");
            acc[key] = detail.message;
            return acc;
          },
          {}
        ) ?? {}
      );
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(() => {
        onSubmit?.(form.values);
      })}
      {...props}
    >
      <div className="flex flex-col gap-3">
        {children ? children(form) : null}
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} variant="subtle">
            Cancelar
          </Button>
          <Button type="submit">Aceptar</Button>
        </div>
      </div>
    </form>
  );
}
