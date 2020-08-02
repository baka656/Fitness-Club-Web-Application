var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'abbhinav.nomulla656@gmail.com',
        pass: 'bakaittop'
    }
}));

readHTMLFile(__dirname + '/views/forgotpass.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
         name: "John Doe",
         uname: "baka",
         code: "wfnwen"
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
        from: '"abbhinav nomulla" <abbhinav.nomulla656@gmail.com',
        to: 'abbhinav.nomulla656@gmail.com',
        cc: 'monadarling858@gmail.com',
        bcc:'gowthamsps98@gmail.com',
        subject: 'Test from Nodemailer',
        html : htmlToSend
     };
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        }
        console.log(response);
    });
});