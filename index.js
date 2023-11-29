const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options.js')
const token = '6867495046:AAGe59X1HUebCfrJmVN55luuCNr7r2DQFGs'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Приветствие'},
    {command: '/game', description: 'Игра угадай цифру'},
]);

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Сейчас я загадаю тебе цифру от 0 до 9, а ты должен ее отгадать');
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}



  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      const chatId = msg.chat.id;await bot.sendMessage(chatId, 'Привет)');
    }

    if (text === '/game') {
      return startGame(chatId);
    }

 
      
    
    return await bot.sendMessage(chatId, 'напиши /Hello)');
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === '/again'){
      return startGame(chatId);
    }
    if(data == chats[chatId]) {
      console.log(chats[chatId])
      return await bot.sendMessage(chatId, 'Поздравляю ты отгадал цифру - ' + chats[chatId], againOptions)
    } else {
      console.log(chats[chatId])
      return await bot.sendMessage(chatId, 'К сожалению ты не угадал, бот загадал цифру - ' + chats[chatId], againOptions)
    }
  })

}

start()