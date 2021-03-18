// Crear tabla


//const {options} =require('./db/mysql.db')
const {sqlite3Connect} =require('./db/sqlite3.db')
const knex = require('knex')(sqlite3Connect)

// Crea tabla
/*knex.schema.createTable('gatitos', table => {
    table.increments('id')
    table.string('name',20)
    table.integer('age')
})
.then(()=> console.log('tabla creada'))
.catch((error) => console.log(error))
.finally(()=> knex.destroy())
*/

/// Insertar datos a la tabla

const gaticos = [
    {
    name : "Pito",
    age : 12
    },
    {
        name : "Pitito",
        age : 14
        }
]

knex('gatitos').insert(gaticos)
.then(()=> console.log('tabla creada'))
.catch((error) => console.log(error))
.finally(()=> knex.destroy())

// Select de datos
/*knex.select('*').from('gatitos')
    .then((rows:ResolveResult<TResult>) => {
        for (row of rows){
            console.log(row.name)
        }
    })
    .catch((err) => console.log(err))
    .finally(() => knex.destroy())

    */