const path = require('path');
const fs = require('fs');

const puppeteer = require('puppeteer');

const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');

let browser;

beforeAll(async () => {
    browser = await puppeteer.launch();

    fs.mkdirSync('./screenshots')
})

jest.setTimeout(40000)

const getJsonFieldValueByUrl = async (browser, url, fieldName) => {
    const page = await browser.newPage();
    await page.goto(url);
    const parsedJson = await page.evaluate(() => JSON.parse(document.body.innerText))

    return parsedJson[fieldName]
}

describe('dfasdfsdfasdfsdfsadfas', () => {
    it('0. dfasfdsafasdfs', async () => {
        const page = await browser.newPage();
        // sometimes getnada.com can reject requests due to the anti-DDoS defense
        await page.goto('https://getnada.com');

        const { email, localStorageValue } = await page.evaluate(() => {
            const email = document.getElementsByClassName('what_to_copy')[0].innerHTML;
            const localStorageValue = window.localStorage.getItem('nada');

            return { email, localStorageValue };
        })
        console.log(email)
        console.log(localStorageValue)
    });

    it('1. dfasfdsafasdfs', async () => {
        const link = await getJsonFieldValueByUrl(browser, 'https://aws.random.cat/meow', 'file');

        console.log(link)
    });

    it('2. dfasfdsafasdfs', async () => {
        const link =  await getJsonFieldValueByUrl(browser, 'https://random.dog/woof.json', 'url');

        console.log(link)
    });

    it('3. dfasfdsafasdfs', async () => {
        const link =  await getJsonFieldValueByUrl(browser, 'https://randomfox.ca/floof', 'link');

        console.log(link)
    });

    it("", async () => {
        const gmail = google.gmail('v1');
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
// sashamiller666@gmail.com
        const subject = '🤘TEST🤘';
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            'From: Justin Beckwith <beckwith@google.com>',
            'To: Justin Beckwith <sashamiller666@gmail.com>',
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            'This is a message just to say hello.',
            'So... <b>Hello!</b>  🤘❤️😎',
        ];
        const message = messageParts.join('\n');

        // The body needs to be base64url encoded.
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

        return setTimeout(() => 0, 39000)
    });
})



