import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import Customer from '#models/customer'
import { customerValidator } from '#validators/customer'

export default class CustomersController {
  async getCustomers({ response }: HttpContext) {
    try {
      const customers = await Customer.all()
      return response.json(customers)
    } catch (error) {
      throw new Exception('Internal error', { status: 500 })
    }
  }

  async getOneCustomer({ request, response }: HttpContext) {
    try {
      const customer = await Customer.find(request.param('id'))
      if (!customer) {
        return response.notFound(`Customer with id ${request.param('id')} does not exist`)
      }

      return response.json(customer)
    } catch (error) {
      throw new Exception('Internal error', { status: 500 })
    }
  }

  async postCustomer({ request, response }: HttpContext) {
    const customerData = request.body() as Customer
    const newCustomer = await Customer.create(customerData)
    return response.json(newCustomer)
  }

  async putCustomer({ request, response }: HttpContext) {
    const customer = await Customer.find(request.param('id'))
    if (!customer) {
      return response.notFound(`Customer with id ${request.param('id')} does not exist`)
    }
    const payload = await customerValidator.validate(request.body() as Customer)
    const newCustomer = await customer
      .merge({
        ...payload,
      })
      .save()
    return response.json(newCustomer)
  }
}
