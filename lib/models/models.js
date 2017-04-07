var models = require('express-cassandra');

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
models.setDirectory(__dirname).bind(
    {
        clientOptions: {
            contactPoints: ['127.0.0.1'],
            protocolOptions: { port: 9042 },
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
            migration: 'drop',
            createKeyspace: true
        }
    },
    function(err) {
        if(err) console.log(err.message);
        else console.log(models.timeuuid());
    }
);

module.exports = models;