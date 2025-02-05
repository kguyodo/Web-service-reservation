import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import Customer from '#models/customer'
import { customerValidator } from '#validators/customer'

export default class CustomersController {
  /**
   * @getCustomers
   * @param {HttpContext} - HTTP context object containing response
   * @description Returns all customers from PostgreSQL database
   * @responseBody 200 - Array of Customer objects - @type(Customer[])
   * @responseBody 500 - Internal Server Error
   */
  async getCustomers({ response }: HttpContext) {
    try {
      const customers = await Customer.all()
      return response.json(customers)
    } catch (error) {
      throw new Exception('Internal error', { status: 500 })
    }
  }

  /**
   * @getOneCustomer
   * @param {HttpContext} - HTTP context object containing request and response
   * @description Returns one customer with specific customer id (inside URL) from PostgreSQL database
   * @responseBody 200 - Customer object - @type(Customer)
   * @responseBody 404 - Customer not found
   * @responseBody 500 - Internal Server Error
   */
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

  /**
   * @postCustomer
   * @param {HttpContext} - HTTP context object containing request and response
   * @description Create new Customer in database
   * @requestBody Customer - Customer data to be created - @type(Customer) @required
   * @responseBody 200 - Newly created Customer - @type(Customer)
   * @responseBody 400 - Bad Request
   * @responseBody 500 - Internal Server Error
   */
  async postCustomer({ request, response }: HttpContext) {
    const customerData = request.body() as Customer
    const newCustomer = await Customer.create(customerData)
    return response.json(newCustomer)
  }

  /**
   * @postCustomer
   * @param {HttpContext} - HTTP context object containing request and response
   * @description Update Customer in database
   * @requestBody Customer - Customer data to be modified - @type(Customer) @required
   * @responseBody 200 - Updated Customer - @type(Customer)
   * @responseBody 400 - Bad Request
   * @responseBody 404 - Customer not found
   * @responseBody 500 - Internal Server Error
   */
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
