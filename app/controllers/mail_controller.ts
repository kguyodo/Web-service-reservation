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

  public async sendConfirmationEmail(bookingInfo: {
    startDateTime: string
    durationTime: number
    playersNumber: number
    experience: string
    comment: string
    userEmail: string
  }) {
    try {
      await mail.send((message) => {
        message.to(bookingInfo.userEmail).subject('Confirmation de Réservation')
          .html(`<h1>Confirmation de Réservation</h1>
          <p>Merci d'avoir réservé avec nous. Voici les détails de votre réservation :</p>
          <p>Expérience : ${bookingInfo.experience}</p>
          <p>Date et Heure : ${bookingInfo.startDateTime}</p>
          <p>Durée : ${bookingInfo.durationTime} min</p>
          <p>Nombre de joueurs : ${bookingInfo.playersNumber}</p>
          <p>Votre commentaire : ${bookingInfo.comment}</p>`)
      })
    } catch (error) {
      console.error('Error sending email:', error.message)
      throw new Error('Failed to send confirmation email')
    }
  }
}
