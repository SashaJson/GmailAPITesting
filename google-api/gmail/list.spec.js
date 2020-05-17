"use strict";

const defaults = require("../../config/default");
const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');
const gmail = google.gmail('v1');

jest.setTimeout(defaults.timeOutForJest);

describe("", () => {

    it("0. List", async () => {

        const auth = await authenticate({
            keyfilePath: path.join(__dirname, 'oauth2.keys.json'),
            scopes: 'https://www.googleapis.com/auth/gmail.readonly',
        });

        google.options({auth});

        // you will received message which you id
        // const res = await gmail.users.messages.get({userId: 'me', id: '172229156eb88531', format: 'full'});
        // console.log(res.data.payload.body)

        // you will received all messages this gmail
        const res = await gmail.users.messages.list({userId: "me"});
        console.log(res.data)

        return res.data;

    });
})