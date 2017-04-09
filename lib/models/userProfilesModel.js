module.exports = {
    fields: {
        id: {
            type: "uuid",
            default: {
                "$db_function": "uuid()"
            }
        },
        email: {
            type: "text",
            rule: {
                // validator: function(value) {
                //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                //     return re.test(email);
                // },
                required: true
            }
        },
        firstName: {
            type: "text",
            rule: {
                required: true
            }
        },
        lastName: {
            type: "text",
            rule: {
                required: true
            }
        },
        displayName: {
            type: "text",
            rule: {
                required: true
            }
        },
        fbid: "text",
        picture: "text",
        description: "text",
        devices: {
            type: "set",
            typeDef: "<text>"
        },
        created: {
            type: "timestamp",
            default: {
                "$db_function": "toTimestamp(now())"
            }
        }
    },
    key: [["id"], "email", "fbid"]
}