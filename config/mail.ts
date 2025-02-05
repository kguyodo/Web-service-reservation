import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

export default defineConfig({
  default: env.get('NODE_ENV') === 'production' ? 'smtp' : 'mailhog',
  mailers: {
    mailhog: transports.smtp({
      host: env.get('SMTP_HOST', '127.0.0.1'),
      port: env.get('SMTP_PORT', '1025'),
      secure: false,
    }),

    smtp: transports.smtp({
      host: env.get('SMTP_HOST_PROD', 'smtp.exemple.com'),
      port: env.get('SMTP_PORT_PROD', '587'),
      auth: {
        user: env.get('SMTP_USERNAME_PROD', 'user@example.com'),
        pass: env.get('SMTP_PASSWORD_PROD', 'password_secure'),
        type: 'login',
      },
      secure: true,
    }),
  },

  from: {
    address: env.get('MAIL_FROM_ADDRESS', 'noreply@illusion.fr'),
    name: env.get('MAIL_FROM_NAME', 'Illusion'),
  },
})
