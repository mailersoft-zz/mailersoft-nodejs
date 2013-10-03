var request = require('request');

var fn = {
    setTest: function() {
        this._test = true;
        return this;
    },

    setRecipient: function(email, name) {
        this._recipientEmail = email;
        this._recipientName = name || '';
        return this;
    },


    setApiKey: function(apiKey) {
        this._apiKey = apiKey;
        return this;
    },


    setFromName: function(name) {
        this._fromName = name;
        return this;
    },


    setFromEmail: function(email) {
        this._fromEmail = email;
        return this;
    },


    setVariables: function(variables) {
        var self = this;

        for (var name in variables)
            self.setVariable(name, variables[name]);

        return this;
    },


    setVariable: function(name, value) {
        this._variables = this._variables || {};
        this._variables[name]   = value;
        return this;
    },


    setMail: function(id) {
        this._mailId    = id;
        return this;
    },


    setType: function(type) {
        this._type  = type;
        return this;
    },


    setLanguage: function(code) {
        this._language  = code;
        return this;
    },


    addRecipient: function(recipient) {
        recipient.email = recipient.email || '';
        recipient.variables = recipient.variables || '';

        this._batchRecipients = this._batchRecipients || [];
        this._batchRecipients.push(recipient);
        return this;
    },


    addRecipients: function(recipients) {
        var self = this;

        for (var recipient in recipients)
            self.addRecipient(recipient);

        return this;
    },


    setReplyTo: function(email, name) {
        this._replyToEmail  = email;
        this._replyToName   = name || '';

        return this;
    },


    addAttachment: function(filename, content) {
        this._attachments = this._attachments || [];
        this._attachments.push({
            filename: filename,
            content: content
        });

        return this;
    },


    send: function() {
        var data = {
            fromName: this._fromName || '',
            fromEmail: this._fromEmail || '',
            apiKey: this._apiKey || '',
            type: this._type || '',
            mailId: this._mailId || '',
            replyToEmail: this._replyToEmail || '',
            replyToName: this._replyToName || '',
            language: this._language || ''
        };

        if (this._batchRecipients) {
            data.batch  = this._batchRecipients;

        } else {
            data.recipientName  = this._recipientName || '';
            data.recipientEmail = this._recipientEmail || ''
            data.variables = this._variables || {};
            data.attachments = this._attachments || [];
        }


        request({
            uri: 'https://' + (this._test ? 'test' : 'api') + '.mailersoft.com/api/v1/messages/',
            method: 'POST',
            json: true,
            form: data
        }, function(error, response, body) {
            if (error) {
                console.log(error)

            } else {
                console.log(body)
            }
        });
    }
};

exports.Mailersoft = fn;