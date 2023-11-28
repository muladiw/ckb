import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('mata-kuliah', 'MataKuliahController.index')
  Route.post('mata-kuliah', 'MataKuliahController.postMataKuliah')
  Route.get('mata-kuliah/detail/:id', 'MataKuliahController.getMataKuliahById')
  Route.put('mata-kuliah/:id', 'MataKuliahController.putMataKuliahById')
  Route.delete('mata-kuliah/:id', 'MataKuliahController.deleteMataKuliahById')
}).namespace('App/Controllers/Http')
