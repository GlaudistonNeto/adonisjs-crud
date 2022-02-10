// import { v4 as uuidv4 } from 'uuid'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Users from 'Database/migrations/1644449834325_users'

// import Application from '@ioc:Adonis/Core/Application'

export default class UsersController {
  // private validationOptions = {
  //   types: ['image'],
  //   size: '2mb',
  // }
  public async store({ request, response }: HttpContextContract) {
    // const image = request.file('image', this.validationOptions)

    // if (image) {
    //   const imageName = `${uuidv4()}.${image.extname}`

    //   await image.move(Application.tmpPath('uploads'), {
    //     name: imageName,
    //   })

    //   body.image = imageName
    // }

    const body = request.body()

    const user = await User.create(body)

    response.status(201)
    return {
      message: 'User created successfully!',
      data: user,
    }
  }

  public async index() {
    const users = await User.all()

    return {
      data: users,
    }
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return {
      data: user,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()
    return {
      message: 'User Deleted Successfully!',
      data: user,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const user = await User.findOrFail(params.id)

    user.name = body.name
    user.email = body.email
    // user.password = body.password

    //   if (user.image != body.image || !user.image) {
    //   const image = request.file('image', this.validationOptions)

    //     if (image) {
    //     await image.move(Application.tmpPath('uploads'), {
    //       name: imageName,
    //    }
    //     user.image = imageName
    //  }

    await user.save()

    return {
      message: 'User updated!',
      data: user,
    }
  }
}
