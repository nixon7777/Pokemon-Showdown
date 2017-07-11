/*--
    Herramientas para desarroladores
        Estas herramientas ayudan al dev
        a editar o manipular el servidor
        de manera mas sencilla.
--*/

'use strict';

const path = require('path');
const fs = require('fs');

let CSS_DIR = path.resolve(CONFIG_DIR + 'custom.css');

exports.commands = {
	readfile: function (target, room, user, connection) {
		if (!user.hasConsoleAccess(connection)) return this.errorReply('/readfile - Access denied.');
		if (!target) return this.parse('/help readfile');
		fs.readFile(target, 'utf8', (err, fileSrc) => {
			if (err && err.code === 'ENOENT') return this.errorReply('No se encontro el archivo ' + target);
			if (err) return this.errorReply(`${err.message}`);
			return this.sendReplyBox(
					`<div class="infobox-limited"><code>${Chat.escapeHTML(fileSrc).split(/\r?\n/).map(line => {
						return line.replace(/^(\t+)/, (match, $1) => '&nbsp;'.repeat(4 * $1.length)).replace(/^(\s+)/, (match, $1) => '&nbsp;'.repeat($1.length));
					}).join('<br />')}</code></div>`
				);
		});
		return;
	},
	readfilehelp: ['/readfile [archivo] - Muestra el codigo de un archivo.'],

	boton: function (target, room, user) {
		if (!user.can('hotpatch')) return false;
		this.sendReply('Preparando bot...');

		try {
			Bot.on();
			this.sendReply('Bot encendido!');
		} catch (e) {
			this.errorReply('Ocurrio un error al intentar encender el bot');
			this.errorReply(e);
		}
	},

	cssedit: function (target, room, user, connection) {
		if (!user.hasConsoleAccess(connection)) return this.errorReply('/cssedit - Access denied.');
		if (!target) {
			fs.readFile(CSS_DIR, 'utf8', (err, cssSrc) => {
				if (err && err.code === 'ENOENT') return this.errorReply('No se encontro el archivo custom.css');
				if (err) return this.errorReply(`${err.message}`);
				return this.sendReplyBox(
					`<div class="infobox-limited"><code>${Chat.escapeHTML(cssSrc).split(/\r?\n/).map(line => {
						return line.replace(/^(\t+)/, (match, $1) => '&nbsp;'.repeat(4 * $1.length)).replace(/^(\s+)/, (match, $1) => '&nbsp;'.repeat($1.length));
					}).join('<br />')}</code></div>`
				);
			});
			return;
		}

		fs.writeFile(CSS_DIR, target.replace(/[\r\n]+/, '\n'), err => {
			if (err) return this.errorReply(`${err.message}`);
			return this.sendReply(`custom.css editado exitosamente`);
		});
	},
};

process.nextTick(() => {
	Chat.multiLinePattern.register('/cssedit ');
});
