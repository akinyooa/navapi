var models = require('express-cassandra');

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
models.setDirectory(__dirname).bind(
    {
        clientOptions: {
            contactPoints: [ process.env.CASSANDRA_HOSTS ],
            protocolOptions: { port: process.env.CASSANDRA_PORT },
            keyspace: 'luna',
            queryOptions: {consistency: models.consistencies.one}
        },
        ormOptions: {
            //If your keyspace doesn't exist it will be created automatically
            //using the default replication strategy provided here.
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe',
            createKeyspace: true
        }
    },
    function(err) {
        if(err) console.log(err.message);
        else console.log(models.timeuuid());
    }
);

module.exports = models;