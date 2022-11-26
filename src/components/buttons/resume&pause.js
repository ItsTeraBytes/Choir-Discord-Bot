module.exports = async ({  interaction, queue }) => { 
    if (!queue || !queue.playing) return interaction.reply({ content: `❌ | No music currently playing`, ephemeral: true });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    

    return interaction.reply({ content: `${success ? `✅ | Current music ${queue.current.title} paused` : `✅ | Current music ${queue.current.title} resumed`}`, ephemeral: true});
}