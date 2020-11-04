'use strict';

const defaults = require('../../config/default');
const {google} = require('googleapis');
const gmail = google.gmail('v1');
const path = require('path')
const {authenticate} = require('@google-cloud/local-auth');

jest.setTimeout(defaults.timeOutForJest);

describe('', () => {

    it('0. Send message to Alexander Shulga (JSON)', async () => {

        const auth = await authenticate({
            keyfilePath: path.join(__dirname, 'oauth2.keys.json'),
            scopes: [
                'https://mail.google.com/',
                'https://www.googleapis.com/auth/gmail.modify',
                'https://www.googleapis.com/auth/gmail.compose',
                'https://www.googleapis.com/auth/gmail.send',
            ]
        });

        google.options({auth});

        const subject = 'TEST';

        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;

        const messageParts = [
            'From: Alexander Shulga <sashamiller666+147@gmail.com>',
            'To: Alexander Json <sashamiller666@gmail.com>',
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            'This is a message just to say hello.',
            'So... <b>Hello!</b>',
        ];

        const message = messageParts.join('\n');

        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
            },
        });

        console.log(res.data);

        return setTimeout(() => 0, 39000);

    });

});