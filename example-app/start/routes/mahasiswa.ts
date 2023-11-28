import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('mahasiswa', 'MahasiswaController.index')
  Route.post('mahasiswa', 'MahasiswaController.postMahasiswa')
  Route.get('mahasiswa/detail/:id', 'MahasiswaController.getMahasiswaById')
  Route.put('mahasiswa/:id', 'MahasiswaController.putMahasiswaById')
  Route.delete('mahasiswa/:id', 'MahasiswaController.deleteMahasiswaById')
}).namespace('App/Controllers/Http')
