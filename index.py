import discord
import json
import time

intents = discord.Intents.default()
intents.message_content = True

devconfig = json.load(open("DO NOT PUSH THIS FILE.json"))

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {0.user}'.format(client), datetime.datetime.now(), "UTC")

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

client.run(DEVCONFIG['TOKEN'])