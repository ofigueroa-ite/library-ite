import {
  Button,
  Paper,
  PinInput,
  Text,
  TextInput,
  Title,
  Transition,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { parse } from "cookie";
import Joi from "joi";
import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/page";
import { useSignInMutation, useVerifyMutation } from "./auth.api";

const authMiddleware: Route.MiddlewareFunction = ({ request }) => {
  const cookies = parse(request.headers.get("cookie") ?? "");
  const token = cookies.token;

  if (token) {
    throw redirect("/dashboard");
  }
};

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export default function SignInPage() {
  const [signIn, { isLoading: isSignInLoading }] = useSignInMutation();
  const [verify, { isLoading: isVerifyLoading }] = useVerifyMutation();
  const [isSignInFormMounted, setIsSignInFormMounted] = useState<boolean>(true);
  const [isVerifyFormMounted, setIsVerifyFormMounted] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const signInFormSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  const signInForm = useForm({
    initialValues: {
      email: "",
    },
    validate: schemaResolver(signInFormSchema, { sync: true }),
  });

  const handleSignInFormSubmit = async (values) => {
    try {
      await signIn(values.email as string);
    } catch (error) {
      console.log(error);
    }
    setIsSignInFormMounted(false);
    setIsVerifyFormMounted(true);
  };

  const veryfyFormSchema = Joi.object({
    otp: Joi.string().length(6).required(),
  });
  const verifyForm = useForm({
    initialValues: {
      otp: "",
    },
    validate: schemaResolver(veryfyFormSchema, { sync: true }),
  });

  const handleVerifyFormSubmit = async (values) => {
    try {
      await verify({ email: signInForm.getValues().email, otp: values.otp });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoBack = () => {
    signInForm.reset();
    verifyForm.reset();
    setIsSignInFormMounted(true);
    setIsVerifyFormMounted(false);
  };

  return (
    <div className="flex h-dvh items-center justify-center">
      <Transition
        duration={300}
        enterDelay={400}
        keepMounted
        mounted={isSignInFormMounted}
        transition="slide-right"
      >
        {(styles) => (
          <div className="flex flex-col gap-10" style={styles}>
            <Title order={1} ta="center">
              Biblioteca ITE
            </Title>
            <Paper bg="iteGray.0" className="p-8">
              <form
                className="flex flex-col items-center justify-center gap-5"
                onSubmit={signInForm.onSubmit((values) =>
                  handleSignInFormSubmit(values)
                )}
              >
                <Title order={3} ta="center">
                  Iniciar Sesión
                </Title>
                <TextInput
                  key={signInForm.key("email")}
                  label="Correo electrónico"
                  placeholder="tucorreo@ite.edu.mx"
                  withAsterisk
                  {...signInForm.getInputProps("email")}
                />
                <Button fullWidth loading={isSignInLoading} type="submit">
                  Enviar
                </Button>
              </form>
            </Paper>
          </div>
        )}
      </Transition>
      <Transition
        duration={300}
        enterDelay={400}
        keepMounted
        mounted={isVerifyFormMounted}
        transition="slide-left"
      >
        {(styles) => (
          <div className="flex flex-col gap-10" style={styles}>
            <Text>
              Se ha enviado un código de verificación al correo&nbsp;
              <Text fw={700} span>
                {signInForm.values.email}
              </Text>
            </Text>
            <Paper bg="iteGray.0" className="p-8">
              <Button
                className="mb-5"
                onClick={handleGoBack}
                size="sm"
                variant="transparent"
              >
                Regresar
              </Button>
              <form
                className="flex flex-col items-center justify-center gap-5"
                onSubmit={verifyForm.onSubmit((values) =>
                  handleVerifyFormSubmit(values)
                )}
              >
                <PinInput
                  length={6}
                  placeholder=""
                  {...verifyForm.getInputProps("otp")}
                />
                <Button fullWidth loading={isVerifyLoading} type="submit">
                  Verificar
                </Button>
              </form>
              <div className="mt-5 flex items-center justify-center">
                <Text size="sm">No recibiste el código?</Text>
                <Button
                  loading={isSignInLoading}
                  onClick={() => handleSignInFormSubmit(signInForm.getValues())}
                  size="sm"
                  variant="transparent"
                >
                  Reenviar
                </Button>
              </div>
            </Paper>
          </div>
        )}
      </Transition>
    </div>
  );
}
