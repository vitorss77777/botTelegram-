const express = require('express');
const { Telegraf, Markup } = require('telegraf');

const botToken = '7990108503:AAEIwfQplE2kniTIv-LD-M8tAYuzUIJiVGQ';
const PORT = process.env.PORT || 3000;
const RENDER_URL = 'https://SEU-SERVIÇO.onrender.com'; // <== Troque aqui pelo seu domínio Render

const bot = new Telegraf(botToken);
const app = express();

const grupoVip = 'https://t.me/+cqN4O0LsWctiNTNh';

// Comando /start
bot.start(async (ctx) => {
  await ctx.reply('💋 Bem-vindo ao meu mundo, amor...', Markup.inlineKeyboard([
    Markup.button.callback('🔥 INICIAR 🔥', 'iniciar')
  ]));
});

// Ação INICIAR
bot.action('iniciar', async (ctx) => {
  try {
    await ctx.deleteMessage();

    // Envia o áudio primeiro
    await ctx.replyWithVoice({ url: 'https://telegra.ph/file/your-audio.ogg' }); // Troque pelo seu áudio

    // Envia o vídeo com legenda e botão
    await ctx.replyWithVideo(
      { url: 'https://telegra.ph/file/your-video.mp4' }, // Troque pelo seu vídeo
      {
        caption:
          `Oii, gato! Bem-vindo ao meu cantinho especial 😘\n\n` +
          `Aqui tem meus vídeos íntimos e um espaço secreto com conteúdos ainda mais quentes 🔥\n\n` +
          `Fica à vontade pra explorar… e se quiser algo só seu, é só me chamar 😏💖\n\n` +
          `𝐐𝐮𝐞𝐦 𝐬𝐚𝐛𝐞 𝐧ã𝐨 𝐬𝐞𝐣𝐚 𝐬ó 𝐨 𝐜𝐨𝐦𝐞ç𝐨 𝐝𝐞 𝐚𝐥𝐠𝐨 𝐞𝐧𝐭𝐫𝐞 𝐚 𝐠𝐞𝐧𝐭𝐞... 😉\n` +
          `𝘾𝙡𝙞𝙘𝙖 𝙖𝙦𝙪𝙞 𝙚 𝙫𝙚𝙢 𝙘𝙤𝙣𝙝𝙚𝙘𝙚𝙧 𝙢𝙚𝙪𝙨 𝙨𝙚𝙜𝙧𝙚𝙙𝙞𝙣𝙝𝙤𝙨, 𝙜𝙖𝙩𝙞𝙣𝙝𝙤👇`,
        reply_markup: Markup.inlineKeyboard([
          Markup.button.callback('💖 Entrar no Cantinho 💖', 'escolher_plano')
        ]),
      }
    );
  } catch (error) {
    console.error(error);
  }
});

// Escolher plano
bot.action('escolher_plano', async (ctx) => {
  await ctx.editMessageText(
    '💎 Selecione o plano abaixo:',
    Markup.inlineKeyboard([
      [Markup.button.callback('💎 Vitalício - R$24,99', 'vitalicio')],
    ])
  );
});

// Plano Vitalício - pagamento Pix
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

// Confirmar pagamento (simulação)
bot.action('confirmar', async (ctx) => {
  // Aqui você deve integrar com sua API de verificação de pagamento
  // Por enquanto, simula pagamento não confirmado:
  const pagamentoConfirmado = false;

  if (pagamentoConfirmado) {
    await ctx.reply(`✅ Pagamento confirmado!\n\n🚪 Acesse agora: ${grupoVip}`);
  } else {
    await ctx.reply(
      `❌ Pagamento ainda não confirmado. Tente novamente mais tarde.\n\n` +
      `Caso precise de suporte, entre em contato com: @Segredinho_jade`
    );
  }
});

// Configurar webhook callback para express
app.use(bot.webhookCallback(`/bot${botToken}`));

// Configurar webhook no Telegram
(async () => {
  try {
    await bot.telegram.setWebhook(`${RENDER_URL}/bot${botToken}`);
    console.log('Webhook configurado com sucesso:', `${RENDER_URL}/bot${botToken}`);
  } catch (error) {
    console.error('Erro ao configurar webhook:', error);
  }
})();

// Iniciar servidor express
app.listen(PORT, () => {
  console.log(`Servidor webhook rodando na porta ${PORT}`);
});