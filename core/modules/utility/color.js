 const paths = require("../../paths.json");
 const gear = require("../../gearbox.js");
 const namely = require('name-this-color');
 const Jimp = require('jimp');
 const translate = require('google-translate-api');
 const locale = require('../../../utils/multilang_b');
 const mm = locale.getT();

const cmd = 'color';

const init = function (message, userDB, DB) {
     const Channel = message.channel;
     const Author = message.author;
     const MSG = message.content;
     const bot = message.botUser
     const args = MSG.split(' ').slice(1)[0]
     const regExp = new RegExp(/[0-9A-Fa-f]{6}/g);

     try {
         //HELP TRIGGER
         let helpkey = mm("helpkey", {
             lngs: message.lang
         })
         if (!regExp.test(args) || !args || args === undefined || MSG.split(" ")[1] == helpkey || MSG.split(" ")[1] == "?" || MSG.split(" ")[1] == "help") {
             return gear.usage(cmd, message,this.cat);
         }
     } catch (e) {
         console.error(e)
     }
     //------------

     const hex = parseInt((args + "FF").replace(/^#/, ''), 16);

     const image = new Jimp(126, 126, hex, function (err, img) {
         Jimp.read(paths.BUILD + "note.png").then(function (lenna) {
             img.mask(lenna, 0, 0)
             img.getBuffer(Jimp.MIME_PNG, function (err, image) {
                 let emb = new gear.RichEmbed;
                 emb.setColor("#" + args.replace(/^#/, ''))
                 let colset = namely(args)[0]

                 let lang = message.lang[0]
                 if (lang === "pt-BR") lang = "pt";

                 let colname = namely(args)[0].title
                    console.log(args)
                    if(args.replace(/^#/, '')==="E87AA9")colname="pollux pink";
                    if(args.replace(/^#/, '')==="179C49")colname="gorsal green";
                    if(args.replace(/^#/, '')==="E52535")colname="flicky red"
                 console.log(lang)
                 translate(colname, {to:lang }).then(res => console.log(res))

                 translate(colname, {
                     to: lang
                 }).then(colset => {
                     console.log(colset);
                     console.log(namely(args)[0].title);
                     let a = colset.text
                                    .replace("pollux","Pollux")
                                    .replace("gorsal","Gors")
                                    .replace("flicky","Flicky")
                                    .replace("red","Red")
                                    .replace("green","Green")
                     a=gear.capitalize(a)
                     emb.setAuthor(a,"https://png.icons8.com/paint-brush/dusk/64")
                     message.channel.send({embed: emb,files: [{attachment: image,name: "file.png"}]})

                 })

             })

         })

     });

 }

 module.exports = {
     pub: true,
     cmd: cmd,
     perms: 3,
     init: init,
     cat: 'util'
 };
