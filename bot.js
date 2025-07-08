const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const botToken = '7990108503:AAEIwfQplE2kniTIv-LD-M8tAYuzUIJiVGQ';
const bot = new Telegraf(botToken);

const grupoVip = 'https://t.me/+cqN4O0LsWctiNTNh';

// URL pública do seu bot webhook (substitua pela sua URL real do Heroku ou outro serviço)
const URL = process.env.APP_URL || 'https://seu-dominio-aqui.com';

// Porta do servidor (Heroku define automaticamente via PORT)
const PORT = process.env.PORT || 3000;

// --------- Comandos e ações ---------

bot.start(async (ctx) => {
  await ctx.reply('💋 Bem-vindo ao meu mundo, amor...', Markup.inlineKeyboard([
    Markup.button.callback('🔥 INICIAR 🔥', 'iniciar')
  ]));
});

bot.action('iniciar', async (ctx) => {
  try {
    await ctx.deleteMessage();

    // Envia áudio primeiro
    await ctx.replyWithVoice({ url: 'https://telegra.ph/file/your-audio.ogg' }); // Coloque seu áudio válido

    // Envia vídeo com legenda e botão
    await ctx.replyWithVideo(
      { url: 'https://telegra.ph/file/your-video.mp4' }, // Coloque seu vídeo válido
      {
        caption:
          `Oii, gato! Bem-vindo ao meu cantinho especial 😘\n\n` +
          `Aqui tem meus vídeos íntimos e um espaço secreto com conteúdos ainda mais quentes 🔥\n\n` +
          `Fica à vontade pra explorar… e se quiser algo só seu, é só me chamar 😏💖\n\n` +
          `𝐐𝐮𝐞𝐦 𝐬𝐚𝐛𝐞 𝐧ã𝐨 𝐬𝐞𝐣𝐚 𝐬ó 𝐨 𝐜𝐨𝐦𝐞ç𝐨 𝐝𝐞 𝐚𝐥𝐠𝐨 𝐞𝐧𝐭𝐫𝐞 𝐚 𝐠𝐞𝐧𝐭𝐞... 😉\n` +
          `𝘾𝙡𝙞𝙘𝙖 𝙖𝙦𝙪𝙞 𝙚 𝙫𝙚𝙢 𝙘𝙤𝙣𝙝𝙚𝙘𝙚𝙧 𝙢𝙚𝙪𝙨 𝙨𝙚𝙜𝙧𝙚𝙙𝙞𝙣𝙝𝙤𝙨, 𝙜𝙖𝙩𝙞𝙣𝙝𝙤 👇`,
        parse_mode: 'Markdown',
        reply_markup: Markup.inlineKeyboard([
          Markup.button.callback('💖 Entrar no Cantinho 💖', 'escolher_plano')
        ])
      }
    );
  } catch (error) {
    console.error(error);
  }
});

bot.action('escolher_plano', async (ctx) => {
  await ctx.editMessageText(
    '💎 Selecione o plano abaixo:',
    Markup.inlineKeyboard([
      [Markup.button.callback('💎 Vitalício - R$24,99', 'vitalicio')],
    ])
  );
});

bot.action('vitalicio', async (ctx) => {
  const pix = `00020101021226800014br.gov.bcb.pix2558pix.delbank.com.br/v2/cob/vcharge4ae9a52ab0e54b868e9bc69e05204000053039865802BR5907DELBANK6007ARACAJU62070503***6304D703`;

  await ctx.editMessageText(
    `🌟 Você selecionou o seguinte plano:\n\n` +
    `🎁 Plano: 💎VITALÍCIO💎\n` +
    `💰 Valor: R$24,99\n\n` +
    `💠 Pague via Pix Copia e Cola:\n\n` +
    `\`${pix}\`\n\n` +
    `👆 Toque na chave PIX acima para copiá-la\n\n` +
    `‼️ Após o pagamento, clique no botão abaixo para verificar o status.`,
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.inlineKeyboard([
        Markup.button.callback('✅ Já paguei, confirmar!', 'confirmar'),
      ])
    }
  );
});

bot.action('confirmar', async (ctx) => {
  // Aqui você vai integrar sua API real de pagamento no futuro
  // Por enquanto, simule um pagamento não confirmado

  const pagamentoConfirmado = false; // Mude para true se quiser testar pagamento confirmado

  if (pagamentoConfirmado) {
    await ctx.reply(`✅ Pagamento confirmado!\n\n🚪 Acesse agora: ${grupoVip}`);
  } else {
    await ctx.reply(
      `❌ Pagamento ainda não confirmado. Tente novamente mais tarde.\n\n` +
      `Caso precise de suporte, entre em contato com: @Segredinho_jade`
    );
  }
});

// --------- Configurando o servidor webhook ---------

const app = express();

app.use(express.json());

// Endpoint para receber atualizações do Telegram
app.use(bot.webhookCallback('/secret-path')); // altere "/secret-path" para sua rota secreta

// Inicia servidor na porta definida
app.listen(PORT, () => {
  console.log(`🌐 Servidor webhook rodando na porta ${PORT}`);
});

// Seta webhook no Telegram para receber atualizações
bot.telegram.setWebhook(`${URL}/secret-path`).then(() => {
  console.log('Webhook configurado com sucesso!');
}).catch(console.error);
