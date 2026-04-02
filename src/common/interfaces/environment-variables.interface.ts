export interface EnvironmentVariables {
  DATABASE_URL: string;
  JWT_EXPIRES_IN: number;
  MAILER_FROM: string;
  OTP_CHARSET: string;
  OTP_LENGTH: number;
  OTP_TTL_MINUTES: number;
  SEEDER_SUPER_ADMIN_EMAIL: string;
  SEEDER_SUPER_ADMIN_NAME: string;
  SEEDER_SUPER_ADMIN_ROLE_NAME: string;
  SEEDER_SUPER_ADMIN_SURNAME: string;
  SMTP_HOST: string;
  SMTP_PASSWORD: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  VERSION: string;
}
