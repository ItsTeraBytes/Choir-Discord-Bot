module.exports = async ({  interaction, queue }) => { 
    if (!queue || !queue.playing) return interaction.reply({ content: `❌ | No music currently playing`, ephemeral: true });
    
    const success = queue.skip();

    return interaction.reply({ content: success ? `✅ | Current music ${queue.current.title} skipped` : `❌ | Something went wrong ${inter.member}`, ephemeral: true});
}