/*-
    Estados
        Este plugin permite añadir al nombre
        de usuario un pequeño estado que se
        muestra en burbujas.

        © Morfent
-*/

'use strict';

exports.commands = {
	away: function (target, room, user) {
		if (!user.isAway && user.name.length > 15) return this.sendReply('Su nombre de usuario es demasiado largo para cualquier tipo de uso de este comando.');

		target = target ? target.replace(/[^a-zA-Z0-9]/g, '') : 'AWAY';
		let newName = user.name;
		let status = Utils.BubbleMap.convertion(target, true);
		let statusLen = status.length;
		if (statusLen > 14) return this.sendReply('Su estado ausente debe ser corto, no una disertación sobre por qué estás ausente.');

		if (user.isAway) {
			let statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/);
			if (statusIdx > -1) newName = newName.substr(0, statusIdx);
			if (user.name.substr(-statusLen) === status) return this.sendReply('Ahora estás "' + target + '".');
		}

		newName += ' - ' + status;
		if (newName.length > 18) return this.sendReply('El tipo de ausente que trataste de seleccionar "' + target + '" es muy largo para tu nick.');

        // forcerename any possible impersonators
		let targetUser = Users.getExact(user.userid + target);
		if (targetUser && targetUser !== user && targetUser.name === user.name + ' - ' + target) {
			targetUser.resetName();
			targetUser.send('|nametaken||Your name conflicts with ' + user.name + (user.name.substr(-1) === 's' ? '\'' : '\'s') + ' new away status.');
		}

		if (user.can('lock', null, room)) this.add('|raw|-- ' + Utils.Colors.apply(user.name, 'bold') + ' ahora está ' + target.toLowerCase() + '.');
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = true;
	},

	back: function (target, room, user) {
		if (!user.isAway) return this.sendReply('Tu no te encuentras/encontrabas ausente.');
		user.isAway = false;

		let newName = user.name;
		let statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/);
		if (statusIdx < 0) {
			user.isAway = false;
			if (user.can('lock', null, room)) this.add('|raw|-- ' + Utils.Colors.apply(user.name, 'bold') + ' ya no está ausente.');
			return false;
		}

		let status = Utils.BubbleMap.convertion(newName.substr(statusIdx + 3), false);
		newName = newName.substr(0, statusIdx);
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = false;
		if (user.can('lock', null, room)) this.add('|raw|-- ' + Utils.Colors.apply(user.name, 'bold') + '  ya no está ' + status.toLowerCase() + '.');
	},

	afk: function (target, room, user) {
		this.parse('/away AFK', room, user);
	},
};
