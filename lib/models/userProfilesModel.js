module.exports = {
    fields: {
        id:
        {
            type: "uuid",
            default:
            {
                "$db_function": "uuid()"
            }
        },
        email: "text",
        firstName: "text",
        lastName: "text",
        diaplayName: "text",
        fbid: "text",
        picture: "text",
        description: "text",
        devices:
        {
            type: "set",
            typeDef: "<text>"
        },
        created: {
            type: "timestamp",
            default:
            {
                "$db_function": "toTimestamp(now())"
            }
        }
    },
    key: [["id"], "email", "fbid"]
}