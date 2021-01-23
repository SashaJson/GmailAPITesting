'use strict';

const {timeOutForJest} = require('../../config/default');

const path = require('path');

const {google} = require('googleapis'),
    {authenticate} = require('@google-cloud/local-auth'),
    gmail = google.gmail('v1');

jest.setTimeout(timeOutForJest);

describe('Automation testing watch message in box', () => {

    it('0. Watch all message in box', async () => {

        const auth = await authenticate({
            keyfilePath: path.join(__dirname, 'oauth2.keys.json'),
            scopes: [
                'https://mail.google.com/',
                'https://www.googleapis.com/auth/gmail.metadata',
                'https://www.googleapis.com/auth/gmail.modify',
                'https://www.googleapis.com/auth/gmail.readonly',
            ],
        });

        google.options({auth});

        const res = await gmail.users.watch({
            userId: 'me',
            requestBody: {
                topicName: 'projects/hip-catalyst-277220/topics/gmail',
            },
        });

        console.log(res.data);

        return res.data;

    });

}); // describe (Automation testing watch message in box)