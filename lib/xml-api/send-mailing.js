var validator = require(__dirname + '/../validator');

module.exports = {

    options: {
        mailingId: {
            loneArg: true,
            required: true,
            assert: validator.coercePositiveInteger
        },
        recipientEmail: {
            loneArg: true,
            required: true,
            assert: validator.coerceString
        },
        columns: {
            required: false,
            assert: validator.assertScalarHash
        }
    },

    generator: function (options) {

        var subnode, key;

        var params = {"MailingId": options.mailingId, "RecipientEmail": options.recipientEmail};

        if (typeof options.columns !== 'undefined') {
            subnode = [];
            for (key in options.columns) {
                subnode.push({
                    NAME: key,
                    VALUE: options.columns[key]
                });
            }
            params["COLUMNS"] = {"COLUMN": subnode};
        }

        return params;
    },

    result: {} // no result to send on success
};

