import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/render";
import { createTransport, Transporter } from "nodemailer";
import { EnvironmentVariables } from "src/common/interfaces/environment-variables.interface";
import { SendMailOptions } from "./interfaces/send-mail-options.interface";

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;
  private readonly from: string;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>
  ) {
    this.from = this.configService.get("MAILER_FROM", { infer: true });
    this.transporter = createTransport({
      host: this.configService.get("MAILER_SMTP_HOST", { infer: true }),
      port: this.configService.get("MAILER_SMTP_PORT", { infer: true }),
      secure: false,
      auth: {
        user: this.configService.get("MAILER_SMTP_USER", { infer: true }),
        pass: this.configService.get("MAILER_SMTP_PASSWORD", { infer: true }),
      },
    });
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }

  renderTemplate(template: React.ReactElement): Promise<string> {
    return render(template);
  }
}
