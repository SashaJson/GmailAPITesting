'use strict';

const defaults = require('../../config/default');
const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');
const gmail = google.gmail('v1');
const puppeteer = require('puppeteer');

jest.setTimeout(defaults.timeOutForJest);

describe('', () => {

    it('0. List', async () => {

        const auth = await authenticate({
            keyfilePath: path.join(__dirname, 'oauth2.keys.json'),
            scopes: 'https://www.googleapis.com/auth/gmail.readonly',
        });

        google.options({auth});

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('URL');

        const con = await page.evaluate( () =>
            document.querySelector('#identifierId').setAttribute('value','automationqa1337@gmail.com'));
            document.querySelector('#identifierNext > span:nth-child(3) > span:nth-child(1)').click();
            //const cl = await page.click("li.JDAKTe:nth-child(1) > div:nth-child(1)");

        console.log(con);

        // you will received message which you id
        const res = await gmail.users.messages.get({userId: 'me', id: 'userId', format: 'full'});
        const body = res.data.payload.body;

        console.log(body);

        const encodeBody = new Buffer.from ( body.data, 'base64');
        const encodeBodyToString = encodeBody.toString();

        console.log(encodeBodyToString);

        // you will received all messages this gmail
        // const res = await gmail.users.messages.list({userId: 'me'});
        // console.log(res.data);

        return res.data;

    });

});