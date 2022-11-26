module.exports = {
    name: 'back',
    description: "Go back the song before",
    voiceChannel: true,

    async execute({ interaction }) {
        const queue = player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return interaction.reply({ content: `There was no music played before ${inter.member}... try again ? ❌`, ephemeral: true });

        await queue.back();

        interaction.reply({ content:`Playing the **previous** track ✅`});
    },
};