export interface EnvironmentVariables {
  DATABASE_URL: string;
  JWT_EXPIRES_IN: number;
  MAILER_FROM: string;
  OTP_CHARSET: string;
  OTP_LENGTH: number;
  OTP_TTL_MINUTES: number;
  SMTP_HOST: string;
  SMTP_PASSWORD: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  VERSION: string;
}
