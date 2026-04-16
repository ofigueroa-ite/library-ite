export interface EnvironmentVariables {
  APP_CORS_ORIGINS: string[];
  APP_VERSION: string;
  AUTH_JWT_EXPIRES_IN: number;
  DATABASE_NAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT: number;
  DATABASE_URL: string;
  DATABASE_USERNAME: string;
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
