const tmi = require('tmi.js');
const rp = require('request-promise');
const mysql = require("mysql2");
const { parse } = require('querystring');
const http = require('http');
const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');



global.twitch_bot_data = {
	"predict_status" : false,
	"predict_id" : "",
	"predict_outcomes" : []
}

const streamer_id =
const ouath_token =
const client_id =









// Define configuration options
const opts = {
  identity: {
    username:
    password:
  },
  channels: [
    "wholikeshadow"
  ],
  connection: {
    reconnect: true
  }
};

var messages = [];



var magicTimer = 0;

var isMagicAvailable = true;
var thorMagicIsAvailable = true;

var isQuestionAvailable = true;
var questionCooldownLength = 60000;

var isGnomMagicAvailable = true;
var gnomMagicCooldownLength = 600000;

var isMagicCooldownReady = true;
var isSpitCooldownReady = true;
var isKissCooldownReady = true;
var isDickCooldownReady = true;
var isPussyCooldownReady = true;
var isBiteCooldownReady = true;

var isBlacklistEnable = false;
var isPavukMagicAvailable = true;

var spiderManNickName = "";
var isSpiderAbilityAvailable = true;

var soldierNickName = "";
var isSoldierAbilityAvailable = true;
var isDyremMagicAvailable = true;

var pinguinOwnerNickName = "happywhalesoul";
var pinguinTimeout = 0;

var messageTimeout = null;

const cooldownLength = 20000;




//////////////////////////////////////
// Create a client with our options
const botName = opts["identity"]["username"];
const channelName = clearChannelName(opts["channels"][0]);
const target = getTargetFromChannelName(channelName);

const client = new tmi.client(opts);

startBot();

function startBot(){
  prepareClient(client);
  startServer();
}

function isInt(value) {
  var x;
  return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}

function prepareClient(client){
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);
  client.on('resub', onResubHandler);
  client.on("subscription", onSubHandler);
  client.connect();
}

function startServer(){
  const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
      req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {
        postRequestHandler(body);
          res.end('ok');
      });
    }
  });
  server.listen(3000);
}

function postRequestHandler(requestObject){
  console.log(requestObject);
  var json = JSON.parse(requestObject);

  console.log(json);
  console.log(json.isMe);

  if (json.method === "test"){
      var result = getLastMafiaGameResult();
      console.log(result);
  }

  if (json.method === "sendMessage"){
    sendMessageByBot(json.message, (json.isMe == 'true'));
  }
}

function sendMessageByBot(message, isMe){
  console.log(isMe);
  if (isMe){
    client.say(target, `${message}`);
  } else {
    client.say(target, `${message}`);
  }

}

function onSubHandler(channel, username, methods){
  console.log("SUBHANDLER================3");
  console.log(username);
  console.log(methods);

  client.say(getTargetFromChannelName(channelName), `${username} теперь в стае! АУФ! wlshAYF wlshAYF wlshAYF`);
}

function onResubHandler(channel, username, months, message, userstate, methods) {
    console.log("RESUBHANDLER ================3");
    var cumulateveMonths = userstate["msg-param-cumulative-months"];

    console.log(cumulateveMonths);
    console.log("----------------");
    console.log(userstate);
    console.log("----------------");

    client.say(getTargetFromChannelName(channelName), `${username} с нами уже ${cumulateveMonths} месяцев! АУФ!`);
}

function collectMessage(msg, username){
  if (username === kpotkoName){
    return;
  }

  if (msg.startsWith("!")){
    return;
  }

  var messageObj = {};
  messageObj.msg = msg.toLowerCase();
  messageObj.user = username;
  messages.push(messageObj);
}

function checkPermission(username){
   return(username === "kpotko" || username === "kpotkottp" || username === "nikey1437" || username === "crissstalll"  || username === "gabul9l9n" || username === "gorkom3" || username === "brainblowbb" || username === "ang3lmafia" || username === "mishutka18" || username === "ariaripewpewpew" || username === "nikey1437" || username === "bggclr"
  crissstalll
  gabul9l9n
  gorkom3
  brainblowbb
  ang3lmafia
  ariaripewpewpew
  mishutka18);
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  const username = context.username;
  //Игнорим сообщения от самого бота (просто на всякий случай)
  if (self || (username === botName)|| (username === "n7thorthunderwolf") || (username === "n7thinderwolf")) { 
    return;
  }

  collectMessage(msg, username);
  console.log(msg.trim());

  switch (msg){
    
    
    default:
    console.log(msg.trim() + "1111");
  }

  //Убираем пробелы спереди и сзади + приводим все в нижний регистр (для регистронезависимых команд)
  var commandName = msg
      .trim()

  //Фильтруем чат на запрещенные слова
  tryToFilterMessage(target, username, commandName);  

  //Дать таймач пользователю
  if (commandName.includes("!kill")){
    console.log(commandName);
    if (checkPermission(username)){
      try{
        const splittedCommand = commandName.split(" ");

    var filtered = splittedCommand.filter(function (el) {
      return el != null && el != "";
    });

    console.log(filtered);
    const targetName = filtered[1];
    var timeoutDuration = filtered[2];

    console.log(timeoutDuration);

    console.log(isInt(timeoutDuration));

    if (!isInt(timeoutDuration)){
      timeoutDuration = 1;
    }else{
      timeoutDuration = parseInt(timeoutDuration, 10)
    }
          
          console.log(timeoutDuration);

          useTimeoutForUser(target, targetName, timeoutDuration, `${targetName} был жестоко убит коварным ботом`);
          client.say(target , `наказал ${targetName} банхаммером на ${timeoutDuration} секунд!`);
        } catch (e){
          console.log(e);
        }
      }
  }

  switch (commandName.split(" ")[0]){
    case "!note":
    case "!заметка":
    case "!вывести":
    case "!анонс":
    case "!Анонс":
    case "!сегодня":
    case "!Сегодня":

    var textToChat = readNoteFromFile();

    client.say(target, textToChat);
    break;

    case "!addnote":
    case "!добавитьзаметку":
    case "!текст":

    if (!checkPermission(username)){
      return; 
    }

    const splitted = msg.trim().split(" ");
    splitted.shift();

    var targetName = splitted.join(" ");
    writeNoteToFile(targetName);

    client.say(target, "Заметка добавлена");
    break;

    case "!clearnote":
    case "!очистить":

    if (!checkPermission(username)){
      return;
    }

    writeNoteToFile("");
    client.say(target, "Заметка очищена");
    break;


    case "!file":
    case "!deathnote":
    case "!список":
      var list = readListFromFile();
      console.log(list);
      client.say(target, list.join(', '));
  
    break;

    case "!addtolist":
    case "!добавить":
      if (!checkPermission(username)){
        return;
      }

      const splitte = msg.trim().split(" ");
      splitte.shift();

      var targetName = splitte.join(" ");

      var listFromFile = readListFromFile();

      var newValueToList = "";

      console.log(listFromFile.length);
      if (listFromFile.length == 0){
        newValueToList = targetName.trim();
      }else{
        newValueToList = listFromFile.concat([targetName.trim()]).join(',');
      }

      console.log(newValueToList);

      writeToFile(newValueToList);

      client.say(target, `${targetName} добавлен в список`);
    break;

    case "!удалить":
    case "!deletefromlist":
      if (!checkPermission(username)){
        return;
      }
      
      console.log(msg.trim());
      const splittedCom = msg.trim().split(" ");
      splittedCom.shift();

      var targetName = splittedCom.join(" ");

      var newArray = removeItemOnce(readListFromFile(), targetName).join(',');
      console.log(newArray);
      writeToFile(newArray);

      client.say(target, `${targetName} удален из списка`);
    break;
  }

  commandName = commandName.toLowerCase();
  const fullCommandName = commandName.toLowerCase();
  commandName = commandName.split(" ")[0];

  //Блок, где мы перечисляем комманды, на которые реагирует бот
  switch (commandName){
    case "!blacklist":
      if (isBlacklistEnable){
        isBlacklistEnable = false;
      } else {
        isBlacklistEnable = true;
      }
    break;

    case "!last":
    case "!ласт":

      getLastMafiaGameResult();

    break;

    case "!log":
    case "!лог":
      console.log("________________");
      console.log(messages.length);
      //console.log(messages);
      
      messages.forEach(function(item){
        console.log(item);
      });

      console.log("________________");
      useTimeoutForUser(target, username, 1, "!poof");
    break;

    case "!help":
    case "!хелп":
    case "!хэлп":
      client.say(target, "!inst, !sub, !ауф, !vk, !discord, !social, !poof, !тьфу, !чмок, !чблен, !впадина, !кусь, !магия, !когда !держивкурсе");
    break;

    case "!магия2":
      if (isMagicAvailable && username === "nikey1437"){
        client.say(target, "открывает форточку");
        return;
      }
    break;

    case "!магия":
    case "!magic":

    if (!isMagicAvailable && username === kpotkoName){
          client.say(target, "Отменяет заклинание антимагии");
          isMagicAvailable = true;
          clearTimeout(magicTimer);
          return;
    }

    if (!isMagicAvailable && username !== "kseniatheangel"){
      client.say(target, "Магия заблокирована. Упс");
      return;
    }
      console.log(username);

      if (username === "anyashadow_"){
        const roll = Math.round(Math.random() * 100);
        console.log(`roll is ${roll}`);
        const isMafia = roll >= 75;

        const check = fullCommandName.split(" ")[1];

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        const targetName = splittedCommand.join(" ");
        if (targetName === "anyashadow_" || targetName === "@anyashadow_"){
            client.say(target, `Детектив anyashadow_ 💉 вкалывает сыворотку правды в ${targetName}`);
            client.say(target, `${targetName} проверенный комиссар!`);
            return;
        }

        if (check == null){
          getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            var isMafiaString = "";
            if (isMafia){
              isMafiaString = `Внимание! ${randomChatter} мафло! DansGame`;
            } else{
              isMafiaString = `Всё в порядке, ${randomChatter} бублик BloodTrail`;
            }

            client.say(target, `Детектив anyashadow_ 💉 вкалывает сыворотку правды в ${randomChatter}`);
            client.say(target, `${isMafiaString}`);
          });
        } else{
          var isMafiaString = "";
            if (isMafia){
              isMafiaString = `Внимание! ${targetName} мафло! DansGame`;
            } else{
              isMafiaString = `Всё в порядке, ${targetName} бублик BloodTrail`;
            }

            client.say(target, `Детектив anyashadow_ 💉 вкалывает сыворотку правды в ${targetName}`);
            client.say(target, `${isMafiaString}`);
        }        
        return;
      }

      if (username === "febfora" || username === "kpotko"){

        const variantsF = ["Здешние пески холодные, но когда ты здесь, каджиту становится теплее", 
        "Жил без страха и умер без страха.", 
        "Раньше меня тоже вела дорога приключений, а потом мне прострелили колено.",
        "Дай-ка угадаю: кто-то украл твой сладкий рулет?"];


        const randomVariantF = variantsF[Math.round(Math.random() * (variantsF.length-1))];

        client.say(target, ` ${randomVariantF} `);
/*
        console.log("enter to febfora magic");
        var febforaMagicList = ["Здешние пески холодные, но когда ты здесь, каджиту становится теплее", "Жил без страха и умер без страха.", "Раньше меня тоже вела дорога приключений, а потом мне прострелили колено.", "Дай-ка угадаю: кто-то украл твой сладкий рулет?"];
        var febforaMagicPhraseChoose = febforaMagicList[Math.round(Math.random() * (febforaMagicList.length-1))];
        console.log(`${febforaMagicPhraseChoose} + 11111`);
        client.say(target, `${febforaMagicPhraseChoose}`);
*/
        return;
      }

      if (username === "pervomaj"){
        client.say(target, "Первомай обвиняется в нарушении правил плеймафии(зачеркнуто) чата, и отправляется на заслуженный отдых обратно в чат");
        return;
      }

      if (username === "ax1d1c"){
        const check = fullCommandName.split(" ")[1];

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        const targetName = splittedCommand.join(" ");

        if (check == null){
          getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            client.say(target, `мафия не дремлет и сегодня ночью жестоко расправилась с ${randomChatter}`);
          });
        } else{
            client.say(target, `мафия не дремлет и сегодня ночью жестоко расправилась с ${targetName}`);
        }        
        return;
      }

      if (username === "bikkembergs_bi"){
        const length = Math.round(Math.random() * 30);
        const roll = Math.round(Math.random());

        var minMax = "";
        if (roll === 1){
          minMax = "увеличила";
        } else{
          minMax = "уменьшила";
        }

         const check = fullCommandName.split(" ")[1];

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        const targetName = splittedCommand.join(" ");

        if (check == null){
          getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            client.say(target, `хуёвая магия ${minMax} песюн ${randomChatter} на ${length} см.`);
          });
        } else{
            client.say(target, `хуёвая магия ${minMax} песюн ${targetName} на ${length} см.`);
        }        
        return;
      }

      if (username === "gnom_gnombi4_jms_f" || username === "ya_ryadom"){
        if (!isGnomMagicAvailable){
          client.say(target, "магия ухода в размен еще не перезарядилась, падажжи");
          return;
        }

        client.say(target, "Господин Гномыч отлучился на минутку от чата");
        useTimeoutForUser(target, "gnom_gnombi4_jms_f", 60, `Отлучился на минутку из чата`);
        client.say(target, "ya_ryadom Решил присоединиться к Гном Гномычу и вышел из чата");
        useTimeoutForUser(target, "ya_ryadom", 60, `Решил присоединиться к господину gnom_gnombi4_jms_f и вышел из чата`);

        isGnomMagicAvailable = false; 

        setTimeout(() => {

          isGnomMagicAvailable = true;

        }, gnomMagicCooldownLength);

        return;
      }

      if (username === "taratatatapkov"){
        const check = fullCommandName.split(" ")[1];

        const names = ["Жора", "Илья", "Кпотко", "Себастьян", "Серый", "Гриша", "Володя", "Глухарь", "Санитар", "Павук", "Вован", "Данила", "Макс", "Петя"];
        const secondNames = ["Кидала", "Кабан", "Стример", "Ржавый", "Слепой", "Сгущенка", "Грачист", "Топорист", "Работяга", "Пуська", "Рыгло", "Любимый", "Носок", "Юбочка", "Башка"];
        const bodyparts = ["(тело, живот)", "(тело, грудь)", "(Голова, глаза)"];

        const randomNameIndex = Math.round(Math.random() * (names.length - 1));
        const randomSecondNameIndex = Math.round(Math.random() * (secondNames.length-1));
        const randomBodyIndex = Math.round(Math.random() * (bodyparts.length-1));

        const randomName = names[randomNameIndex];
        var randomSecondName = secondNames[randomSecondNameIndex];
        var randomBody = bodyparts[randomBodyIndex];

        if (randomName === "Глухарь" || randomName === "Санитар"){
          randomSecondName = "";
          randomBody = "(жопа, очко)";
        }

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        var targetName = splittedCommand.join(" ");

        if (check == null){
          getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            client.say(target, `${randomName} ${randomSecondName} ☠️ ${randomChatter} ${randomBody}`);
          });
        } else{
          client.say(target, `${randomName} ${randomSecondName} ☠️ ${targetName} ${randomBody}`);
        } 

        return;
      }

      if (username === "hirian_"){
        const splittedCommand = fullCommandName.split(" ");
        const targetName = splittedCommand[1];

        if (targetName == null){
          client.say(target, "Нужно выбрать цель");
          return;
        }

        client.say(target, `Мистер ${username} кричит НАЙС МОДЕРАЦИЯ BloodTrail, и снимает проклятие бана с ${targetName}`);
        client.say(target, `/unban ${targetName}`);

        return;
      }

      if (username === "lordpavuc" ){
        if (!isPavukMagicAvailable){
          return;
        }
        const splittedCommand = fullCommandName.split(" ");
        const targetName = splittedCommand[1];

        if (targetName == null){
          client.say(target, "Нужно выбрать цель");
          return;
        }

        client.say(target, `Коварный Павук превращает ${targetName} в человека-паука`);
        client.say(target, `${targetName} 5 минут может применять способность !паутина`);

        isPavukMagicAvailable = false; 
        spiderManNickName = targetName;
        if (spiderManNickName.indexOf('@') > -1){
          spiderManNickName = spiderManNickName.substring(1);
        }
        
        console.log(spiderManNickName);
        setTimeout(() => {
          client.say(target, `${spiderManNickName} больше не человек-паук`);

          isPavukMagicAvailable = true;
          spiderManNickName = "";
        
        }, 300000);

        return;
      }

      if (username === "jjbarsjj"){
        console.log(commandName);
        const splittedCommand = fullCommandName.split(" ");
        console.log(splittedCommand);
        const targetName = splittedCommand[1];
      
        getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            console.log(randomChatter);
            
          client.say(target, "использует стиль пьяного мастера");
          client.say(target, `${targetName} пьянеет и чмокает ${randomChatter}`);
        });

        return;
      }

      if (username === "maver1ke"){
        const additionalStringsList = ["Рынок снова в созвездии Быка", "Медведи продают. Ждем обвала", "Быки и коровы - рынку херово", "Опа-опа. Пора брать", "Опа-опа. Пора сливать"];
        const additionalString = additionalStringsList[Math.round(Math.random() * (additionalStringsList.length - 1))];

        var dollarValue = getDollarValue().then(data => {
            client.say(target, `призывает курс $ ${data} руб`);
            client.say(target, `${additionalString}`);
        });
        return;
      }

      if (username === "ordiv"){
        client.say(target, "Магия казино! Срабатывает случайная магия HSCheers TakeNRG");
        
          var anyashadow_Magic = function (){

          const roll = Math.round(Math.random() * 100);
          console.log(`roll is ${roll}`);
          const isMafia = roll >= 75;

          const check = fullCommandName.split(" ")[1];

          const splittedCommand = fullCommandName.split(" ");
          splittedCommand.shift();
          const targetName = splittedCommand.join(" ");
          if (targetName === "ordiv" || targetName === "@ordiv"){
              client.say(target, `Детектив ${username} 💉 вкалывает сыворотку правды в ${targetName}`);
              client.say(target, `${targetName} проверенный комиссар!`);
              return;
          }

          if (check == null){
            getChatters(channelName).then(data => {
              const randomChatter = getRandomChatterExceptInitiator(data, username);
              var isMafiaString = "";
              if (isMafia){
                isMafiaString = `Внимание! ${randomChatter} мафло! DansGame`;
              } else{
                isMafiaString = `Всё в порядке, ${randomChatter} бублик BloodTrail`;
              }

              client.say(target, `Детектив ${username}  💉 вкалывает сыворотку правды в ${randomChatter}`);
              client.say(target, `${isMafiaString}`);
            });
          } else{
            var isMafiaString = "";
              if (isMafia){
                isMafiaString = `Внимание! ${targetName} мафло! DansGame`;
              } else{
                isMafiaString = `Всё в порядке, ${targetName} бублик BloodTrail`;
              }

              client.say(target, `Детектив ${username} 💉 вкалывает сыворотку правды в ${targetName}`);
              client.say(target, `${isMafiaString}`);
          }        
          return;
        };

        var axidic_Magic = function (){
          const check = fullCommandName.split(" ")[1];

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        const targetName = splittedCommand.join(" ");

        if (check == null){
          getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            client.say(target, `мафия не дремлет и сегодня ночью жестоко расправилась с ${randomChatter}`);
          });
        } else{
            client.say(target, `мафия не дремлет и сегодня ночью жестоко расправилась с ${targetName}`);
        }        
        return;
      };

      var bikenbergis_Magic = function (){
        const length = Math.round(Math.random() * 30);
        const roll = Math.round(Math.random());

        var minMax = "";
        if (roll === 1){
          minMax = "увеличила";
        } else{
          minMax = "уменьшила";
        }

        const check = fullCommandName.split(" ")[1];

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        const targetName = splittedCommand.join(" ");

        if (check == null){
          getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            client.say(target, `хуёвая магия ${minMax} песюн ${randomChatter} на ${length} см.`);
          });
        } else{
            client.say(target, `хуёвая магия ${minMax} песюн ${targetName} на ${length} см.`);
        }        
        return;
      };

      var tapkov_Magic = function (){
        const check = fullCommandName.split(" ")[1];

        const names = ["Жора", "Илья", "Кпотко", "Себастьян", "Серый", "Гриша", "Володя", "Глухарь", "Санитар", "Павук", "Вован", "Данила", "Макс", "Петя"];
        const secondNames = ["Кидала", "Кабан", "Стример", "Ржавый", "Слепой", "Сгущенка", "Грачист", "Топорист", "Работяга", "Пуська", "Рыгло", "Любимый", "Носок", "Юбочка", "Башка"];
        const bodyparts = ["(тело, живот)", "(тело, грудь)", "(Голова, глаза)"];

        const randomNameIndex = Math.round(Math.random() * (names.length - 1));
        const randomSecondNameIndex = Math.round(Math.random() * (secondNames.length-1));
        const randomBodyIndex = Math.round(Math.random() * (bodyparts.length-1));

        const randomName = names[randomNameIndex];
        var randomSecondName = secondNames[randomSecondNameIndex];
        var randomBody = bodyparts[randomBodyIndex];

        if (randomName === "Глухарь" || randomName === "Санитар"){
          randomSecondName = "";
          randomBody = "(жопа, очко)";
        }

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        var targetName = splittedCommand.join(" ");

        if (check == null){
          getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            client.say(target, `${randomName} ${randomSecondName} ☠️ ${randomChatter} ${randomBody}`);
          });
        } else{
          client.say(target, `${randomName} ${randomSecondName} ☠️ ${targetName} ${randomBody}`);
        } 

        return;
      };

      var jjBars_Magic = function () {
        console.log(commandName);
        const splittedCommand = fullCommandName.split(" ");
        console.log(splittedCommand);
        const targetName = username;
      
        getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            console.log(randomChatter);
            
          client.say(target, "использует стиль пьяного мастера");
          client.say(target, `${targetName} пьянеет и чмокает ${randomChatter}`);
        });

        return;
      };

      var papugazz_Magic = function (){
        client.say(target, "активирует предсмертный хрип белого волка Голдрина. wlshAYF wlshAYF wlshAYF");
        client.say(target, "Все животные в чате получают баф +4/+4 АУФ АУФ wlshAYF wlshAYF wlshAYF");
        return;
      };

      var nariq_Magic = function (){
        client.say(target, "Использует магию тумана и пока все отвлеклись ворует девочек из чата для своих темных делишек KappaPride LesbianPride");
        return;
      };

      var zay_Magic = function (){
        const splittedCommand = fullCommandName.split(" ");
        const targetName = splittedCommand[1];

        if (targetName == null){
          client.say(target, "Призывает бутылку вина и уходит в закат, пить в одиночку");
          return;
        }

        client.say(target, `Призывает бутылку вина и уходит с ${targetName} в закат`);
        return;
      };

      var nikey_Magic = function (){
        const enemyType = Math.round(Math.random() * 3);

        var enemyName = "";
        var resultText = "";

        switch (enemyType){
          case 0:
            enemyName = "бесов";
          break;

          case 1:
            enemyName = "феечек";
          break;

          case 2:
            enemyName = "черных драконов";
          break;

          case 3:
            enemyName = "клонов Кротко";
          break;
        }

        const enemyCount = Math.round(Math.random() * 20);

        const resultChanse = Math.round(Math.random());
        console.log(resultChanse);
        if (resultChanse === 1){
          resultText = "ГО успешно пробито";
        }else{
          resultText = "Пробитие не удалось BibleThump";
        }

        client.say(target, `${username} пытается пробить ГО на 117`);
        client.say(target, `${enemyCount} ${enemyName}`);
        client.say(target, `${resultText}`);

        return;
      };

      var thor_Magic = function (){
        if (!thorMagicIsAvailable){
          client.say(target, "Мана кончилась. KEKW");
          return;
        }

        hitDigit = Math.round(Math.random())
        const isHit = hitDigit === 1;

        console.log(hitDigit);

        thorMagicIsAvailable = false;
        client.say(target, "Узрите мощь громовержца!");

        if (isHit){
            getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            console.log(randomChatter);
            if (randomChatter && randomChatter !== username) {
              useTimeoutForUser(target, randomChatter, 1, "!poof");
              client.say(target, `Lighting Bolt ⚡ попала в лоб ${randomChatter}`);
            }
            });
        } else {
          client.say(target, "Великий громовержец промахнулся BibleThump");
        }
        
        setTimeout(() => {
          thorMagicIsAvailable = true;
        }, 300000);
        return;
      };

      var marry_Magic = function () {
        client.say(target, "Распространяет любовь среди чата VirtualHug");
        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          const randomChatter2 = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`);
          }
        });

        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          const randomChatter2 = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`);
          }
        });

        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          const randomChatter2 = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`);
          }
        });

        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          const randomChatter2 = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`);
          }
        });
        return;
      };

      var dyrem_Magic = function (){
        if (!isDyremMagicAvailable){
          return;
        }
        const splittedCommand = fullCommandName.split(" ");
        var targetName = user;

        if (targetName == null){
          client.say(target, "Нужно выбрать цель для магии");
          return;
        }

        client.say(target, `Приносит повестку и превращает ${targetName} в солдата`);
        client.say(target, `${targetName} 5 минут может применять способность !выстрел`);

        isDyremMagicAvailable = false; 
        soldierNickName = targetName;
        if (soldierNickName.indexOf('@') > -1){
          soldierNickName = soldierNickName.substring(1);
        }
        
        console.log(soldierNickName);
        setTimeout(() => {
          client.say(target, `${soldierNickName} больше не солдат`);

          isDyremMagicAvailable = true;
          soldierNickName = "";
        
        }, 300000);

        return;
      };


        var magicList = [anyashadow_Magic, axidic_Magic, bikenbergis_Magic, tapkov_Magic, jjBars_Magic, papugazz_Magic, nariq_Magic, zay_Magic, nikey_Magic, thor_Magic, marry_Magic, dyrem_Magic];
        const randomMagic = magicList[Math.round(Math.random() * (magicList.length-1))];

        console.log(randomMagic);

        randomMagic();

        return;
      }

      if (username === "papugazzz"){
        client.say(target, "активирует предсмертный хрип белого волка Голдрина. wlshAYF wlshAYF wlshAYF");
        client.say(target, "Все животные в чате получают баф +4/+4 АУФ АУФ wlshAYF wlshAYF wlshAYF");
        return;
      }

      if (username === "kseniatheangel"){
        client.say(target, "Колдует самое могущественное и самое красивое заклинание в этом чате!");
        client.say(target, "Все сердечки этого чата притягиваются к Волчице!");
        client.say(target, "<3 <3 <3 <3 <3 <3");

        return;
      }

      if (username === "nariq"){
        client.say(target, "Использует магию тумана и пока все отвлеклись ворует девочек из чата для своих темных делишек KappaPride LesbianPride");
        return;
      }

      if (username === "chico_cracker"){
        client.say(target, "Маг-пастер Сергей использует магию призыва на полную мощь и... Красный легион обрушивается на ЧАТ");
        client.say(target, "BloodTrail BloodTrail BloodTrail BloodTrail BloodTrail BloodTrail BloodTrail BloodTrail BloodTrail BloodTrail BloodTrail");
        return;
      }

      if (username === "hareman8"){
        client.say(target, "Произносит самое секретное заклинание из всех существующих");
        client.say(target, "Маша кидает ножки ему в лс");
        return;
      }

      if (username === "dyrem"){
         if (!isDyremMagicAvailable){
          return;
        }
        const splittedCommand = fullCommandName.split(" ");
        var targetName = splittedCommand[1].toLowerCase();

        if (targetName == null){
          client.say(target, "Нужно выбрать цель для магии");
          return;
        }

        client.say(target, `Приносит повестку и превращает ${targetName} в солдата`);
        client.say(target, `${targetName} 5 минут может применять способность !выстрел`);

        isDyremMagicAvailable = false; 
        soldierNickName = targetName;
        if (soldierNickName.indexOf('@') > -1){
          soldierNickName = soldierNickName.substring(1);
        }
        
        console.log(soldierNickName);
        setTimeout(() => {
          client.say(target, `${soldierNickName} больше не солдат`);

          isDyremMagicAvailable = true;
          soldierNickName = "";
        
        }, 300000);

        return;
      }

      if (username === "sayonaraqqq"){
        client.say(target, "Кастует заклинание антимагии. Вся магия запрещена на 1 минуту");
        isMagicAvailable = false;
        magicTimer = setTimeout(() => {
          isMagicAvailable = true;
          client.say(target, "Заклинание антимагии иссякло.");
        //сделать список из фраз и каждую минуту писать следующее сообщение
        }, 60000);
        return;
      }

      if (username === "zayindahouse"){

        const splittedCommand = fullCommandName.split(" ");
        const targetName = splittedCommand[1];

        if (targetName == null){
          client.say(target, "Призывает бутылку вина и уходит в закат, пить в одиночку");
          return;
        }

        client.say(target, `Призывает бутылку вина и уходит с ${targetName} в закат`);
        return;
      }

      if (username === "nikey1437"){
        const enemyType = Math.round(Math.random() * 3);

        var enemyName = "";
        var resultText = "";

        switch (enemyType){
          case 0:
            enemyName = "бесов";
          break;

          case 1:
            enemyName = "феечек";
          break;

          case 2:
            enemyName = "черных драконов";
          break;

          case 3:
            enemyName = "клонов Кротко";
          break;
        }

        const enemyCount = Math.round(Math.random() * 20);

        const resultChanse = Math.round(Math.random());
        console.log(resultChanse);
        if (resultChanse === 1){
          resultText = "ГО успешно пробито";
        }else{
          resultText = "Пробитие не удалось BibleThump";
        }

        client.say(target, `${username} пытается пробить ГО на 117`);
        client.say(target, `${enemyCount} ${enemyName}`);
        client.say(target, `${resultText}`);

        return;
      }


      if (username === "mvr1997"){

      }

      if (username === "n7thorthunderwolf"){
        if (!thorMagicIsAvailable){
          client.say(target, "Мана кончилась. KEKW");
          return;
        }

        hitDigit = Math.round(Math.random())
        const isHit = hitDigit === 1;

        console.log(hitDigit);

        thorMagicIsAvailable = false;
        client.say(target, "Узрите мощь громовержца!");

        if (isHit){
            getChatters(channelName).then(data => {
            const randomChatter = getRandomChatterExceptInitiator(data, username);
            console.log(randomChatter);
            if (randomChatter && randomChatter !== username) {
              useTimeoutForUser(target, randomChatter, 1, "!poof");
              client.say(target, `Lighting Bolt ⚡ попала в лоб ${randomChatter}`);
            }
            });
        } else {
          client.say(target, "Великий громовержец промахнулся BibleThump");
        }
        
        setTimeout(() => {
          thorMagicIsAvailable = true;
        }, 300000);
        return;
      }

      if (username === "flashynthen1ght"){
        client.say(target, "Взмахивает волшебным серпом, произносит `ТИШЕ ТИШЕ ЧШШШШ`, и заставляет всех замолчать");
        return;
      }

      if (username === "marymoonmin"){
        client.say(target, "Распространяет любовь среди чата VirtualHug");
        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          const randomChatter2 = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`);
          }
        });

        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          const randomChatter2 = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`);
          }
        });

        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          const randomChatter2 = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`);
          }
        });

        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          const randomChatter2 = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${randomChatter2} 😘👄 ${randomChatter}`);
          }
        });
        return;
      }

      if (username === "wholikeshadow"){
        clearAllMessagesFromChat(target);
        client.say(target, "применяет заклинание Twisting Nether и чат исчезает");
        return;
      }

      client.say(target, "Магия вне Хогвартса запрещена!");
    break;

    
    case "!паста":
      const pastaList = [
      "Внимание: РАЗЫСКИВАЕТСЯ гангстер. 23 года, характер клоунский. Не женат. Прибыл за этот стол из Мексики. Зовут дубль ВЭ ЭЛЬ ЭСС. Способен маскироваться под клоуна на любой роли, алогичен и непредсказуем. Не вооружен и очень опасен",
      "BongeR228: НЕТ ВОТ СМОТРИТЕ Я ЕМУ ВСЕ И ДО 100 ЗРИЛОВ ДОБИЛ И КАЖДЫЙ ДЕНЬ РЕЙД, И НА ДРУГЙО КОНЕЦ МОСКВЫ ПРИЕХАЛ СЕГОДНЯ !!!! А ОН СПИЗИДЛ МОЙ СМАЙЛИК ЕЩЕ МЕНЯ ВОРОВ ВЫСТАВИЛ Я В АХУЕ !!! БЫДЛО!",
      "насрать какого цвета Клауз. Что у него там: черный, комиссар, дон - вообще НАСРАТЬ, ЭТО НАШ ЛЯТь КЛАУЗ, НАШ ЛЯТь! С ИЛЮШЕЧКОЙ СИДИТ! ЛЕТИТ ЛЯТь СУКА! ЛЕТИТ НА ПЕРВОЕ ВТОРОЕ МЕСТО! ИЛЮША КЛАУЗ ВПЕРЕД! ВПЕДЕ КЛАУЗ ИЛЮША! ЕБИТЕ ИХ!",
      "🌻 SPAM 🌻 THIS 🌻 FLOWER 🌻 TO 🌻 GIVE 🌻 ИЛЮША 🌻 POWER 🌻",
      "ДА ЕБАНЫЙ РОТ ЭТОГО КАЗИНО, МИНУС 10К У ФЛЕША, НУ ЕБАНЫЕ СТАВКИ, ГРЁБАНЫЙ ТВИЧ. МЕЧТАЮ НА ДОНЕ ДАТЬ ПЕРВОГО УБИЕННОГО ЧЕРНЫМ, НУ КАК Я ПОСТАВИЛ НА МИРНЫХ, НУ КАК. ЕБАНАЯ МАГИЯ ВЕРБАЯ. РОТ ЕБАЛ ЭТОГО ШЕРИФА. ТЫ НЕ ШЕРИФ, ТЫ КОВБОЙ БЛЯТЬ"
      ];
      const pastaListLength = pastaList.length;
      const pastaNumber = Math.floor(Math.random() * pastaListLength);
      client.say(target, pastaList[pastaNumber]);
    break;

    case "!магияалроса":
    if (username === "maver1ke" || username === kpotkoName){

      client.say(target, `${username} привызывает магию алроса`);

      const splittedCommand = fullCommandName.split(" ");
      const targetName = splittedCommand[1];

      if (targetName != null){
          const splittedCommand = fullCommandName.split(" ");
          const targetName = splittedCommand[1];
          client.say(target, `${username} превращает ${targetName} в 💎`);
          return;
        }


       getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter){
            client.say(target, `${username} превращает ${randomChatter} в 💎`);
          } else {
            client.say(target, `${username} слишком одинок в этом чате, ему не кого кусать`);
          }
        });
    }

    break;

    case "!безбаш":
      client.say(target, "wlshAYF Я wlshAYF ЗНАЮ wlshAYF КАК wlshAYF УМЕР wlshAYF БЕЗБАШ wlshAYF");
    break;

    case "!выкрасть":
      if (username === "happywhalesoul" || username === kpotkoName){
        client.say(target, `Пиня возвращается к ${username}`);
        pinguinOwnerNickName = username;
      }else{
        client.say(target, "Не отдаёт Пиню!");
      }
    break;

    case "!пиня":
      if (username !== pinguinOwnerNickName){
        client.say(target, "Пиня сейчас не у тебя!");
        return;
      }
        const commandWithSplit = fullCommandName.split(" ");
        const check = commandWithSplit[1];

        commandWithSplit.shift();
        var targetName = commandWithSplit.join(" ");

        if (check == null){
          client.say(target, `${username} не может выбрать, кому кинуть Пиню`);
          return;
        }

        //pinguinTimeout = 0;
        clearTimeout(pinguinTimeout);

        if (pinguinOwnerNickName.indexOf('@') > -1){
          pinguinOwnerNickName = pinguinOwnerNickName.substring(1);
        }

        if (targetName.indexOf('@') > -1){
          targetName = targetName.substring(1);
        }

        if (pinguinOwnerNickName === targetName){
          client.say(target, `удивлён, зачем ${pinguinOwnerNickName} кидает Пиню сам себе`);
          
        } else{

          client.say(target, `кидает Пиню в ${targetName}`);
          pinguinOwnerNickName = targetName;
        }


        console.log("pinguin ========");
        console.log(targetName);
        console.log(pinguinOwnerNickName);
        console.log("pinguin =========");

        pinguinTimeout = setTimeout(() => {
          if (pinguinOwnerNickName === "happywhalesoul"){
            return;
          }
          client.say(target, `${pinguinOwnerNickName} отдаёт Пиню обратно happywhalesoul`);
          pinguinOwnerNickName = "happywhalesoul";
        }, 300000);
    break;

    case "!паутина":
    console.log(username + " " + spiderManNickName);
      if (username.toLowerCase() === spiderManNickName.toLowerCase()){
        if (!isSpiderAbilityAvailable){
          return;
        }
        const check = fullCommandName.split(" ")[1];

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        const targetName = splittedCommand.join(" ");

        if (check == null){
          client.say(target, `${username} пробует кого-то связать, но связал(а) сам(а) себя KEKW`);
          return;
        }

        client.say(target, `${username} связывает ${targetName} для своих корыстных целей`);
        isSpiderAbilityAvailable = false;

        setTimeout(() => {
          isSpiderAbilityAvailable = true;
        }, 10000);
      }

    break;


    case "!выстрел":
      console.log(username + " " + soldierNickName);
      if (username.toLowerCase() === soldierNickName.toLowerCase()){
        if (!isSoldierAbilityAvailable){
          return;
        }
        const check = fullCommandName.split(" ")[1];

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        const targetName = splittedCommand.join(" ");

        if (check == null){
          client.say(target, `${username} пробует выстрелить, но промахнулся и отстрелил из чата сам себя`);
          return;
        }

        client.say(target, `${username} отстреливает ${targetName} из чата на целую секунду!`);
        useTimeoutForUser(target, targetName, 1, `Отстрелян из чата на 1 секунду`);
        isSoldierAbilityAvailable = false;

        setTimeout(() => {
          isSoldierAbilityAvailable = true;
        }, 10000);
      }

    break;

    case "!когда":
        if (!isQuestionAvailable){
          return;
        }

        isQuestionAvailable = false;

        const answerVariants = ["никогда", "завтра","послезавтра","через час", "в 15:32", "спроси у моего создателя", "в следующем году", "в следующей жизни", "когда получим галочку"];

        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        const question = splittedCommand.join(" ");
        console.log(question);

        const answer = answerVariants[Math.round(Math.random() * (answerVariants.length - 1))];
        const stringToSay = `${username}, ${question} - ${answer}`;

        client.say(target, stringToSay);

        setTimeout(() => {
          isQuestionAvailable = true;
        }, cooldownLength);

    break;

    case "!рулетка":{
      client.say(target, "У Вас есть шанс сыграть в рулетку со стримером!");
      client.say(target, "Из редких наград: Игра без проверок, сабки, выбор игры на Ваш вкус!");
      client.say(target, "А также, легендарная награда! Стрим по World of Tanks");


}
    break;

    case "!держивкурсе":
      client.say(target, "держит в курсе");
    break;

    case "!instagram":
    case "!inst":
    case "!insta":
    case "!инстаграм":
    case "!инстаграмм":
      client.say(target, getMessageAboutInstagram());
    break;

    case "!banhammer":
      if (!checkPermission(username)){
        return;
      }

      var usersToBan = new Set(); 
      messageToFind = fullCommandName.substr(fullCommandName.indexOf(' ')+1);

      messages.forEach(function(item){
        if (item["msg"].includes(messageToFind)){
          usersToBan.add(item["user"]);
        }
      });

      console.log(usersToBan);

      usersToBan.forEach(function(user){
        useTimeoutForUser(target, user, 1, `Пуфнут банхаммером. За сообщение содержащее ${messageToFind}`);
      });

    break;

    case "!явниз":
      if (username === "pussmouse"){

        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter){
            client.say(target, `Главный эксперт по падению ВНИЗ удаляет VoD ${randomChatter}`);
          } else {
          }
        });
      }
    break;

    case "!unban":
      if (!checkPermission(username)){
        return;
      }
      try{
        const splittedCommand = fullCommandName.split(" ");
        console.log(splittedCommand);
        const targetName = splittedCommand[1];
        
        client.say(target, `/unban ${targetName}`);
        client.say(target , `${targetName} разбанен`);
      } catch (e){
        console.log(e);
      }
    break;

    case "!sub":
    case "!subscription":
    case "!саб":
      client.say(target, getMessageAboutSub());
    break;

    case "!попук":
      if(username === kpotkoName){
        client.say(target, "ТЬФУ В ПОПУКА!");
      }
    break;

    case "!ауф":
      client.say(target, "Все мои волки делают АУФ! wlshAYF wlshAYF wlshAYF");
      break;

    case "!вк":
      console.log("Выполнена команда !вк")
    case '!vk':
      client.say(target, getMessageAboutVk());
      console.log("Выполнена команда !vk")
      break;

    case "!дискорд":
    case '!discord': 
      client.say(target, getMessageAboutDiscord());
      break;

    
    case "!соцсети":
    case "!social":
      client.say(target, getMessageAboutAllSocialNetworks());
      break;

    case "!poof":
    case "!пуф":
    case "!ваниш":
        useTimeoutForUser(target, username, 1, "!poof")
      break;

    case "!донат":
    case "!donate":
      client.say(target, getMessageAboutDonate());
    break;

    case "!ой":
     if (username === kpotkoName){
        clearAllMessagesFromChat(target);
      }
    break;

    case "!чмо":

      client.say(target, "не обзывайся, обыдно же");

    break;

    case "!волчица":
      if (username === kpotkoName){
        client.say(target, "Альфа-волчица в чате!");
        client.say(target, "выказывает безграничное уважение");
        client.say(target, `@WLS_bot 😘👄 @kseniatheangel`);
      }
    break;

    case "!кусь":
      if (isBiteCooldownReady){

        const variants = ["ушко","носик", "жепку","щечку","шейку","плечико","ляшку","бочок","пальчик"];

        const randomVariant = variants[Math.round(Math.random() * (variants.length - 1))];

        isBiteCooldownReady = false;
        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter){
            client.say(target, `${username} куськает за ${randomVariant} ${randomChatter}`);
          } else {
            client.say(target, `${username} слишком одинок в этом чате, ему не кого кусать`);
          }
        });
        setTimeout(() => {
          isBiteCooldownReady = true;
        }, cooldownLength);
      }

    break;

    case "!тьфу":

      if (isSpitCooldownReady){
        isSpitCooldownReady = false;
        getChatters(channelName).then(data => {
        const randomChatter = getRandomChatterExceptInitiator(data, username);
        console.log(randomChatter);
        if (randomChatter) {
          client.say(target, `${username} PogChamp 💦 ${randomChatter}`);

        } else{
          client.say(target, `${username} слишком одинок в этом чате, ему не в кого плевать`);
        }
        });
        setTimeout(() => {
          isSpitCooldownReady = true;
        }, cooldownLength);
      }
    break;

    case "!чмок":
      if (isKissCooldownReady){

        const variants = ["губки", "щечку", "шейку", "пупок", "лобик", "жёпку"];

        const randomVariant = variants[Math.round(Math.random() * (variants.length-1))];

        isKissCooldownReady = false;
        getChatters(channelName).then(data => {
          const randomChatter = getRandomChatterExceptInitiator(data, username);
          console.log(randomChatter);
          if (randomChatter) {
            client.say(target, `${username} 😘👄 в ${randomVariant} ${randomChatter}`);
          } else{
            client.say(target, `${username} слишком одинок в этом чате, ему некого целовать`);
          }
        });
        setTimeout(() => {
          isKissCooldownReady = true;
        }, cooldownLength);
      }
    break;

    case "!777":
        const roll = Math.round(Math.random() * 100);
        client.say(target, `${username} крутит колесо удачи... На барабане число ${roll}`);
        if (roll === 0){
          client.say(target, `В этот раз ${username} повезло`);
        }
        useTimeoutForUser(target, username, roll, "777");
    break;

    case "!чблен":
    if (isDickCooldownReady){
      isDickCooldownReady = false;
      var additionalString = "";
      const dickLen = Math.round(Math.random() * 40);

      if (dickLen < 10) {
        additionalString = "какой коротыш";
      }
      if (dickLen > 30) {
        additionalString = "Ля какой большой";
      }
      if (dickLen == 0){
        client.say(target, "А чблена то и нет BibleThump");
      }else{
        client.say (target, `Длина в районе ${dickLen} см ${additionalString} Kappa`);
      }
      setTimeout(() => {
        isDickCooldownReady = true;
      }, cooldownLength);
    }
    break;

    case "!perma":

      if(!checkPermission(username)){
        return;
      }

      try{
        const splittedCommand = fullCommandName.split(" ");
        console.log(splittedCommand);
        const targetName = splittedCommand[1];
        
        client.say(target, `/ban ${targetName}`);
        client.say(target , `осуждает ${targetName} и даёт ему перманентный бан`);
      } catch (e){
        console.log(e);
      }

    break;

    case "!admin":

      if (!checkPermission(username)){
        return;
      }

      try{
        const splittedCommand = fullCommandName.split(" ");
        splittedCommand.shift();
        var targetName = splittedCommand.join(" ");
        client.say(target, targetName);
      } catch (e){
        console.log(e);
      }

    break;

    case "!впадина":
      if (isPussyCooldownReady){
        isPussyCooldownReady = false;
        var additionalString = "";

        const pussyDepth = Math.round(Math.random() * 40);

        if (pussyDepth == 0){
          client.say(target, `Впадина не обнаружена. Попробуй померить чблен.`);
        }else{
          client.say(target, `Глубина где-то ${pussyDepth} см ${additionalString} Kappa`);
        }
        setTimeout(() => {
        isPussyCooldownReady = true;
      }, cooldownLength);
    }
    break;

    case "!ставка":
      console.log("!ставка")

      if (!checkPermission(username)){
        return;
      }
      var args = fullCommandName.split(" ");
      args.shift();
      var arg = args.join(" ");
      console.log(arg);
      
      StartPredict(arg);
    break;

    case "!закрыть":

      var args = fullCommandName.split(" ");
      args.shift();
      var arg = args.join(" ");
      console.log(arg);
      ClosePredict(arg);
    break;

    case "!отмена":
      CancelPredict();
    break;

    case "!ставкаинфо":
      getPrediction();
    break;

    default:

  }
}

function writeToFile(array){
  fs.writeFileSync("list.txt", array);
}

function removeItemOnce(arr, value) {
  var arrLower = arr.map(v => v.toLowerCase());
  const stringToFind = value.toLowerCase();
  var index = arrLower.indexOf(stringToFind);
  console.log(index);
  if (index > -1) {
    arr.splice(index, 1);
  }
  if (arr.lenght == 0){
    return [];
  } else {
    return arr;
  }
}


function readListFromFile(){
  var content = fs.readFileSync('list.txt', 'utf8');
  if (content.length == 0){
    return [];
  } else{
    var contentList = content.split(",");
    return contentList;
  }
}

function readNoteFromFile(){
  var content = fs.readFileSync('note.txt', 'utf8');
  return content;
}

function writeNoteToFile(text){
  fs.writeFileSync('note.txt', text);
}

//Блок с функциями
//Метод возвращающий ник случайного пользователя из чата, кроме бота и инициатора. Если никто не найден возвращает пустую строку
function getRandomChatterExceptInitiator(chatters, initiator){
    var filteredChatters = chatters.filter(function(e) { return (e !== initiator && e !== botName)})

    if (filteredChatters.length > 0){
      return filteredChatters[Math.floor(Math.random() * filteredChatters.length)];
    } else {
      return "";
    }
}

function getRandomModer(moders){
  if (moders.length > 0){
      return moders[Math.floor(Math.random() * moders.length)];
    } else {
      return "";
    }
}

function getModers(channelName){
  const options = {
        uri: `https://tmi.twitch.tv/group/user/${channelName}/chatters`,
        json: true
    };
    return rp(options)
    .then(function (chatters) {
        return chatters["chatters"]["moderators"];
    })
    .catch(err => {
        throw err;
    })
}

//Метод получающий список всех пользователей в чате
function getChatters(channelName) {
    const options = {
        uri: `https://tmi.twitch.tv/group/user/${channelName}/chatters`,
        json: true
    };
    return rp(options)
    .then(function (chatters) {
        const chattersCount = chatters["chatter_count"];

        const broadcastersList = chatters["chatters"]["broadcaster"];
        const vipsList = chatters["chatters"]["vips"];
        const moderators = chatters["chatters"]["moderators"];
        const staff = chatters["chatters"]["staff"];
        const admins = chatters["chatters"]["admins"];
        const global_mods = chatters["chatters"]["global_mods"];
        const viewers = chatters["chatters"]["viewers"];

        const totalListOfUsersInChannel = broadcastersList
        .concat(vipsList)
        .concat(moderators)
        .concat(staff)
        .concat(admins)
        .concat(global_mods)
        .concat(viewers);

        return totalListOfUsersInChannel;

    })
    .catch(err => {
        throw err;
    })
}


function getDollarValue(){
  const options = {
    uri : `https://www.cbr-xml-daily.ru/daily_json.js`,
    json: true
  };
  return rp(options)
  .then(function(data) {
      return data["Valute"]["USD"]["Value"];
  })
  .catch (err => {
    throw err;
  })
}

function clearChannelName(channelName){
  if (channelName.startsWith('#')){
    return channelName.substring(1);
  } else{
    return channelName;
  }
}

function clearAllMessagesFromChat(target){
  client.clear(target);
}

function getMessageAboutDonate(){
  return "Если хочешь поддержать стримера - https://www.donationalerts.com/r/wholikeshadow";
}

function getMessageAboutSmoke(){
  return "Лучшая лаундж зона в городе Москва - Дымовуха";
}

function getMessageAboutVk(){
  return "https://vk.com/wlsclub - моя группа в ВК: анонсы стримов, мемы и всякая всячина. Подписываемся!";
}

function getMessageAboutDiscord(){
  return "wlshAYF Дискорд стаи: https://discord.gg/URwqnPdzHE wlshAYF";
}

function getMessageAboutInstagram(){
  return "Мой Инстаграмм - https://www.instagram.com/wholikeshadow/";
}

function getMessageAboutSub(){
  return "Присоединяйся к стае https://www.twitch.tv/products/wholikeshadow Лучший способ потратить 5$!";
}

function getMessageAboutAllSocialNetworks(){
  const vk = getMessageAboutVk();
  const discord = getMessageAboutDiscord();
  const instagram = getMessageAboutInstagram();
  return `${vk} ${discord} ${instagram}`;
} 

function messageInterval(i){
  const listOfMessages = [getMessageAboutInstagram(), getMessageAboutDiscord(), getMessageAboutVk(), getMessageAboutSub()];

  const target = getTargetFromChannelName(channelName);
  client.say(target, listOfMessages[i]);
}


function getTargetFromChannelName(channelName){
  return '#' + channelName;
}

//Метод вызывается каждый раз, когда бот коннектится к чату
function onConnectedHandler (addr, port) {
  client.say(getTargetFromChannelName(channelName), `/unban @kpotko`);
  console.log(`* Connected to ${addr}:${port}`);
  if (!messageTimeout){
    var i = 0;
    messageTimeout = setInterval(() => {
    console.log(`write message ${i}`);
    messageInterval(i);
    i = i+1;
    if (i > 3){
      i = 0;
    }
        //сделать список из фраз и каждую минуту писать следующее сообщение
    }, 300000);
  }
}

//Фильтруем чат. 
//TODO добавить массив - блеклист 
function tryToFilterMessage(target, username, message){

  if (!isBlacklistEnable){
    return;
  }

  const whiteList = ["nigg", "нигер", "негр", "пидор", "пидер"];

  if (whiteList.some(whiteList => message.includes(whiteList))){
      useTimeoutForUser(target, username, 1, "Фильтрация запрещенных слов");
  }
}

function useTimeoutForUser(targetChannel, username, timeoutDuration, timeoutMessage){
    try{
        client.timeout(targetChannel, username, timeoutDuration, timeoutMessage);
    } catch (e){
      console.log(e);
    }
}

function useUntimeoutForUser(targetChannel, username){
  try{
    client.untimeout(targetChannel, username);
  } catch (e){
    console.log(e);
  }
}

function getLastMafiaGameResult(){
  const user_id = "3294";
  request('https://playmafia.pro/cabinet/' + user_id, function (error, response, body) {
  const regex = /\games=\'([\s\S]+?)'/;
  m = regex.exec(body)
  var json = JSON.parse(m[1]);
  var last_game_id  = json[0].id;
  var last_game_role = json[0].role.title;
  var last_game_result = json[0].result.title;
    //console.log(last_game_id , last_game_role, last_game_result)

    request('https://playmafia.pro/game-statistics/' + last_game_id, function (error, response, body) {
      const regex = /\game-data=\'([\s\S]+?)'/;
      m = regex.exec(body);
      var json = JSON.parse(m[1]);

    var roles = {
        "godfather" : {"position":"", "nickname":""},
        "mafia" : [],
        "sheriff" : {"position":"", "nickname":""}
    }

    var new_json = json.players.map(function(ell, index){
        if(ell.role.type == "mafia"){
            roles.mafia.push({"position":ell.tablePosition, "nickname":ell.username})
        }else if (ell.role.type == "godfather"){
              roles.godfather.position = ell.tablePosition;
              roles.godfather.nickname = ell.username;
        }else if(ell.role.type == "sheriff"){
            roles.sheriff.position = ell.tablePosition;
            roles.sheriff.nickname = ell.username;
        }

    })
  
  console.log("В последней игре роль стримера - " + last_game_role + ". Результат - " +  last_game_result + ". Роли - Мафия: " +  roles.mafia[0].position + "(" + roles.mafia[0].nickname + "), " + 
      roles.mafia[1].position + "(" + roles.mafia[1].nickname + "); Дон - " + roles.godfather.position + "(" + roles.godfather.nickname + "); Шериф - " + roles.sheriff.position + "(" + roles.sheriff.nickname + ")" ) 

  client.say(target, "В последней игре роль стримера - " + last_game_role + ". Результат - " +  last_game_result + ". Роли: Мафия - " +  roles.mafia[0].position + "(" + roles.mafia[0].nickname + "), " + 
      roles.mafia[1].position + "(" + roles.mafia[1].nickname + "); Дон - " + roles.godfather.position + "(" + roles.godfather.nickname + "); Шериф - " + roles.sheriff.position + "(" + roles.sheriff.nickname + ")");
    
    });
  })
}

function ClosePredict(result=0){
  console.log("trying close predict");

  if(!global.twitch_bot_data.predict_status || global.twitch_bot_data.predict_id == "") return
  var need_change_data = false
  if(result){
    var winning_id = result == 1 ? global.twitch_bot_data.predict_outcomes[0] : global.twitch_bot_data.predict_outcomes[1]
    var body = {
      "broadcaster_id": streamer_id,
      "id": global.twitch_bot_data.predict_id,
      "status": "RESOLVED",
      "winning_outcome_id": winning_id
    }
    need_change_data = true
  }else{
    var body = {
      "broadcaster_id": streamer_id,
      "id": global.twitch_bot_data.predict_id,
      "status": "LOCKED"
    }
  }

 
  fetch('https://api.twitch.tv/helix/predictions', {
        method: 'patch',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' ,  'Authorization' : 'Bearer ' + ouath_token, 'Client-Id' : client_id},
    })
    .then(res => res.json())
    .then(json => { if(need_change_data){global.twitch_bot_data.predict_status = false; global.twitch_bot_data.predict_id = ""}})
  .catch(err => {console.log(err)})
  
}


function CancelPredict(){
  console.log("trying to cancel predict");

  if(!global.twitch_bot_data.predict_status || global.twitch_bot_data.predict_id == ""){
    console.log("123123123");
    console.log(global.twitch_bot_data.predict_id);
    getPredictionInfo();
    return;
  } 
  var body = {
    "broadcaster_id": streamer_id,
    "id": global.twitch_bot_data.predict_id,
    "status": "CANCELED"
  }
 
  fetch('https://api.twitch.tv/helix/predictions', {
        method: 'patch',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' ,  'Authorization' : 'Bearer ' + ouath_token, 'Client-Id' : client_id},
    })
    .then(res => res.json())
  .then(json => {
    global.twitch_bot_data.predict_status = false; 
    global.twitch_bot_data.predict_id = ""
  })
  .catch(err => {console.log(err)})
  
}

function getPredictionInfo(){
  var body = {
    "broadcaster_id": streamer_id,
  }

  fetch('https://api.twitch.tv/helix/predictions', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' ,  'Authorization' : 'Bearer ' + ouath_token, 'Client-Id' : client_id},
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => { 
      global.twitch_bot_data.predict_id = json.data[0].id; 
      global.twitch_bot_data.predict_outcomes[0] = json.data[0].outcomes[0].id; 
      global.twitch_bot_data.predict_outcomes[1] = json.data[0].outcomes[1].id; 
    })
    .then(console.log(global.twitch_bot_data))
    .catch(err => {
      global.twitch_bot_data.predict_status = false; console.log(err)
    });
}

function getPrediction(){
  var auth = "Bearer " + ouath_token;

  const options = {
        uri: `https://api.twitch.tv/helix/predictions?broadcaster_id=${streamer_id}&first = 1`,
        method:'GET',
        json: true,
        headers: {
          'Authorization': auth,
          'Client-Id': client_id
        },
    };

    console.log(options);
    rp(options)
    .then(function(data) {
      global.twitch_bot_data.predict_id = data.data[0].id;
      global.twitch_bot_data.predict_outcomes[0] = data.data[0].outcomes[0].id;
      global.twitch_bot_data.predict_outcomes[1] = data.data[0].outcomes[1].id;
      global.twitch_bot_data.predict_status = true;
      console.log(data);

      console.log(global.twitch_bot_data);
    })
    .catch(err => {
        throw err;
    })
}

function StartPredict(predict_type){
  console.log(global.twitch_bot_data);

  if(global.twitch_bot_data.predict_status || !( predict_type == "мафия" || predict_type == "хс" )) return;
  
  global.twitch_bot_data.predict_status = true;

  if(predict_type == "мафия"){
    var predict_name = "Чья команда победит"
    var variant1 = "Мафия"
    var variant2 = "Мирный город"
    var predict_time = 600
  } else if(predict_type == "хс"){
    var predict_name = "Какое место займёт стример"
    var variant1 = "1-3"
    var variant2 = "4-8"
    var predict_time = 180
  }else{
    return
  }
  console.log(predict_name)
  var body = {
    "broadcaster_id": streamer_id,
    "title": predict_name,
    "outcomes": [
    {"title": variant1},
    {"title": variant2}
    ],
    "prediction_window": predict_time
  }
  fetch('https://api.twitch.tv/helix/predictions', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' ,  'Authorization' : 'Bearer ' + ouath_token, 'Client-Id' : client_id},
    })
    .then(res => res.json())
  .then(json => {
    global.twitch_bot_data.predict_id = json.data[0].id;
    global.twitch_bot_data.predict_outcomes[0] = json.data[0].outcomes[0].id; 
    global.twitch_bot_data.predict_outcomes[1] = json.data[0].outcomes[1].id })
  .catch(err => {global.twitch_bot_data.predict_status = false; console.log(err)})
}


//Триггер на вход пользователя в чат
client.on("join", (channel, username, self) => {
    switch (username){

//      case kpotkoName:
//         client.say(channel, "Великий и могучий Кротко ин да хауз! Все волки делают АУФ!");
//      break;
    }
});

//Триггер на покидание пользователем чата
client.on("part", (channel, username, self) => {
    switch (username){
      case kpotkoName:
        //client.say(channel, "Мой создатель сделал всем больно и покинул чат.");
      break;
    } 
});