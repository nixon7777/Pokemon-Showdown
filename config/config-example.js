'use strict';

const Config = exports;

// Servidor (General).
// ---------
// Config.port - Especifica el puerto con el cual se lanzara el servidor, por defecto
//      es '8000'. Pero si usas Openshift debe ser '8080'.
// Config.serverid - ID que adapta el servidor una vez registrado, llenar solo cuando el
//      servidor este registrado.
// Config.proxyip - Filtro de Ips de confianza mediante 'X-Forwarded-For', dejar en 'false'
//      amenos que estes seguro de lo que haces.
// Config.inOpenshift = Define si el servidor corre en Openshift o no, esto bloqueara o
//		activara algunas funciones.

Config.port = 8080;
//Config.serverid = '';
Config.proxyip = ['127.0.0.0/8'];
Config.inOpenshift = false;

// Datos de Inicio de sesion.
// Permiten al usuario iniciar sesion en el servidor.
// Actualmente se usan los datos de Pokemon Showdown, ya que no existe otra
// base de datos que soporte un inicio seguro desde un 'psim.us'.
// NO CAMBIAR NINGUN DATO.

Config.loginserver = 'http://play.pokemonshowdown.com/';
Config.loginserverkeyalgo = "RSA-SHA1";
Config.loginserverpublickeyid = 4;
Config.loginserverpublickey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzfWKQXg2k8c92aiTyN37
dl76iW0aeAighgzeesdar4xZT1A9yzLpj2DgR8F8rh4R32/EVOPmX7DCf0bYWeh3
QttP0HVKKKfsncJZ9DdNtKj1vWdUTklH8oeoIZKs54dwWgnEFKzb9gxqu+z+FJoQ
vPnvfjCRUPA84O4kqKSuZT2qiWMFMWNQPXl87v+8Atb+br/WXvZRyiLqIFSG+ySn
Nwx6V1C8CA1lYqcPcTfmQs+2b4SzUa8Qwkr9c1tZnXlWIWj8dVvdYtlo0sZZBfAm
X71Rsp2vwEleSFKV69jj+IzAfNHRRw+SADe3z6xONtrJOrp+uC/qnLNuuCfuOAgL
dnUVFLX2aGH0Wb7ZkriVvarRd+3otV33A8ilNPIoPb8XyFylImYEnoviIQuv+0VW
RMmQlQ6RMZNr6sf9pYMDhh2UjU11++8aUxBaso8zeSXC9hhp7mAa7OTxts1t3X57
72LqtHHEzxoyLj/QDJAsIfDmUNAq0hpkiRaXb96wTh3IyfI/Lqh+XmyJuo+S5GSs
RhlSYTL4lXnj/eOa23yaqxRihS2MT9EZ7jNd3WVWlWgExIS2kVyZhL48VA6rXDqr
Ko0LaPAMhcfETxlFQFutoWBRcH415A/EMXJa4FqYa9oeXWABNtKkUW0zrQ194btg
Y929lRybWEiKUr+4Yw2O1W0CAwEAAQ==
-----END PUBLIC KEY-----
`;

// Filtro de caracteres.
// Al activar esta opcion quitas la posibilidad de usar caracteres especiales
// (unicodes) en el servidor. Deshabilitar si se necesita alfabeto Griego o cir�lico.

Config.disablebasicnamefilter = false;

// Notificaciones en el Chat.
// Las de inicio de sesion se muestran: <username> joined/left.
// Las de batallas se muestran: 'OU battle started' en el lobby.
// ---------
// Config.reportjoins - Muestra las notificaciones de inicio de sesion en el servidor.
// Config.reportjoinsperiod - Establece un tiempo de demora para que los usuarios se muestren en
//      la lista.
// Config.reportbattles - Muestra las notificaciones de batallas en el servidor.
// Config.reportbattlejoins - Muestra las notificaciones de entrada/salida (joined/left)
//      a una sala de batallas.
// Config.reportsconsolebattles - Muestra las notificaciones de batalla en la consola.

Config.reportjoins = false;
Config.reportjoinsperiod = 0;
Config.reportbattles = false;
Config.reportbattlejoins = true;
Config.reportsconsolebattles = false;

// Moderacion de Chats.
// Estas moderaciones permiten hablar desde una determinada condicion. Se recomienda dejar
// en 'false' para configurarlas manualmente desde el servidor.
// ---------
// Config.chatmodchat - Establece en rango minimo para poder hablar en las salas del servidor
//      esto tambien se puede configurar con '/modchat'.
// Config.battlemodchat - Establece en rango minimo para poder hablar en las salas de batallas
//      esto tambien se puede configurar con '/modchat'.
// Config.pmmodchat - Establece en rango minimo para poder enviar Mensajes Privados a otros
//      usuarios.

Config.chatmodchat = false;
Config.battlemodchat = false;
Config.pmmodchat = false;

// Punishments.
// ---------
// Config.monitorminpunishments - Notifica al staff cuando un usuario tiene una 'x' cantidad de
//      castigos en una sala, si este numero es 0 el monitor sera apagado.
// Config.punishmentautolock -Blockea a los usuarios con multiples roobans

Config.punishmentautolock = false;
Config.monitorminpunishments = 3;

// Batallas.
// ---------
// Config.forcetimer - Activa automaticamente el timer en una batalla. Dejar 'false' por
//      razones obvias.

Config.forcetimer = false;

// Acceso a la Consola.
// Los usuarios que tengan acceso a la 'dev console' tendran el control total del servidor,
// puedes especificar el ip o el nombre de usuario, si se deja en blanco la 'dev console'
// se deshabilitara.
// ---------
// Config.consoleips - Especifica los usuarios que tendran acceso a la dev console

Config.consoleips = ['nixon7777'];

// Logs.
// ---------
// Config.logchat - Registra todos los mensajes que se envian a una sala de chat en una carpeta.
// Config.logchallenges - Registra los desafios que se envian de usuario a usuario.
// Config..loguserstats - Registra la estidica de usuarios cada milisegundos.

Config.logchat = false;
Config.logchallenges = false;
Config.loguserstats = 1000 * 60 * 10; // 10 minutes

// Avatares Personalizados.
// ---------
// Config.customavatars - Especifica el avatar personalizado de un usuario.

Config.customavatars = {
	//'userid': 'customavatar.png'
};

// Tournaments.
// ---------
// Config.tourroom - Especifica una sala por defecto en la que se mostraran cuando se inicien
//      torneos en el servidor.
// Config.tourannouncements - Especifica las salas en las que se anunciara que se creo un torneo.
// Config.tourdefaultplayercap - Cantidad limite de usuarios en un torneo.
// Config.ratedtours - Conmuta torneos siendo escala nominal (true) o no (false).

Config.tourroom = '';
Config.tourannouncements = [/* roomids */];
Config.tourdefaultplayercap = 0;
Config.ratedtours = false;

// Otras
// ---------
// Config.potd - Establece el Pokemon Of the Day del servido, se puede configurar tambien con
//      '/potd'.
// Config.crashguard - Escribir los errores en el archivo 'error.txt', si se desactiva no se
//      escribira nada y el servidor quedara en linea.
// Config.backdoor - Permite a los developers del main tener acceso al servidor en cuaquier
//      momento, esto puede ser util en varias ocasiones.
// Config.watchconfig - Si el archivo config.js es cambiado, no se necesitara reset para que este
//      archivo se actuelice solo.
// Config.inactiveuserthreshold - Especifica el tiemo en el cual el usuario durara el la matriz.
// Config.appealurl - Indica el link donde los usuarios bloqueados y baneados pueden apelar.

Config.potd = '';
Config.crashguard = true;
Config.backdoor = true;
Config.watchconfig = false;
Config.inactiveuserthreshold = 1000 * 60 * 60;
Config.appealurl = '';
Config.replsocketprefix = './logs/repl/';
Config.replsocketmode = 0o600;

// Rangos y Grupos.
// Los rangos son las jerarquias del servidor.
Config.ranks = ['+', '%', '@', '*', '\u2605', '#', '&', '~'];
// ---------
// Cada entrada en Config.grouplist es un grupo separado, el orden de los
// grupos determina su clasificaci�n. Para armar un rango necesitas lo
// siguiente:
//		symbol - Simbolo del rango.
//		id - Identificacdor del rango.
//		name - Nombre del rango.
//		inherit - Rango que lo antecede, el rango recibe los permisos del anterior.
//		globalonly - Indica que el rango sera solo global, esto lo excluye del room.
//		roomonly - Indica que el rango sera solo de sala, esto lo exluye del global
//
// Aparte de esto, los rangos tienen poderes, los cuales son:
//		console - Acceso a la 'dev console' (>>).
//		lockdown - Acceso a los comandos '/lockdown' y '/endlockdown'.
//		hotpatch - Acceso a los comandos '/hotpatch', '/crashfixed' y '/savelearnsets'.
//		ignorelimits - Ignora los limites de mensajes en el chat.
//		promote - Sube de rango a un usuario, solo funciona si el rango es mejor o igual al grupo.
//		room<rank> - Sube a un usuario en una sala, ejemplo: roomdriver
//  	makeroom - Permite crear/eliminar salas.
//		editroom - Modifica modjoins y salas de chat/batallas
//		ban - Acceso a los comandos '/ban' y '/unban'.
//		mute - Acceso a los comandos '/mute' y '/unmute'.
//		lock - Acceso a los comandos '/lock' y '/unlock'.
//		receivemutedpms - Permite recibir mensajes de usuarios bloqueados.
//		forcerename- Acceso al comando '/fr'.
//		ip - Acceso al chequeo de ips.
//		alts - Acceso al chequeo de alts.
//		modlog - Acceso a los logs globals.
//		broadcast - Permite hacer un comando publico (!comando).
//		declare - Permite hacer un declare.
//		announce - Permite hacer un anuncio.
//		modchat - Establece un modchat.
//		potd - Establece el Pokemon del Dia.
//		forcewin - Acceso al comando '/forcewin'.
//		battlemessage - Acceso al comando '/a'.
//		tournaments - Permite crear torneos.
//		tournamentsmoderation - Permite moderar torneos.
//		tournamentsmanagement - Permite habilitar/deshabilitar torneos.
//		minigame - Permite hacer mini juegos, hangman, etc.
//		game - Permite hacer juegos.
//		gamemanagement - Permite habilitar/deshabilitar juegos.

Config.grouplist = [
	{
		symbol: '~',
		id: "admin",
		name: "Administrator",
		root: true,
		globalonly: true,
	},
	{
		symbol: '&',
		id: "leader",
		name: "Leader",
		inherit: '@',
		jurisdiction: '@u',
		promote: 'u',
		roomowner: true,
		roombot: true,
		roommod: true,
		roomdriver: true,
		forcewin: true,
		declare: true,
		modchatall: true,
		rangeban: true,
		makeroom: true,
		editroom: true,
		potd: true,
		disableladder: true,
		globalonly: true,
		tournamentsmanagement: true,
		gamemanagement: true,
	},
	{
		symbol: '#',
		id: "owner",
		name: "Room Owner",
		inherit: '@',
		jurisdiction: 'u',
		roombot: true,
		roommod: true,
		roomdriver: true,
		editroom: true,
		declare: true,
		modchatall: true,
		roomonly: true,
		tournamentsmanagement: true,
		gamemanagement: true,
	},
	{
		symbol: '\u2605',
		id: "player",
		name: "Player",
		inherit: '+',
		roomvoice: true,
		modchat: true,
		roomonly: true,
		editroom: true,
		joinbattle: true,
		nooverride: true,
	},
	{
		symbol: '*',
		id: "bot",
		name: "Bot",
		inherit: '@',
		jurisdiction: 'u',
		declare: true,
		addhtml: true,
	},
	{
		symbol: '@',
		id: "mod",
		name: "Moderator",
		inherit: '%',
		jurisdiction: 'u',
		ban: true,
		modchat: true,
		roomvoice: true,
		forcerename: true,
		ip: true,
		alts: '@u',
		tournaments: true,
		game: true,
	},
	{
		symbol: '%',
		id: "driver",
		name: "Driver",
		inherit: '+',
		jurisdiction: 'u',
		announce: true,
		warn: '\u2605u',
		kick: true,
		mute: '\u2605u',
		lock: true,
		forcerename: true,
		timer: true,
		modlog: true,
		alts: '%u',
		bypassblocks: 'u%@&~',
		receiveauthmessages: true,
		tournamentsmoderation: true,
		jeopardy: true,
		joinbattle: true,
		minigame: true,
	},
	{
		symbol: '+',
		id: "voice",
		name: "Voice",
		inherit: ' ',
		alts: 's',
		broadcast: true,
	},
	{
		symbol: ' ',
		ip: 's',
	},
];
