import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('nilai-mahasiswa', 'NilaiMahasiswaController.index')
  Route.post('nilai-mahasiswa', 'NilaiMahasiswaController.postNilaiMahasiswa')
  Route.get('nilai-mahasiswa/detail/:id', 'NilaiMahasiswaController.getNilaiMahasiswaById')
  Route.put('nilai-mahasiswa/:id', 'NilaiMahasiswaController.putNilaiMahasiswaById')
  Route.delete('nilai-mahasiswa/:id', 'NilaiMahasiswaController.deleteNilaiMahasiswaById')
}).namespace('App/Controllers/Http')
