from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext, CallbackQueryHandler
import sqlite3

# Token do seu bot (DO BOTFATHER)
TOKEN = "7990108503:AAEIwfQplE2kniTIv-LD-M8tAYuzUIJiVGQ"

# Link do conteúdo +18 (substitua pelo real!)
LINK_CONTEUDO = "https://t.me/+abcDEF123456"

# Banco de dados local para armazenar usuários
conn = sqlite3.connect('usuarios.db', check_same_thread=False)
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS usuarios (user_id INTEGER PRIMARY KEY, idade_confirmada BOOLEAN)")
conn.commit()

# Comando /start
def start(update: Update, context: CallbackContext):
    teclado = [[InlineKeyboardButton("🔞 Acessar conteúdo +18", callback_data='confirmar_idade')]]
    update.message.reply_text("👋 Bem-vindo! Clique abaixo para continuar:", reply_markup=InlineKeyboardMarkup(teclado))

# Resposta aos botões
def button(update: Update, context: CallbackContext):
    query = update.callback_query
    user_id = query.from_user.id
    query.answer()

    if query.data == 'confirmar_idade':
        teclado = [[
            InlineKeyboardButton("✅ Sim, tenho +18", callback_data='sim'),
            InlineKeyboardButton("❌ Não", callback_data='nao')
        ]]
        query.edit_message_text("Você tem mais de 18 anos?", reply_markup=InlineKeyboardMarkup(teclado))

    elif query.data == 'sim':
        cursor.execute("INSERT OR REPLACE INTO usuarios (user_id, idade_confirmada) VALUES (?, ?)", (user_id, True))
        conn.commit()
        teclado = [[InlineKeyboardButton("💰 Acessar conteúdo pago", url=LINK_CONTEUDO)]]
        query.edit_message_text("✅ Idade confirmada! Clique abaixo para acessar o conteúdo:", reply_markup=InlineKeyboardMarkup(teclado))

    elif query.data == 'nao':
        query.edit_message_text("❌ Acesso negado. Este conteúdo é apenas para maiores de idade.")

# Comando manual: /liberar
def liberar(update: Update, context: CallbackContext):
    user_id = update.effective_user.id
    cursor.execute("SELECT idade_confirmada FROM usuarios WHERE user_id = ?", (user_id,))
    resultado = cursor.fetchone()

    if resultado and resultado[0]:
        update.message.reply_text(f"🔓 Conteúdo liberado: {LINK_CONTEUDO}")
    else:
        update.message.reply_text("⚠️ Você precisa confirmar sua idade. Envie /start")

# Início do bot
def main():
    updater = Updater(TOKEN)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CallbackQueryHandler(button))
    dp.add_handler(CommandHandler("liberar", liberar))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()