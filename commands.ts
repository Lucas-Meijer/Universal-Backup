const commands: ChatCommands = {
	js: 'eval',
	eval: function (target, room, user) {
		if (!this.can('dev') || !target) return;
		try {
			let result = Tools.stringify(eval(target));
			result = result.replace(/\n/g, '');
			if (result.length > 250) {
				result = `${result.slice(0, 247)}...`;
			}
			this.reply(`<< ${result}`);
		} catch (e) {
			this.replyPM(`<< An error was thrown while trying to eval; please check the console.`);
			console.log(`[Commands.eval] An error occurred: ${e.stack}`);
		}
	},
	c: function (target, room, user) {
		if (!this.can('dev') || !target) return;
		this.reply(target);
	},
	git: function () {
		this.replyPM(`https://github.com/HoeenCoder/Universal-Backup/`);
	},
	help: function () {
		this.replyPM(`https://github.com/HoeenCoder/Universal-Backup/blob/master/docs.md`);
	},
	update: function (target) {
		if (!this.can('dev')) return;
		let result = '';
		try {
			result = String(require('child_process').execSync('git fetch origin master && git merge origin master'));
		} catch (e) {
			this.replyHTMLPM(e.stack ? String(e.stack).replace(/\n/g, '<br/>') : 'Crash while updating');
		}
		this.replyHTMLPM(result ? result.replace(/\n/g, '<br/>') : 'Error while updating');
	},
	hotpatch: function () {
		if (!this.can('dev')) return;
		Chat.uncacheDirectory('./plugins');
		Chat.uncacheFile('./commands.js');
		Chat.uncacheFile('./mafia.js');
		Chat.uncacheFile('./mafia-data.js');
		for (const c in Chat.Commands) delete Chat.Commands[c];
		try {
			// @ts-ignore readonly
			Chat.events = new Tools.Events();
			global.Mafia = require('./mafia');
			Chat.loadCommands();
		} catch (e) {
			this.replyPM(e);
		}
		this.replyPM(`Hotpatched. ${Object.keys(Chat.Commands).length} commands/aliases loaded`);
	},
	loadcredentials: function (target, room) {
		if (!this.can('dev')) return false;
		Chat.Slaves.LoadCredentials();
		this.reply(`Reloaded credentials. ${Chat.Slaves.CountCredentials()} accounts are available.`);
	},
	alts: function (target, room) {
		this.reply((room?.alts.get(target)||["Hi"]).join(", ")); 
	},
};

Chat.events.on('pm', (room, details) => {
	
});

exports.commands = commands;
