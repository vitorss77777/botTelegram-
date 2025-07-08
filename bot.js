const { Telegraf, Markup } = require('telegraf');

// Seu token do BotFather
const bot = new Telegraf('7990108503:AAEIwfQplE2kniTIv-LD-M8tAYuzUIJiVGQ');

// Link do grupo vitalício
const grupoVip = 'https://t.me/+cqN4O0LsWctiNTNh';

// Comando /start
bot.start(async (ctx) => {
  await ctx.reply(
    '💋 Bem-vindo ao meu mundo, amor...',
    Markup.inlineKeyboard([
      Markup.button.callback('🔥 INICIAR 🔥', 'iniciar')
    ])
  );
});

// Ação: INICIAR
bot.action('iniciar', async (ctx) => {
  try {
    await ctx.deleteMessage();

    // Primeiro envia o áudio
    await ctx.replyWithVoice({ url: 'https://telegra.ph/file/your-audio.ogg' }); // Substitua pelo seu link real de áudio

    // Depois envia o vídeo com o texto e o botão
    await ctx.replyWithVideo(
      { url: 'https://telegra.ph/file/your-video.mp4' }, // Substitua pelo seu link real de vídeo
      {
        caption:
          `Oii, gato! Bem-vindo ao meu cantinho especial 😘\n\n` +
          `Aqui tem meus vídeos íntimos e um espaço secreto com conteúdos ainda mais quentes 🔥\n\n` +
          `Fica à vontade pra explorar… e se quiser algo só seu, é só me chamar 😏💖\n\n` +
          `𝐐𝐮𝐞𝐦 𝐬𝐚𝐛𝐞 𝐧ã𝐨 𝐬𝐞𝐣𝐚 𝐬ó 𝐨 𝐜𝐨𝐦𝐞ç𝐨 𝐝𝐞 𝐚𝐥𝐠𝐨 𝐞𝐧𝐭𝐫𝐞 𝐚 𝐠𝐞𝐧𝐭𝐞... 😉\n\n` +
          `𝘾𝙡𝙞𝙘𝙖 𝙖𝙦𝙪𝙞 𝙚 𝙫𝙚𝙢 𝙘𝙤𝙣𝙝𝙚𝙘𝙚𝙧 𝙢𝙚𝙪𝙨 𝙨𝙚𝙜𝙧𝙚𝙙𝙞𝙣𝙝𝙤𝙨, 𝙜𝙖𝙩𝙞𝙣𝙝𝙤 👇`,
        reply_markup: Markup.inlineKeyboard([
          Markup.button.callback('💖 Entrar no Cantinho 💖', 'escolher_plano')
        ])
      }
    );
  } catch (error) {
    console.error(error);
  }
});

// Ação para escolher o plano
bot.action('escolher_plano', async (ctx) => {
  await ctx.editMessageText(
    '💎 Selecione o plano abaixo:',
    Markup.inlineKeyboard([
      [Markup.button.callback('💎 Vitalício - R$24,99', 'vitalicio')],
    ])
  );
});

// Ação plano vitalício
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

// Ação para confirmar pagamento
bot.action('confirmar', async (ctx) => {
  // Aqui você pode implementar integração com API de verificação automática.
  // Por enquanto, vamos simular pagamento NÃO confirmado.

  const pagamentoConfirmado = false; // Altere para true se implementar verificação real

  if (pagamentoConfirmado) {
    await ctx.reply(`✅ Pagamento confirmado!\n\n🚪 Acesse agora: ${grupoVip}`);
  } else {
    await ctx.reply(
      `❌ Pagamento ainda não confirmado. Tente novamente mais tarde.\n\n` +
      `Caso precise de suporte, entre em contato com: @Segredinho_jade`
    );
  }
});

// Inicia o bot
bot.launch();
console.log('🤖 Bot rodando...');