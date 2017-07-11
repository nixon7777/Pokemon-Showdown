/*--
    Sistema monetario
        Este plugin sostiene todo el sistema
        monetario del servidor, es el encargado
        de efectuar las compras, dar los articulos,
        etc.

        © panpawn
--*/

'use strict';

const fs = require('fs');
const moneyName = Utils.Money.moneyName;

let prices;

// Precios medidos
// ----------
// Esto permite modificar el precio de un articulo mediante un
// simple calculo que tu mismo debes hacer.
// Funciona asi:
//  Se toma el promedio de PDs que un usuario deberia tener, (calculado
//  en moneyCirculating) y este se multiplica por una cifra, el resultado
//  sera el precio que el articulo tendra.
// Ejemplo:
//  Si el promedio es de 10PDs por usuario, entonces 10 * 0.5 (el 0.5 es
//  la cifra a multiplicar), nos daria un total de 5, entonces 5 PDs valdra
//  ese articulo, mientras el promedio no suba.
// Hay que tener mucho cuidado al usar este metodo, ya que cada
// vez que cambie el promedio cambiara tambien el precio del
// articulo.

function pricesConstructor() {
	let calc = Utils.Money.moneyCirculating()[1];

	prices = {
	    // Para hacer el precio a la medida, utiliza:
	    // 'articulo': Math.round(calc * num),
	    'simbolo': Math.round(calc * 0.035),
	};
}

exports.commands = {
	tienda: 'shop',
	shop: function (target, room, user) {
		if (!this.runBroadcast()) return;

		pricesConstructor();

		let Shop = {
			header: '<center><h3><b><u>Tienda virtual!</u></b></h3><table border="1" cellspacing ="2" cellpadding="3" style="border:1px solid #000000; border-radius: 5px; width: 100%;"><tr><th>Articulo</th><th>Descripcion</th><th>Precio</th></tr>',
			footer: '</table>',
		};

		return this.sendReply('|raw|' +
            Shop.header +
            // Utils.Money.makeItem('articulo', 'descripcion', precio);
            Utils.Money.makeItem('Simbolo', 'Obten un simbolo personalizado alado de tu nick durante tu estadia en el servidor.', prices['simbolo']) +
            Shop.footer
        );
	},

	buy: function (target, room, user) {
	    pricesConstructor();
	    if (!target) return this.parse("/help buy");

	    let parts = target.split(',');
	    let price;

	    function moneyCheck(price) {
	        if (Utils.Money.readMoney(user.userid) < price) return false;
	        if (Utils.Money.readMoney(user.userid) >= price) return true;
	}

		function processPurchase(price, item, desc) {
	        if (!desc) desc = '';
	        if (Utils.Money.readMoney(user.userid) < price) return false; // this should never happen
	        Utils.Money.updateMoney(user.userid, -price);
	        Utils.Money.logTransaction(user.name + ' ha comprado un ' + item + '. ' + desc);
		}

		switch (toId(parts[0])) {
		    case 'simbolo':
		        price = prices['simbolo'];
		        if (!moneyCheck(price)) return this.errorReply("No tienes suficiente dinero para comprar este articulo.");
		        processPurchase(price, parts[0]);
		        this.sendReply("Has comprado un icono personalizado, usalo mientras no te desconectes.");
		        this.sendReply("Usa /customsymbol [simbolo] para cambiar tu simbolo ahora!.");
		        user.canCustomSymbol = true;
		        break;
		    default:
		        this.errorReply("Articulo no encontrado, ¿Escribiste bien su nombre?.");
		}
	},
	buyhelp: ["/buy [articulo] - Compra un articulo de la tienda"],

	pds: 'pd',
	pd: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) target = user.name;
		let amount = Utils.Money.readMoney(target);
		return this.sendReply('|raw|' + 'Ahorros de ' + Utils.Colors.apply(target, 'bold') + ': ' + amount + moneyName(amount));
	},
	pdhelp: ["/pd [usuario] - Muestra la cantidad de pds de un usuario"],

	changepdsto: function (target, room, user) {
		if (!user.can('pban')) return this.errorReply("No tienes permiso de usar este comando.");
		let parts = target.split(',');
		if (!parts[1]) return this.parse("/help changepdsto");
		for (let u in parts) parts[u] = parts[u].trim();
		let targetUser = parts[0];
		if (targetUser.length < 1 || toId(targetUser).length > 18) return this.errorReply("Nombre de usuario my largo.");
		let amount = Math.round(Number(toId(parts[1])));
		let totalMoney = amount + moneyName(amount);

		// Antes de transferir
		if (isNaN(amount)) return this.errorReply("La candidad debe ser un numero.");
		if (amount < 1) return this.errorReply("La cantidad no debe ser menor a 1.");

		if (parts[1].startsWith("-")) {
			Utils.Money.updateMoney(toId(targetUser), -amount);

			Utils.Money.logTransaction(user.name + " ha eliminado " + totalMoney + " de los ahorros de " + targetUser + ".");
		    return this.sendReply("Has elminado " + totalMoney + " de los ahorros de " + targetUser + ".");
		}

		Utils.Money.updateMoney(toId(targetUser), amount);

		Utils.Money.logTransaction(user.name + " ha agregado " + totalMoney + " a los ahorros de " + targetUser + ".");
		this.sendReply("Has agregado " + totalMoney + " a los ahorros de " + targetUser + ".");
		if (Users(targetUser)) Users(targetUser).popup("|modal|" + user.name + " te ha dado " + totalMoney + ".");
	},
	changepdstohelp: ["/changepdsto [usuario], [pds] - Da/Quita pds a un usuario (usa -pds para quitar)"],

	donar: function (target, room, user) {
		let parts = target.split(',');
		if (!parts[1]) return this.parse("/help donar");
		for (let u in parts) parts[u] = parts[u].trim();
		let targetUser = parts[0];
		if (targetUser.length < 1 || toId(targetUser).length > 18) return this.errorReply("Nombre de usuario my largo.");

		let amount = Math.round(Number(parts[1]));

		// Antes de transferir
		if (isNaN(amount)) return this.errorReply("La candidad debe ser un numero.");
		if (amount < 1) return this.errorReply("La cantidad no debe ser menor a 1.");
		if (toId(targetUser) === user.userid) return this.errorReply("No puedes transferirte PDs a ti mismo.");
		if (Utils.Money.readMoney(user.userid) < amount) return this.errorReply("No tienes suficientes PDs.");

		Utils.Money.updateMoney(user.userid, Number(-amount));
		Utils.Money.updateMoney(targetUser, Number(amount));

		let totalMoney = amount + moneyName(amount);
		Utils.Money.logTransaction(user.name + " ha transferido " + totalMoney + " a " + targetUser);

		this.sendReply("Has transferido " + totalMoney + " a " + targetUser + ".");

		let targetUserConnected = Users(parts[0]);
		if (targetUserConnected) {
			targetUserConnected.popup("|modal|" + user.name + " te ha donado " + totalMoney + ".");
		}
	},
	donarhelp: ["/donar [usuario], [cantidad] - Donale x cantidad de pds a un usuario"],

	customsymbol: function (target, room, user) {
		if (!user.canCustomSymbol) return this.errorReply("Primero debes comprar este articulo en la tienda.");
		if (user.hasCustomSymbol) return this.errorReply("Ya tienes un simbolo personalizado, usa: /resetsymbol para quitarlo (sin retorno).");
		if (!this.canTalk()) return;
		if (!target || target.length > 1) return this.parse("/help customsymbol");
		if (~target.indexOf('\u202e')) return this.errorReply("nono riperino");
		let bannedSymbols = /[ +<>$%‽!★@&~#*卐|A-z0-9]/;
		if (target.match(bannedSymbols)) return this.errorReply("That symbol is banned.");

		user.getIdentity = function (roomid) {
			if (this.locked) return '‽' + this.name;
			if (roomid) {
				let room = Rooms(roomid);
				if (room.isMuted(this)) return '!' + this.name;
				if (room && room.auth) {
					if (room.auth[this.userid]) return room.auth[this.userid] + this.name;
					if (room.isPrivate === true) return ' ' + this.name;
				}
			}
			return target + this.name;
		};
		user.updateIdentity();
		user.canCustomSymbol = false;
		user.hasCustomSymbol = true;
		return this.sendReply("Se ha cambiado tu simbolo!.");
	},
	customsymbolhelp: ["/customsymbol [simbolo] - Cambia tu simbolo por uno personalizado"],

	resetsymbol: function (target, room, user) {
		if (!user.hasCustomSymbol) return this.errorReply("You don't have a custom symbol!");
		user.hasCustomSymbol = false;
		delete user.getIdentity;
		user.updateIdentity();
		this.sendReply('Your symbol has been reset.');
	},

	moneylog: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		if (!target) return this.parse("/help moneylog");
		let word = false;
		if (isNaN(Number(target))) word = true;
		let lines = fs.readFileSync(LOGS_DIR + 'transactions.log', 'utf8').split('\n').reverse();
		let output = '';
		let count = 0;
		let regex = new RegExp(target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "gi");

		if (word) {
			output += 'Ultimas 50 acciones que contienen "' + target + '":\n';
			for (let line in lines) {
				if (count >= 50) break;
				if (!~lines[line].search(regex)) continue;
				output += lines[line] + '\n';
				count++;
			}
		} else {
			if (target > 100) target = 100;
			output = lines.slice(0, (lines.length > target ? target : lines.length));
			output.unshift("Ultimas " + (lines.length > target ? target : lines.length) + " lineas de acciones:");
			output = output.join('\n');
		}
		user.popup(output);
	},
	moneyloghelp: ["/moneylog [numero] para ver las x ultimas lineas o /moneylog [palabra] para buscar por una palabra"],

	economy: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let econ = Utils.Money.moneyCirculating();
		return this.sendReplyBox("<b>PDs circulando en el servidor:</b> " + econ[0] + "<br /><b>El usuario prmedio tiene:</b> " + econ[1] + "PDs.<br />Uno de cada " + econ[2] + " usuarios tiene almenos 1 PD.");
	},
};
