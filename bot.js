const colors = require("colors");
const { debug } = require("console");
const mineflayer = require("mineflayer");
const { mineflayer: mineflayerViewer } = require("prismarine-viewer");
const { debugPort } = require("process");
const readline = require("readline");
const fs = require("fs")
const math = require("math")
let isinparty = false
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const { promisify } = require("util");
const si = require('systeminformation');
const { channel } = require("diagnostics_channel");

const botinnit = () => {

  si.cpu()
    .then(data => cpu = data)
    .catch(error => console.error(error));

  si.mem()
    .then(data => mem = data)
    .catch(error => console.error(error));

  si.graphics()
    .then(data => graphics = data)
    .catch(error => console.error(error));


  let channelrn = "idk"

  const bios = si.bios()

  const bot = mineflayer.createBot({
    host: "mc.hypixel.net",
    username: "Dustin",
    version: "1.8.9",
    auth: "microsoft"
  })

  function colorText(text, color) {
    var colorConversions = {
      "dark_red": text.red.dim,
      "&4": text.red.dim,
      "red": text.red,
      "§c": text.red,
      "gold": text.yellow.dim,
      "§6": text.yellow.dim,
      "dark_green": text.green.dim,
      "§2": text.green.dim,
      "green": text.green,
      "§a": text.green,
      "aqua": text.cyan,
      "§b": text.cyan,
      "dark_aqua": text.cyan.dim,
      "&3": text.cyan.dim,
      "dark_blue": text.blue.dim,
      "§1": text.blue.dim,
      "blue": text.blue,
      "§9": text.blue,
      "light_purple": text.magenta,
      "§d": text.magenta,
      "dark_purple": text.magenta.dim,
      "§5": text.magenta.dim,
      "white": text.white,
      "§f": text.white,
      "gray": text.gray,
      "§7": text.gray,
      "dark_gray": text.gray.dim,
      "§8": text.gray.dim,
      "black": text.black.bgWhite,
      "§0": text.black.bgWhite
    }

    if (colorConversions[color]) {
      process.stdout.write(colorConversions[color]);
    }
    else {
      process.stdout.write(text.white)
    }
  }

  function parseMessage(jsonMsg) {
    let messageText = ""
    let messageColor = "White"
    let messageClickEvents = []
    let messageHoverEvents = []


    if (jsonMsg["text"].includes("uptime")) {
      let awnser = "Im online since " + si.time()["uptime"] + "ms (=" + math.round(si.time()["uptime"] / 1000) + "s = " + math.round(si.time()["uptime"] / 1000 / 60) + "mins = " + math.round(si.time()["uptime"] / 1000 / 60 / 60) + "hrs)"
      bot.chat(awnser)
    }

    if (jsonMsg["text"].includes("bios version")) {
      bot.chat("my Bios version is " + bios["version"])
    }

    if (jsonMsg["text"].includes("cpu manufacturer")) {
      bot.chat("my CPU was manufactured by " + cpu["manufacturer"])
    }

    if (jsonMsg["text"].includes("cpu brand")) {
      bot.chat("my CPU brand is " + cpu["brand"])
    }

    if (jsonMsg["text"].includes("cpu speed")) {
      bot.chat("my CPU speed is " + cpu["speed"] + "GHz")
    }

    if (jsonMsg["text"].includes("cpu speedMin")) {
      bot.chat("my CPU speedMin is " + cpu["speedMin"] + "GHz")
    }

    if (jsonMsg["text"].includes("cpu speedMax")) {
      bot.chat("my CPU speedMax is " + cpu["speedMax"] + "GHz")
    }

    if (jsonMsg["text"].includes("cpu cores")) {
      bot.chat("I have " + cpu["cores"] + " CPU cores")
    }

    if (jsonMsg["text"].includes("cpu physicalCores")) {
      bot.chat("my CPU physicalCores is " + cpu["physicalCores"])
    }

    if (jsonMsg["text"].includes("cpu socket")) {
      bot.chat("my CPU socket is " + cpu["socket"])
    }


    if (jsonMsg["text"].includes("cpu model")) {
      bot.chat("my CPU model is " + cpu["model"])
    }

    if (jsonMsg["text"] == ("ram")) {
      bot.chat("I have " + math.round(mem["total"] / 1024 / 1024) + "MB of Ram")
    }

    if (jsonMsg["text"] == ("free ram")) {
      bot.chat("I have " + math.round(mem["free"] / 1024 / 1024) + " MB RAM Free.")
    }

    if (jsonMsg["text"] == ("used ram")) {
      bot.chat("I'm using " + math.round(mem["used"] / 1024 / 1024) + " MB of RAM.")
    }

    if (jsonMsg["text"] == ("vram")) {
      bot.chat("I have " + math.round(graphics["vram"] / 1024 / 1024) + " MB of vram.")
    }

    if (jsonMsg["text"] == ("internet")) {
      bot.chat("I have " + math.round(si.networkInterfaces()["speed"] / 1024 / 1024) + " MB internet speed.")
    }


    if (jsonMsg["text"].includes("calc")) {
      try {
        calculation = jsonMsg["text"].replace("calc ", "")
        function evil(fn) {
          return new Function('return ' + fn)();
        }
        bot.chat("ITS " + evil(calculation))
      }
      catch {
        bot.chat("das kann ich nicht :c")
      }
    }

    if (jsonMsg["text"].split(" ")[0] == ("mem")) {
      txt = jsonMsg["text"].replace("mem", "").split(" ")
      console.log(txt)
      if (txt[1] == "rem") {
        remtxt = ""
        tmptxt = [...txt]
        tmptxt.shift()
        tmptxt.shift()
        tmptxt.shift()
        tmptxt.forEach(element => {
          remtxt = remtxt + " " + element
        });

        mems = JSON.parse(fs.readFileSync("data_dustin.json").toString())
        console.log(mems)
        mems["memorie"][txt[2]] = remtxt
        fs.writeFileSync("data_dustin.json", JSON.stringify(mems, null, 2))
        bot.chat("Ich merks mir!")
      }
      else {
        bot.chat("" + JSON.parse(fs.readFileSync("data_dustin.json").toString())["memorie"][txt[2]])
      }
    }

    if (jsonMsg["text"].includes("entered")) {
      bot.chat("/pc have a good run!")
      setTimeout(async () => {
        bot.chat("/p leave")
      }, 300)
    }

    if (jsonMsg["text"].includes("fragbots")) {
      bot.chat("I heared about Fragbots??? ITS A GOD SERVA! JOIN")
    }

    if (jsonMsg["text"].includes("what time is it?")) {
      const d = new Date();
      let timestr = "it is " + d.getHours() + ":" + d.getMinutes() + " in Germany."
      bot.chat(timestr)
    }

    if (jsonMsg["text"].includes("is paul bald?")) {
      bot.chat("Hes even more bald than CoolNamePending1")
    }

    if (jsonMsg["text"].includes("are you dumb?")) {
      bot.chat("Kinda ig :(")
    }

    if (jsonMsg["text"].includes("we want to be friends?")) {
      bot.chat("Oke")
    }

    if (jsonMsg["text"].includes("coinflip")) {
      bot.chat(Math.random() >= 0.5 ? "heads" : "tails")
    }

    if (jsonMsg["text"]) {
      messageText = jsonMsg["text"]
    }

    if (jsonMsg["color"]) {
      messageColor = jsonMsg["color"]
    }

    try {
      let botLocationData = JSON.parse(jsonMsg)

      if (botLocationData["server"]) {
        botServer = botLocationData["server"]
      }

      if (botLocationData["gametype"]) {
        botGamemode = botLocationData["gametype"]
      }

      if (botLocationData["map"]) {
        botMap = botLocationData["mode"]
      }

      if (jsonMsg["clickEvent"]["value"].includes("/party accept")) {
        setTimeout(async () => {
          bot.chat(jsonMsg["clickEvent"]["value"])
        }, 300)
        setTimeout(async () => {
          bot.chat("/pc Hi! You can use me as a Fragbot if you want <3")
        }, 300)

      }


      if (botServer == "limbo") {
        setTimeout(async () => {
          bot.chat("/lobby ${defaultLobby}")
        }, 300)
      }

      if (botLocationData["gametype"] != "SKYBLOCK") {
        sleep(500)
        setTimeout(async () => {
          bot.chat("/skyblock")
        })
      }
      if (botLocationData["gametype"] = "SKYBLOCK" && botLocationData["mode"] != "dynamic") {
        setTimeout(async () => {
          bot.chat("/is")
        }, 300)
      }

      console.log(botServer)
      console.log(botLocationData)
      messageText = ""

    }
    catch { }

    if (jsonMsg["clickEvent"]) {
      if (jsonMsg["clickEvent"]["action"] === "run_command") {
        messageClickEvents.push(jsonMsg["clickEvent"]["value"])
      }

      else if (jsonMsg["clickEvent"]["action"] == "suggest_command") {
        if (!["][MVP", "+"].some(x => x === jsonMsg["text"])) {
          messageClickEvents.push(jsonMsg["clickEvent"]["value"])
        }
      }
      else {
        console.log("|NEW CLICK EVENT: ${jsonMsg['clickEvent']['action']|".red.dim)
      }
    }

    if (jsonMsg["hoverEvent"]) {

      if (jsonMsg["hoverEvent"]["action"] == "show_text") {
        messageHoverEvents.push(jsonMsg["hoverEvent"]["value"]["text"].replace(/§[a-z0-9]/g, ""))

        if (jsonMsg["hoverEvent"]["value"]["color"] && messageColor == "white") {
          messageColor = jsonMsg["hoverEvent"]["value"]["color"]
        }
      }

      else {
        console.log("| NEW HOVER EVENT: ${jsonMsg['hoverEvent']['actuin']}".red.dim)
      }
    }

    if (["", " "].includes(messageText) == false) {
      const results = messageText.match(/§[a-z0-9]/g);

      if (results) {
        let subText = messageText.split("§")

        subText.forEach((subMsg) => {

          if (subMsg.length) {
            colorText(subMsg.slice(1), "§".concat(subMsg[0]))
          }
        })
      }
      else {
        colorText(messageText, messageColor)
      }
    }

    if (jsonMsg["extra"]) {
      jsonMsg["extra"].forEach((subMsg) => {
        let tempMsg = parseMessage(subMsg, true)
        messageClickEvents = messageClickEvents.concat(tempMsg[0])
        messageHoverEvents = messageHoverEvents.concat(tempMsg[1])
      })
    }
    return [messageClickEvents, messageHoverEvents]
  }

  bot.on("end", () => {

    console.log("Ich bin weg D: Hoffentlich kann ich reconnecten")
    setTimeout(async () => {
      botinnit()
    }, 1000)
  })


  bot.on("login", () => {
    console.log("spawned in")

    setTimeout(async () => {
      bot.chat("/skyblock")
    }, 300);

    setTimeout(async () => {
      if (botServer == "limbo") {
        bot.chat("'/lobby ${defaultLobby}")
      }
    }, 500)


    if (botGamemode != "SKYBLOCK") {
      setTimeout(async () => {

        bot.chat("/skyblock")
      }, 500)
    }
    if (botGamemode = "SKYBLOCK" && botMap != "dynamic") {
      setTimeout(async () => {
        bot.chat("/is")
      }, 500)
    }
  })
  bot.on("message", (jsonMsg) => {
    if (jsonMsg.toString().includes("[") && !jsonMsg.toString().includes("Timirettich:")) {
      if (jsonMsg.toString().includes("Party > ")) {
        if (channelrn != "p") {
          setTimeout(async () => {
            bot.chat("/chat party")
          }, 700)
          setTimeout(async () => {
            channelrn = "p"
          }, 700)

        }
      } else if (jsonMsg.toString().includes("Co-op > ")) {
        if (channelrn != "cc") {
          setTimeout(async () => {
            bot.chat("/chat coop")
          }, 700)
          setTimeout(async () => {
            channelrn = "cc"
          }, 700)
        }
      } else if (jsonMsg.toString().includes("Guild > ")) {
        if (channelrn != "g") {
          setTimeout(async () => {
            bot.chat("/chat guild")
          }, 700)
          setTimeout(async () => {
            channelrn = "g"
          }, 700)
        }
      } else {
        if (channelrn != "ac") {
          setTimeout(async () => {
            bot.chat("/chat all")
          }, 700)
          setTimeout(async () => {
            channelrn = "ac"
          }, 700)
        }
      }

    }

    let [messageClickEvents, messageHoverEvents] = parseMessage(jsonMsg)

    if (messageClickEvents.length) {
      console.log(messageClickEvents)
    }
    else {
      console.log()
    }
  })

  function listenToUserInput() {
    return rl.question("", (response) => {
      bot.chat(response)

      listenToUserInput()
    })
  }



  listenToUserInput()

  const defaultLobby = "clasic"

  let botServer = ""
  let botGamemode = ""
  let botMap = ""

}
setTimeout(async () => {
  process.exit(187)
}, 60000 * 60)
botinnit()