const sqlite3Connect = {
    client: 'sqlite3',
    connection: () => ({
        filename:  "./gatitos.sqlite"
    })
}


module.exports = {
    sqlite3Connect
}