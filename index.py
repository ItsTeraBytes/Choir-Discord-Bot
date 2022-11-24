import discord
import json
import datetime

intents = discord.Intents.default()
intents.message_content = True

devconfig = json.load(open('DO NOT PUSH THIS FILE.json'))

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client), datetime.datetime.now(), "UTC")

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$test'):
        await message.channel.send('It works!')

client.run(devconfig['TOKEN'])