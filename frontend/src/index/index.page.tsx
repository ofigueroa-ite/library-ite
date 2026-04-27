import { Button, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { useMeQuery } from "~/auth/auth.api";
import AlbatrossIteSvg from "../common/components/svg/albatross-ite";
import classes from "./index.module.css";

export default function IndexPage() {
  const { data } = useMeQuery(undefined, { skipAuthRedirect: true });
  const navigate = useNavigate();
  return (
    <>
      <title>ITE - Inicio</title>
      <div className="flex h-dvh flex-col">
        <div className="flex w-full justify-end gap-3 p-3">
          <Button>Entrada</Button>
          <Button onClick={() => navigate(data ? "/dashboard" : "/sign-in")}>
            {data ? "Panel" : "Iniciar Sesión"}
          </Button>
        </div>
        <div className="flex grow flex-col items-center justify-center">
          <Title>Biblioteca ITE</Title>
          <AlbatrossIteSvg className={classes.albatross} />
        </div>
        <footer className="flex w-full flex-col content-center justify-center bg-[#1d3a69] py-10 text-white">
          <p className="text-center">Instituto Tecnológico de Ensenada</p>
          <address className="text-center">
            Blvd. Tecnológico #150, Ex Ejido Chapultepec, C.P. 22780, Ensenada,
            Baja California.
          </address>
        </footer>
      </div>
    </>
  );
}
