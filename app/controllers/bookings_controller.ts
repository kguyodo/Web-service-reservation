import Booking from '#models/booking'
import { createBookingValidator, updateBookingValidator } from '#validators/booking'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class BookingsController {
  /**
   * @getBookings
   * @param {HttpContext} - HTTP context object containing response
   * @description Retrieve all bookings from the database
   * @responseBody 200 - <Booking[]>
   * @responseBody 500 - Internal server error
   */
  async getBookings({ response }: HttpContext) {
    try {
      const bookings = await Booking.all()
      return response.json(bookings)
    } catch (error) {
      throw new Exception('An error occurred while fetching all bookings', { status: 500 })
    }
  }

  /**
   * @getOneBooking
   * @description Retrieve a single booking by ID
   * @param {HttpContext} - HTTP context object containing params and response
   * @response id - Booking ID to fetch - @type(HttpContext) @required
   * @responseBody 200 - <Booking>
   * @responseBody 404 - Booking not found
   * @responseBody 500 - Internal server error
   */
  async getOneBooking({ response, params }: HttpContext) {
    try {
      const booking = await Booking.find(params.id)
      if (!booking) {
        return response.notFound({ message: `Booking with id ${params.id} not found` })
      }
      return response.json(booking)
    } catch (error) {
      throw new Exception(`An error occurred while fetching the booking : ${params.id}`, {
        status: 500,
      })
    }
  }

  /**
   * @createBooking
   * @description Create a new booking in the database
   * @param {HttpContext} - HTTP context object containing request and response
   * @requestBody - Booking data to create - @type(HttpContext) @required
   * @responseBody 201 - <Booking>
   * @responseBody 422 - Validation error
   * @responseBody 500 - Internal server error
   */
  async createBooking({ request, response }: HttpContext) {
    const booking = new Booking()
    try {
      const bookingData = await createBookingValidator.validate(request.body())
      Object.assign(booking, bookingData)
      booking.startDateTime = DateTime.fromJSDate(bookingData.startDateTime)
      const savedBooking = await Booking.create(booking)
      return response.created(savedBooking)
    } catch (error) {
      throw new Exception(error, { status: error.status || 500 })
    }
  }

  /**
   * @updateBooking
   * @description Update an existing booking by ID
   * @param {HttpContext} - HTTP context object containing request, response and params
   * @response id - Booking ID to update - @type(HttpContext) @required
   * @requestBody - Updated booking data - @type(HttpContext) @required
   * @responseBody 200 - <Booking>
   * @responseBody 404 - Booking not found
   * @responseBody 500 - Internal server error
   */
  async updateBooking({ request, response, params }: HttpContext) {
    try {
      const { startDateTime, ...bookingData } = await updateBookingValidator.validate(
        request.body()
      )

      const bookingToUpdate = await Booking.find(params.id)
      if (!bookingToUpdate) {
        return response.notFound({ message: `Booking with id ${params.id} not found` })
      }

      const data = bookingToUpdate.merge(
        startDateTime
          ? {
              ...bookingData,
              startDateTime: DateTime.fromJSDate(startDateTime),
            }
          : bookingData
      )
      const updatedBooking = await data.save()
      return response.ok(updatedBooking)
    } catch (error) {
      throw new Exception(error, { status: error.status || 500 })
    }
  }

  /**
   * @deleteBooking
   * @description Delete a booking by ID
   * @param {HttpContext} - HTTP context object containing response and params
   * @response id - Booking ID to delete - @type(HttpContext) @required
   * @responseBody 204 - No content, booking deleted successfully
   * @responseBody 404 - Booking not found
   * @responseBody 500 - Internal server error
   */
  async deleteBooking({ response, params }: HttpContext) {
    try {
      const booking = await Booking.find(params.id)
      if (!booking) {
        return response.notFound({ message: `Booking with id ${params.id} not found` })
      }
      await booking.delete()
      return response.status(204)
    } catch (error) {
      throw new Exception(`An error occurred while deleting the booking : ${params.id}`, {
        status: 500,
      })
    }
  }
}
