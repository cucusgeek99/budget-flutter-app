let ejs = require('ejs')
var fs = require('fs');
var pdf = require('html-pdf');



const tofile = (html, options, save_path) => {
    return new Promise((resolve, reject) => {
        pdf.create(html, options).toFile(save_path, (err, res) => {
            if (err) return reject(err)
            resolve(res)
        })
    })
}

exports.ejs_to_pdf = (ejs_path, ejs_data, pdf_options, save_path) => {
    return ejs.renderFile(ejs_path, ejs_data).then(html => {
        return tofile(html, pdf_options, save_path)
    })
}
