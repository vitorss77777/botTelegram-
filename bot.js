
import express from 'express';
import { Telegraf } from 'telegraf';

const botToken = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL; // URL do seu app no Render, ex: https://meu-bot.onrender.com

if (!botToken) {
  console.error('❌ Erro: variável BOT_TOKEN não definida');
  process.exit(1);
}

if (!APP_URL) {
  console.error('❌ Erro: variável APP_URL não definida');
  process.exit(1);
}

const bot = new Telegraf(botToken);
const app = express();

// Middleware webhook
app.use(bot.webhookCallback(`/bot${botToken}`));

// Comando /start
bot.start((ctx) => {
  return ctx.reply(
    'Oi! Clique no botão para conhecer meus segredos.',
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '𝘾𝙡𝙞𝙘𝙖 𝙖𝙦𝙪𝙞 𝙚 𝙫𝙚𝙢 𝙘𝙤𝙣𝙝𝙚𝙘𝙚𝙧 𝙢𝙚𝙪𝙨 𝙨𝙚𝙜𝙧𝙚𝙙𝙞𝙣𝙝𝙤𝙨, 𝙜𝙖𝙩𝙞𝙣𝙝𝙤👇',
              url: 'https://t.me/SeuCanalOuLink' // troca pelo seu link
            }
          ],
          [
            {
              text: '‼️ Após o pagamento, clique aqui para verificar o status.',
              callback_data: 'verificar_pagamento'
            }
          ]
        ]
      }
    }
  );
});

// Callback do botão "verificar_pagamento"
bot.action('verificar_pagamento', async (ctx) => {
  // Aqui a lógica para verificar pagamento (exemplo mock)
  const pagamentoConfirmado = false; // coloque sua checagem real

  if (pagamentoConfirmado) {
    await ctx.reply('Pagamento confirmado! Aqui estão seus segredos...');
  } else {
    await ctx.reply(
      'Pagamento ainda não confirmado. Tente novamente mais tarde.\n' +
      'Caso precise de suporte, entre em contato com: @Segredinho_jade'
    );
  }
});

// Configura webhook com Telegram
(async () => {
  try {
    await bot.telegram.setWebhook(`${APP_URL}/bot${botToken}`);
    console.log(`Webhook configurado para: ${APP_URL}/bot${botToken}`);
  } catch (error) {
    console.error('Erro ao configurar webhook:', error);
  }
})();

// Inicia servidor Express
app.listen(PORT, () => {
  console.log(`Servidor webhook rodando na porta ${PORT}`);
});