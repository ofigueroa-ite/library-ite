export interface EnvironmentVariables {
  APP_DATABASE_URL: string;
  APP_VERSION: string;
  AUTH_JWT_EXPIRES_IN: number;
  MAILER_FROM: string;
  MAILER_SMTP_HOST: string;
  MAILER_SMTP_PASSWORD: string;
  MAILER_SMTP_PORT: number;
  MAILER_SMTP_USER: string;
  OTP_CHARSET: string;
  OTP_LENGTH: number;
  OTP_MAX_ATTEMPTS: number;
  OTP_TTL_MINUTES: number;
  SEEDER_SUPER_ADMIN_EMAIL: string;
  SEEDER_SUPER_ADMIN_NAME: string;
  SEEDER_SUPER_ADMIN_ROLE_NAME: string;
  SEEDER_SUPER_ADMIN_SURNAME: string;
}
