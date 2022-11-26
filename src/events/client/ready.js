module.exports = {
    name: `ready`,
    once: true,
    async execute (client) {
        console.log(`We have logged in as ${client.user.tag}`);
    }
}