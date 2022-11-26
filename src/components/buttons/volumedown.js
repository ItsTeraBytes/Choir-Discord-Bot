const maxVol = config.music.maxVol;

module.exports = async ({  interaction, queue }) => { 
    if (!queue || !queue.playing) return interaction.reply({ content: `❌ | No music currently playing`, ephemeral: true });

        const vol = Math.floor(queue.volume - 5)

        if (vol < 0 ) return interaction.reply({ content: `❌ | I can not move the volume down any more ${interaction.member}`, ephemeral: true })
        
        if (queue.volume === vol) return interaction.reply({ content: `❌ | The volume you want to change is already the current one ${interaction.member}`, ephemeral: true });

        const success = queue.setVolume(vol);

        return interaction.reply({ content:success ? `✅ | The volume has been modified to **${vol}**/**${maxVol}**% 🔊` : `❌ | Something went wrong ${interaction.member}`, ephemeral: true});
}