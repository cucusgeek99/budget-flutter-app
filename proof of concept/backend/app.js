var fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');

const { ejs_to_pdf } = require('./helpers/ejs_pdf')
const app = new Koa();
const router = new Router();



var options = { format: 'Letter' };
title = 'Sample template'
name = 'martin'
comidas = [{ 'name': 'atun', 'price': 100 }]


router.get('/pdf', async (ctx) => {
    const filePath = './tmp/test.pdf'
    await ejs_to_pdf('./templates/template.ejs', { title, name, comidas }, options, filePath)
    ctx.set('Content-disposition', `attachment; filename=${filePath}`);
    ctx.statusCode = 200;
    ctx.body = fs.createReadStream(filePath);
    fs.unlinkSync(filePath)
});


app.use(router.routes());

app.listen(3000);