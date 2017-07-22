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
        posted_by: {
            type: "text",
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
    key: [("created", "suggestion", "id", "posted_by"), "created"],
    clustering_order: { "created": "desc" },
    indexes: ["id"]
}