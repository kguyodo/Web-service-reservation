import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

export default defineConfig({
  default: 'smtp',
  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST', '127.0.0.1'),
      port: env.get('SMTP_PORT', '1025'),
      secure: false,
    }),
  },

  from: {
    address: env.get('MAIL_FROM_ADDRESS', 'noreply@illusion.fr'),
    name: env.get('MAIL_FROM_NAME', 'Illusion'),
  },
})
