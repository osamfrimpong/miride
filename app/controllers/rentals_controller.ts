import Rental from '#models/rental'
import type { HttpContext } from '@adonisjs/core/http'

export default class RentalsController {
  /**
   * Display a list of resource
   */
  async index({ view, auth }: HttpContext) {
    const rentals = await Rental.query()
      .where('userId', auth.user!.id)
      .preload('car')
      .preload('user')
      .preload('rentProvider')
    return view.render('user/rentals/index', { rentals: rentals })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const { carId, rentedBy, price, startedAt, endedAt } = request.all()
    await Rental.create({
      userId: auth.user!.id,
      carId: carId,
      rentedBy: rentedBy,
      price: price,
      startedAt: startedAt,
      endedAt: endedAt,
    })
    return response.redirect().toRoute('user.rentals.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const rental = await Rental.query()
      .where('id', params.id)
      .preload('car')
      .preload('user')
      .preload('rentProvider')
      .first()
    return view.render('user/rentals/show', { rental: rental })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const rental = await Rental.query()
      .where('id', params.id)
      .preload('car')
      .preload('user')
      .preload('rentProvider')
      .first()
    return view.render('user/rentals/edit', { rental: rental })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { price, startedAt, endedAt, status } = request.all()
    await Rental.updateOrCreate(
      { id: params.id },
      { price: price, startedAt: startedAt, endedAt: endedAt, status: status }
    )
    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const rental = await Rental.findOrFail(params.id)
    rental.delete()
    return response.redirect().back()
  }
}
