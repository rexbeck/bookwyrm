/**
 * scraper-javascript.js
 * To run this script, copy and paste `node scraper-javascript.js` in the terminal
 */

import { load } from 'cheerio';



(async () => {
    const url = 'https://dnd5e.wikidot.com';
    const response = await fetch(url);

    const $ = load(await response.text());

    const title = $('h1').text();
    const text = $('p').text();
    const link = $('a').attr('href');

    console.log(title);
    console.log(text);
    console.log(link);
    //console.log($.html());

})();