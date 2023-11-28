import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users', 'UsersController.index')
  Route.post('users', 'UsersController.postUser')
  Route.get('users/detail/:id', 'UsersController.getUserById')
  Route.put('users/:id', 'UsersController.putUserById')
  Route.delete('users/:id', 'UsersController.deleteUserById')
}).namespace('App/Controllers/Http')
