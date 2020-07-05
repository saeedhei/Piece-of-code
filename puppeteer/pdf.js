import {resolve} from 'path';
import Num2persian from 'num2persian';
import {stringify} from 'querystring';
const fs = require('fs');
const puppeteer = require('puppeteer'); // not es6
const uperroot = resolve('module', '../../'); // /home/saeed/projects/ntba/module to  /home/saeed/projects

const unix = Math.round(+new Date() / 1000);


async function runProPDF(msgchatid, options) {
  const dir = `${uperroot}/temp-pdf/${msgchatid}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  options = options || {};

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let currency = 'ریال';
  if (options.invoice_docs.invoice.invoice_currency == 'تومان') {
    currency = 'تومان';
  }

  let postData = {
    invoice_rows: options.invoice_rows,
    invoice_docs: JSON.stringify(options.invoice_docs),
    invoice_payment_amount: `${parseInt(options.invoice_payment_amount)}`,
    invoice_payment_amount_letters: `${Num2persian(parseInt(options.invoice_payment_amount))} ${currency}`
    // invoice_number: options.invoice_number,
    // invoice_date: options.invoice_date,
    // seller_name: options.seller_name,
    // seller_address: options.seller_address,
    // seller_phone: options.seller_phone,
    // buyer_name: options.buyer_name,
    // buyer_code: options.buyer_code,
    // buyer_phone: options.buyer_phone,
    // buyer_fax: options.buyer_fax,
    // buyer_address: options.buyer_address,
    // product_row_number: '1',
    // product_code: options.product_code,
    // product_title_description: options.product_title_description,
    // product_amount: options.product_amount,
    // product_unit: options.product_unit,
    // product_unit_price: options.product_unit_price,
    // product_total_price: parseInt(options.product_unit_price) * parseInt(options.product_amount),
    // total: parseInt(options.product_unit_price) * parseInt(options.product_amount),
    // payment_amount: parseInt(options.product_unit_price) * parseInt(options.product_amount),
    // payment_amount_letters: `${Num2persian(parseInt(options.product_unit_price) * parseInt(options.product_amount) * 10)} ریال`,
    // product_description: options.product_description
  };

  await page.setRequestInterception(true);
  page.once('request', request => {
    var data = {
      'method': 'POST',
      'postData': stringify(postData),
      'headers': {
        ...request.headers(),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    };
    request.continue(data);
    // Immediately disable setRequestInterception, or all other requests will hang
    page.setRequestInterception(false);
  });

  const response = await page.goto(process.env.ARAZ_URL_VIP_PRINT, {waitUntil: 'networkidle2', timeout: 0});
  await page.setContent((await response.buffer()).toString('utf8'));
  await page.evaluateHandle('document.fonts.ready');
  await page.pdf({
    path: `${uperroot}/temp-pdf/${msgchatid}/${msgchatid}-${unix}.pdf`,
    printBackground: true,
    format: 'A5',
    landscape: true,
    margin: {
      top: "0cm",
      right: "0cm",
      bottom: "0cm",
      left: "0cm"
    }
  });
}

export {runProPDF};
