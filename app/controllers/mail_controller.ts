import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class MailController {
  async sendEmail({ response }: HttpContext) {
    try {
      await mail.send((message) => {
        message
          .to('test@example.com')
          .subject('Test MailHog')
          .html('<h1>Hello from AdonisJS v7!</h1>')
      })
      return response.status(200)
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }
}
