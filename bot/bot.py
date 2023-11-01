# pip install python-telegram-bot==12.7
import telegram
from telegram import Update, ReplyKeyboardMarkup, KeyboardButton
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext

# Replace 'YOUR_BOT_TOKEN' with your actual bot token
bot_token = 'YOUR_BOT_TOKEN'

# Initialize the Telegram bot
bot = telegram.Bot(token=bot_token)

# Define a function to handle the /start command
def start(update, context):
    # Create a custom keyboard
    custom_keyboard = [
        [KeyboardButton("Option 1")],
        [KeyboardButton("Option 2")]
    ]
    reply_markup = ReplyKeyboardMarkup(custom_keyboard, resize_keyboard=True, one_time_keyboard=True)

    # Send the initial message with the custom keyboard
    update.message.reply_text("Hi, welcome to the bot!", reply_markup=reply_markup)

# Define a function to handle text messages
def handle_text(update, context):
    text = update.message.text
    if text.lower() == 'specific text':
        update.message.reply_text("You sent the specific text!")

def main():
    updater = Updater(token=bot_token, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_text))

    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
