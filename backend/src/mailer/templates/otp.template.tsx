import { Preview, Tailwind } from "@react-email/components";
import { User } from "src/users/users.entity";

export interface OtpTemplateProps {
  code: string;
  user: User;
}

export function OtpTemplate({ code, user }: OtpTemplateProps) {
  return (
    <Tailwind>
      <html lang="es">
        <Preview>Tu código OTP: {code}</Preview>
        <body className="flex flex-col items-center justify-center text-[#404041]">
          <div className="my-10 flex w-full justify-around">
            <img
              alt="Logo del Tecnologico Nacional de Mexico"
              height={100}
              src="https://www.ensenada.tecnm.mx/wp-content/themes/tecnm/images/logo-tecnm.svg"
              width={undefined}
            />
            <img
              alt="Logo del Instituto Tecnologico de Ensenada"
              height={100}
              src="https://www.ensenada.tecnm.mx/wp-content/themes/tecnm/images/logo-ensenada.png"
              width={undefined}
            />
          </div>
          <div>
            <h1 className="text-center">Biblioteca ITE</h1>
            <h3 className="font-bold">¡Hola {user.name}!</h3>
            <p>Utiliza este código para iniciar sesión:</p>
            <div className="max-w-4xl bg-[#eeeeee] p-1">
              <p className="text-center text-3xl text-[#404041] tracking-widest">
                {code}
              </p>
            </div>
            <div className="my-10">
              <p>
                Si no solicitaste este código, ignora este mensaje o contacta a
                nuestro equipo de soporte de inmediato.
              </p>
              <p>Atentamente,</p>
              <p>Departamento de sistemas</p>
            </div>
          </div>
          <footer className="flex w-full flex-col content-center justify-center bg-[#1d3a69] py-10 text-white">
            <p className="text-center">Instituto Tecnológico de Ensenada</p>
            <address className="text-center">
              Blvd. Tecnológico #150, Ex Ejido Chapultepec, C.P. 22780,
              Ensenada, Baja California.
            </address>
          </footer>
        </body>
      </html>
    </Tailwind>
  );
}

OtpTemplate.PreviewProps = {
  user: {
    name: "John",
  },
  code: "123ABC",
  ttl: 10,
};

export default OtpTemplate;
