import { Body, Html, Preview, Text } from "@react-email/components";
import { User } from "src/users/users.entity";

export interface OtpTemplateProps {
  code: string;
  user: User;
}

export function OtpTemplate({ code, user }: OtpTemplateProps) {
  return (
    <Html>
      <Preview>Your OTP code is {code}</Preview>
      <Body>
        <Text>Hello {user.name}</Text>
        <Text>Your OTP code is {code}</Text>
      </Body>
    </Html>
  );
}
