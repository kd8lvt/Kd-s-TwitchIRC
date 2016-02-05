///////CONFIG///////
username = "your twitch username in all lowercase"
oauth = "your oauth token (see github readme for more info)"
///////CONFIG///////
process.stdout.write('\033c')
var irc = require('tmi.js')
//var sound = require('play-sound')(opts = {})
var prompt = require("prompt")
prompt.message = "".green
prompt.delimiter = "".green
EventEmitter = require('events')
ee = new EventEmitter();
var split = require('strsplit')
//process.stdin.resume()
//process.stdin.setEncoding('utf8')
var util = require('util')
if (process.argv[2] != null){
	var channel = process.argv[2].toString()
} else {
	ee.emit('error', new Error("Usage: 'node twitchirc <streamer's username>'"))
}
console.log("Pre-Init: Initializing config options!")
var clientOptions = {
	options:{
		debug: true,
		debugIgnore: ['ping','chat','action']
	},
	identity: {
		username: username,
		password: oauth
	},
	channels: [channel]
}
console.log("Phase - Init: Initializing Client!")
var client = new irc.client(clientOptions);
console.log("Phase - Post Init: Connecting to Twitch!")
client.connect();
console.log("Phase - Post Connect: Adding Listeners and Commands!")
client.addListener('chat', function (channel,user,message) {
	client.on("chat", function (channel, user, message, self) {
		if (user["user-type"] === "mod" || user.username === channel.replace("#", "")) {
			if (user.username === channel.replace("#","")) {
				//Broadcaster!
			} else {
				//Moderator!
			}
		}
	})
	//////Currently Broken///////
	//words = message.split(" ")
	//var messagelength = words.length
	//for (var i = 0; i < messagelength; i++) {
		//words[i] = words[i].replace("!","")
		//words[i] = words[i].replace(",","")
		//words[i] = words[i].replace("?","")
		//words[i] = words[i].replace("*","")
		//if (words[i] === "Kd") {
		//	sound.play("C:\windows\media\Windows Notify System Generic.wav")
		//} else if (words[i] === "kd") {
		//	sound.play("C:\windows\media\Windows Notify System Generic.wav")
		//} else if (words[i] === "KD") {
		//	sound.play("C:\windows\media\Windows Notify System Generic.wav")
		//} else if (words[i] === "kD") {
		//	sound.play("C:\windows\media\Windows Notify System Generic.wav")
		//}
	//}
})
prompt.start()
function input() {
	prompt.get({
		properties: {
			message: {
				description: ">".green
			}
		}
	}, function(err,results) {
		if (err) {
			console.log(err)
		} else if (results.message === "/quit") {
			console.log("Exiting!")
			exit()
		} else if (results.message.split(" ")[0] === "/hug"){
			if (results.message.split(" ")[1] != null) {
			 client.say(channel,"/me hugs "+results.message.split(" ")[1]+" because "+results.message.split(" ")[1]+" is awesome!")
			 input()	
			} else {
				client.say(channel,"/me hugs everyone because everyone here is awesome!")
				input()
			}
		} else if (results.message === "/help"){
			console.log("Commands: ")
			console.log("1. /help       | Shows this message!")
			console.log("2. /hug        | Can hug everyone (/hug) or a specified thing, ex. '/hug kd8lvt' will hug kd8lvt.")
			console.log("3. /helptwitch | shows twitch's /help.")
			console.log("4. /quit       | Stops the program.")
			console.log("5. /cls        | Clears YOUR chat window. ONLY YOURS!")
			console.log("6. /lurkon     | Says: 'Lurk Mode: [On] Off' ")
			console.log("7. /lurkoff    | Says: 'Lurk Mode: On [Off]' ")
			//console.log("6. /switch     | Switches the channel. [[[BETA]]]") Doesn't work yet. Do not uncomment and use D:
			input()
		} else if (results.message === "/helptwitch") {
			client.say(channel,"/help")
			input()
		} else if (results.message === "/cls") {
			process.stdout.write('\033c')
			console.log("Cleared your chat!")
			input()
		//} else if (results.message.split(" ")[0] === "/switch") {
			//process.stdout.write("\033c")
			//channel = results.message.split(" ")[1]
			//input()
		} else if (results.message.split(" ")[0] === "/bh") {
			client.say(channel,"!bankheist "+results.message.split(" ")[1])
			input()
		} else if (results.message.split(" ")[0] === "/ja") {
			client.say(channel,"!joinarena "+results.message.split(" ")[1])
			input()
		} else if (results.message.split(" ")[0] === "/sa") {
			client.say(channel, "!startarena "+results.message.split(" ")[1]+" "+results.message.split(" ")[2])
			input()
		} else if (results.message.split(" ")[0] === "/host") {
			channel = clientOptions.identity.username
			client.say(channel,"/host "+results.message.split(" ")[1])
			channel = process.argv[2].toString()
			input()
		}else if (results.message === "/lurkon") {
			client.say(channel,"Lurk Mode: [On] Off")
			input()
		} else if (results.message === "/lurkoff "){
			client.say(channel,"Lurk Mode: On [Off]")
			input()
		} else {
			client.say(channel,results.message)
			input()
		}
	})
}
client.on("disconnected", function (reason) {
	console.log("[WARN] Disconnected from Twitch Server! Reason: "+reason)
	console.log("Reconnecting...")
	client.connect()
})
client.on("clearchat", function (channel) {
	console.log("Chat was cleared in "+channel+" but TwitchIRC saved it!")
})
client.on("join", function (channel, username) {
	if (username === clientOptions.identity.username) {
		console.log("[Info] ["+channel+"]: You joined the channel!")
	} else {
		console.log("[Info] ["+channel+"]: "+username+" joined!")
	}
})
client.on("subanniversary", function (channel, username, months) {
	//Not yet tested! I'll need to hang out in CaptainSparklez's chat or something for a while... *shudder*
	if (months === 12) {
		client.log(username+" has been subscibed to "+channel+" for a WHOLE YEAR! Wow!")
	} else if (months === 24) {
		client.log(username+" has been subscibed to "+channel+" for TWO YEARS! Holy COW!")
	} else if (months > 24) {
		client.log(username+" has been subscibed to "+channel+" for more than TWO YEARS, for a total of "+months+" months! Thats INSANE!")
	} else if (months < 24 && months > 12 ) {
		client.log(username+" has been subscibed to "+channel+" for one year and "+months-12+" months!")
	} else if (months > 24 && months < 36) {
		client.log(username+" has been subscibed to "+channel+" for two years and "+months-24+" months!")
	} else if (months < 12) {
		client.log(username+" has been subscribed to "+channel+" for "+months+ " months!")
	} else { //If its somehow not ANY of the above - just divide by 12 and hope its not an infinite decimal.
		client.log(username+" has been subscibed to "+channel+" for "+months+" months! Thats "+months/12+" years!")
	}
})
console.log("Done loading - have fun!")
input()
