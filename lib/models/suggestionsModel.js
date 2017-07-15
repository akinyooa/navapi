module.exports = {
    fields: {
        id: {
            type: "uuid",
            default: {
                "$db_function": "uuid()"
            }
        },
        suggestion: {
            type: "text",
            rule: {
                required: true
            }
        },
        postedBy: {
            type:"text",
            rule: {
                required: true
            }
        },
        created: {
            type: "timestamp",
            default: {
                "$db_function": "toTimestamp(now())"
            }
        }
    },
    key: ["id", "postedBy"]
}