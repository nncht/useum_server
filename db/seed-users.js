const mongoose = require('mongoose');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const users =
[{"email":"llabastida0@topsy.com","password":"edkLBhfK2M","username":"Lavinie LaBastida"},
{"email":"bsheach1@nbcnews.com","password":"GeEZLWjRR6PE","username":"Barnabe Sheach"},
{"email":"jbooty2@auda.org.au","password":"V7iL6gqo","username":"Jesse Booty"},
{"email":"arecord3@dyndns.org","password":"t6VK376q","username":"Averell Record"},
{"email":"vwegener4@nifty.com","password":"O5eVwx","username":"Vickie Wegener"},
{"email":"csheppard5@dmoz.org","password":"46h7ynvdYTl","username":"Cilka Sheppard"},
{"email":"sdunleavy6@blogtalkradio.com","password":"uVlxKkTCygDU","username":"Shane Dunleavy"},
{"email":"omeasey7@ucoz.com","password":"8XgGpmW9zYE","username":"Oliviero Measey"},
{"email":"rtailby8@cocolog-nifty.com","password":"Q2AZVeJI8Ug","username":"Reg Tailby"},
{"email":"pmcettigen9@reference.com","password":"8CC0f3","username":"Prescott McEttigen"},
{"email":"rtubbya@engadget.com","password":"tK33Gvsor","username":"Rowan Tubby"},
{"email":"ggravieb@apple.com","password":"uBwOLRYHpja","username":"Gladys Gravie"},
{"email":"lfernleyc@dedecms.com","password":"o8HMiUCy","username":"Lani Fernley"},
{"email":"srowantreed@cam.ac.uk","password":"j3kb7nfBV","username":"Sarine Rowantree"},
{"email":"cgarville@msn.com","password":"jjEkpU6j","username":"Cy Garvill"},
{"email":"jlowdyanef@booking.com","password":"hOznXwpw","username":"Jocelyne Lowdyane"},
{"email":"troyallg@booking.com","password":"AsuqkZ","username":"Tina Royall"},
{"email":"kmactagueh@sourceforge.net","password":"vdMElC0sDu","username":"Karlee MacTague"},
{"email":"dpepleri@g.co","password":"hBLGZ18","username":"Dasya Pepler"},
{"email":"cwhitelawj@163.com","password":"vjjLTOJp","username":"Cathy Whitelaw"},
{"email":"mroubeixk@amazon.co.jp","password":"WJaiDA2","username":"Major Roubeix"},
{"email":"oadell@mit.edu","password":"xDOHgpe4mdJ","username":"Orrin Adel"},
{"email":"atregonam@digg.com","password":"AQu7eH6hGV1","username":"Adolpho Tregona"},
{"email":"oplaicen@tiny.cc","password":"wx4sdZL","username":"Opal Plaice"},
{"email":"hbuxeyo@unesco.org","password":"GoYXfDdy4","username":"Heath Buxey"},
{"email":"sbaudouinp@drupal.org","password":"VZaQlYCyWba","username":"Symon Baudouin"},
{"email":"abrobynq@wikia.com","password":"h9JnWx","username":"Aldin Brobyn"},
{"email":"bcraikerr@behance.net","password":"N56U02zaar","username":"Baird Craiker"},
{"email":"grustmans@theatlantic.com","password":"lfo01IzynbF5","username":"Georas Rustman"},
{"email":"tedgarst@cbc.ca","password":"d41HNL","username":"Townsend Edgars"},
{"email":"dgettinsu@spiegel.de","password":"F76qWk0anMl","username":"Danny Gettins"},
{"email":"eprykev@dedecms.com","password":"W3F3Ps","username":"Eleanor Pryke"},
{"email":"tprandiw@360.cn","password":"OSDdgk","username":"Theodoric Prandi"},
{"email":"vcamillerix@google.ca","password":"UbI7JEC","username":"Vittorio Camilleri"},
{"email":"gdiy@nydailynews.com","password":"OtAwTcEdGgaC","username":"Gui Di Napoli"},
{"email":"nelsmorz@cnbc.com","password":"XlKzI6L81ldL","username":"Nate Elsmor"},
{"email":"nandrieu10@mashable.com","password":"Fo3DAw4JxM","username":"Nial Andrieu"},
{"email":"tballendine11@boston.com","password":"5hlr5LMGgH","username":"Tomas Ballendine"},
{"email":"mjacop12@bizjournals.com","password":"4nfKc5","username":"Mollie Jacop"},
{"email":"sde13@ted.com","password":"eHK3je","username":"Selene De Bruijn"},
{"email":"pgaunson14@opensource.org","password":"TlKjsbAV8Yk","username":"Patricia Gaunson"},
{"email":"ahaggerstone15@who.int","password":"nL2N2G","username":"Archibold Haggerstone"},
{"email":"aohannay16@berkeley.edu","password":"12MisjRh","username":"Ashlan O'Hannay"},
{"email":"kscogings17@de.vu","password":"XJGrIq","username":"Kaia Scogings"},
{"email":"hmcinnerny18@unicef.org","password":"pXB7e2JuDfL","username":"Hailey McInnerny"},
{"email":"jdeverall19@nydailynews.com","password":"q48ghte7Gpk9","username":"Jessee Deverall"},
{"email":"mprestige1a@free.fr","password":"BG2xhoC4","username":"Miranda Prestige"},
{"email":"prozenzweig1b@theguardian.com","password":"qkRzsir3","username":"Pepi Rozenzweig"},
{"email":"hmacnalley1c@amazon.co.jp","password":"o3Z2ySpTCdX","username":"Hall MacNalley"},
{"email":"hpoundesford1d@cam.ac.uk","password":"81uFib4GPT","username":"Haywood Poundesford"},
{"email":"emynett1e@google.fr","password":"RzILHk","username":"Emmalee Mynett"},
{"email":"aunderwood1f@wunderground.com","password":"IEGDtcaqDP","username":"Amabel Underwood"},
{"email":"tcoraini1g@nifty.com","password":"Bt0ilBZ","username":"Tamarra Coraini"},
{"email":"kdouthwaite1h@alexa.com","password":"meWaLYvmkX","username":"Kevan Douthwaite"},
{"email":"fgirtin1i@europa.eu","password":"g8zmzbYtQwQ6","username":"Felita Girtin"},
{"email":"nmutlow1j@google.es","password":"8cwFdUjVfW","username":"Nessi Mutlow"},
{"email":"csnassell1k@bigcartel.com","password":"iqrXj4z1h","username":"Carolina Snassell"},
{"email":"bockleshaw1l@huffingtonpost.com","password":"flc8HPoU","username":"Barron Ockleshaw"},
{"email":"fnoad1m@indiegogo.com","password":"r7OmWPxL","username":"Freedman Noad"},
{"email":"bsawter1n@hc360.com","password":"uRE69zDgSP26","username":"Berkley Sawter"},
{"email":"emccaughey1o@mit.edu","password":"iyq7CjFB","username":"Ebenezer McCaughey"},
{"email":"meisig1p@networksolutions.com","password":"ZpbnVepynF","username":"Max Eisig"},
{"email":"tbruyet1q@csmonitor.com","password":"ulGKZW","username":"Tabbi Bruyet"},
{"email":"lkeford1r@gmpg.org","password":"IULBB8","username":"Leo Keford"},
{"email":"rbellon1s@posterous.com","password":"O03oH3ikG","username":"Raimondo Bellon"},
{"email":"lhassard1t@yelp.com","password":"HNpz72w","username":"Lacie Hassard"},
{"email":"pcoleborn1u@deliciousdays.com","password":"6c4uuVKLfyp","username":"Padget Coleborn"},
{"email":"skrook1v@toplist.cz","password":"CKiRxrmOdSS","username":"Stormi Krook"},
{"email":"rbanham1w@usatoday.com","password":"LwLKoIs","username":"Rikki Banham"},
{"email":"mrorke1x@mit.edu","password":"WrLs1ekE","username":"Malia Rorke"},
{"email":"lmelville1y@themeforest.net","password":"yUNcdOIsHhB","username":"Lelah Melville"},
{"email":"mpurvis1z@cdc.gov","password":"yRGznXstx","username":"Mariejeanne Purvis"},
{"email":"emacfarland20@pbs.org","password":"nGR8ok","username":"Emlen MacFarland"},
{"email":"blante21@ifeng.com","password":"tps8Qltx","username":"Barthel Lante"},
{"email":"asissens22@omniture.com","password":"qfIPvEuN9","username":"Aundrea Sissens"},
{"email":"kcota23@comcast.net","password":"cA7ot1Pr2vd","username":"Karmen Cota"},
{"email":"rbartolozzi24@sohu.com","password":"cSUJrOJNthf","username":"Ruperta Bartolozzi"},
{"email":"hpuncher25@fc2.com","password":"CvpnfHzxY","username":"Helsa Puncher"},
{"email":"amcgeorge26@go.com","password":"5FT6p1","username":"Alfi McGeorge"},
{"email":"bportman27@jugem.jp","password":"csdmtthYpVf","username":"Burke Portman"},
{"email":"ebrigge28@aboutads.info","password":"VBDAL80","username":"Eda Brigge"},
{"email":"aalejo29@barnesandnoble.com","password":"gm6jAmoj","username":"Ag Alejo"},
{"email":"ciacovides2a@mit.edu","password":"l6tcZoT","username":"Conrade Iacovides"},
{"email":"mlippett2b@weibo.com","password":"G7PXis5k8eD6","username":"Marketa Lippett"},
{"email":"sdreye2c@printfriendly.com","password":"bwYqbE","username":"Silvan Dreye"},
{"email":"mmerioth2d@cnn.com","password":"ZkbT0r9x8h5","username":"Minnie Merioth"},
{"email":"ghallin2e@rediff.com","password":"C3DkQItpVWk","username":"Gan Hallin"},
{"email":"ahamprecht2f@canalblog.com","password":"uUzfMgLXEm","username":"Addia Hamprecht"},
{"email":"kferrarini2g@reuters.com","password":"oP42f2Y","username":"Kristen Ferrarini"},
{"email":"mfigura2h@furl.net","password":"lzjNj5Z","username":"Maddy Figura"},
{"email":"amcmickan2i@hexun.com","password":"3MpVgQ5rEj","username":"Allx McMickan"},
{"email":"htisun2j@goodreads.com","password":"fdH0hU9AJ","username":"Hasheem Tisun"},
{"email":"lveivers2k@nps.gov","password":"WerrX9xu","username":"Louisette Veivers"},
{"email":"mburnep2l@ow.ly","password":"lNgHSDDrNb","username":"Meggy Burnep"},
{"email":"ltwigger2m@webnode.com","password":"jXS1aN7","username":"Lee Twigger"},
{"email":"gmarieton2n@de.vu","password":"MhiRI5uBu","username":"Glenn Marieton"},
{"email":"sdunstan2o@behance.net","password":"oQASPdfDwgsH","username":"Shandee Dunstan"},
{"email":"tdagworthy2p@geocities.jp","password":"GkPCi2yu","username":"Tobe Dagworthy"},
{"email":"tstranks2q@oaic.gov.au","password":"BrBPvvl3twQ8","username":"Trip Stranks"},
{"email":"zbustin2r@tamu.edu","password":"MVBOWy1M","username":"Zebedee Bustin"}]

// Hash passwords before seeding
Promise.all(users.map(async user => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  return {
    email: user.email,
    password: hashedPassword,
    username: user.username
  };
}))
.then(hashedUsers => {


  mongoose.connect('mongodb+srv://jchorzempa:Wl4xl6L2F11Yk8Mx@useumcluster.wevpu44.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {

    console.log(`Connected to database!`)

    User.create(hashedUsers)
    .then(() => console.log('Database seeded with hashed passwords'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect());
  })
  .catch(error => console.error(error));
});



