const express = require("express");
const app = express();
//by : ! Pirt YT#1739
app.listen(() => console.log("Server started"));
//by : ! Pirt YT#1739
app.get("/", (req, res) => {
  res.send("By :Black Team")
})//by : ! Pirt YT#1739

app.use('/ping', (req, res) => {
  res.send(new Date());
});//by : ! Pirt YT#1739
const Discord = require("discord.js")
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const db = require("pro.db");
//by : ! Pirt YT#1739

let owner;
const updateAdmins = () => {//by : ! Pirt YT#1739
  owner = db.get("admins")
  owner.unshift('757581815421599775') //ايديك
}
updateAdmins()//by : ! Pirt YT#1739
let sv = '1202306895793360947'//ابدي سرفرك
let prefix = db.get("prefix") || "$";//بريفكس
let embColor = "black"
client.on("ready", () => {


  client.guilds.cache.forEach(g => {
    if (g.id !== sv) g.leave()
  })//by : ! Pirt YT#1739
  console.log(`Logged in as ${client.user.tag}!`);

  let textList = [`${prefix}stock` ,`${prefix}help`,"Black Host New Start 🎇"] 
client.user.setPresence({ activities: [{ name: `${prefix}help`}], status: 'online' })
//by : ! Pirt YT#1739
  setInterval(() => {
  let text = textList[Math.floor(Math.random() * textList.length)]
    client.user.setPresence({ activities: [{ name: text}], status: 'online' })
  } , 30000)//by : ! Pirt YT#1739
})
//by : ! Pirt YT#1739
client.on('guildCreate', guild => {
  if (guild.id !== sv) return guild.leave()
})
client.login(process.env.token);

client.on("message", async message => {


//by : ! Pirt YT#1739
  let prefixx = "s";
  const args = message.content
    .slice(prefixx.length)
    .trim()
    .split(/ +/);//by : ! Pirt YT#1739
  const command = args.shift().toLowerCase();
  if (message.content.startsWith(prefixx + "etprefix")) {
    if (!owner.includes(message.author.id)) return;
    if (!args[0])//by : ! Pirt YT#1739
      return message.channel.send(
        db.get("prefix") || `> **The Server Prefix is : \`${prefix}\``
      );//by : ! Pirt YT#1739
    db.set("prefix", args[0]);
    message.channel.send(//by : ! Pirt YT#1739
      `> **Done Setting the new Prefix To : \`${db.get("prefix")}\``
    );
  }
});//by : ! Pirt YT#1739

//by : ! Pirt YT#1739
//by : ! Pirt YT#1739
let cooldown = false;
client.on("message", async message => {
  try {//by : ! Pirt YT#1739
    if (db.get("blacklist").includes(message.author.id)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
//by : ! Pirt YT#1739
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix) || message.author.bot) return; //by : ! Pirt YT#1739
//by : ! Pirt YT#1739
    if (command === "status") {
      if (!owner.includes(message.author.id)) return; //by : ! Pirt YT#1739
      if (!args[0]) return message.channel.send({
        embeds: [
          new Discord.MessageEmbed() //by : ! Pirt YT#1739
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .addField(
              `> Error :`,
              `Usage : ${prefix}status \`TYPE\`\n\n \`\`\`TYPE = [ open : to open the shop \n close : to close the shop ]\`\`\``
            )//by : ! Pirt YT#1739
            .setFooter(
              `Black Host New Start `,
              `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
            )
            .setColor(embColor)//by : ! Pirt YT#1739
            .setTimestamp()
            .setTitle("Status Command")
            .setColor(embColor)]
      }
      );//by : ! Pirt YT#1739
      if (args[0] === "open") {
        message.channel.send("> ** Store opened successfully ✅**");
        db.set("status", args[0]);
      }//by : ! Pirt YT#1739
      if (args[0] === "close") {
        db.delete("status");
        message.channel.send("> ** Store closed successfully ✅**");
      }
    }
//by : ! Pirt YT#1739
//by : ! Pirt YT#1739
    if (command.startsWith("setprice-")) {
//by : ! Pirt YT#1739
      const account = command.split("-")[1]

      if (!owner.includes(message.author.id)) return message.channel.send("You don't have permission ❌");
      if (message.channel.type === "dm") return;
      let tax = Math.floor(args[0] * (20 / 19) + 1);
      if (!tax)
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed() //by : ! Pirt YT#1739
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )//by : ! Pirt YT#1739
              .addField(//by : ! Pirt YT#1739
                `> Error :`,
                `Usage : ${prefix}setprice-${account} \`PRICE\`\n\n \`\`\`PRICE = [ Enter account price ]\`\`\``
              )
              .setFooter(
                `Black Host New Start`,
                `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
              )
              .setColor(embColor)
              .setTimestamp()
              .setTitle(`Setprice ${account} Command`)]
        }
        ).setColor(embColor);//by : ! Pirt YT#1739

      let data = db.get("accounts")
      let thisAcc = data.find(el => el.name === account)

      if (!thisAcc) return message.channel.send("**There is no such account ❌**")
      data[data.indexOf(thisAcc)].price = Number(args[0])
      data[data.indexOf(thisAcc)].tax = tax

      db.set("accounts", data)//by : ! Pirt YT#1739





      return message.channel.send(`> ** The price of ${account} accounts has been successfully determined ✅**`);
    }
//by : ! Pirt YT#1739

    if (command.startsWith("add-")) {

      const account = command.split("-")[1]
//by : ! Pirt YT#1739
      if (!owner.includes(message.author.id)) return; //by : ! Pirt YT#1739
      if (!args[0])
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed() ///by : ! Pirt YT#1739
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .addField(
                `> Error :`,
                `Usage : ${prefix}add-${account} \`ACCOUNT\`\n\n \`\`\`ACCOUNT = [ EMAIL:PASSWORD ]\`\`\``
              )
              .setFooter(
                `Black Host New Start`,
                `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
              )
              .setColor(embColor)
              .setTimestamp()
              .setTitle(`Add ${account} Accounts Command`)]
        }
        );
      if (!message.content.includes(":"))
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed() //by : ! Pirt YT#1739
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .addField(
                `> Error :`,
                `Usage : ${prefix}add-${account} \`ACCOUNT\`\n\n \`\`\`ACCOUNT = [ EMAIL:PASSWORD ]\`\`\``
              )
              .setFooter(
                `Black Host New Start`,//by : ! Pirt YT#1739
                `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
              )
              .setColor(embColor)
              .setTimestamp()
              .setTitle(`Add ${account} Accounts Command`)]
        }
        );
  //by : ! Pirt YT#1739
      let Data = db.get("accounts")
      let thisAcc = Data.find(el => el.name === account)

      if (!thisAcc) {
        let m = message.content.split(" ").slice(1).join(" ").split("\n")
        Data.push({ name: account, price: 0, tax: 0, emails: m })
        db.set("accounts", Data)//by : ! Pirt YT#1739
        message.delete()
        return message.channel.send(`> ** The ${account} account has been added successfully ✅**`);
      }
      else {
        let m = message.content.split(" ").slice(1).join(" ").split("\n")

        currentData = Data[Data.indexOf(thisAcc)].emails
        Data[Data.indexOf(thisAcc)].emails = [...currentData, ...m]
        db.set("accounts", Data)//by : ! Pirt YT#1739
        message.delete()
        return message.channel.send(`> **The ${account} account has been added successfully ✅**`);
      }

    }
//by : ! Pirt YT#1739//by : ! Pirt YT#1739
    if (command.startsWith("delete-")) {
      const account = command.split("-")[1]
      if (!owner.includes(message.author.id)) return;
      let data = db.get("accounts")

      let newData = data.filter(el => el.name !== account)

      db.set("accounts", newData);
      message.channel.send(`> ** ${account} category has been deleted successfully ✅**`);
    }
//by : ! Pirt YT#1739
//by : ! Pirt YT#1739
    if (command.startsWith("give-")) {
      if (!owner.includes(message.author.id)) return message.channel.send("**only admins can use give gommand**")
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.find(u => u.id === args[0]);

      const numOfAcc = args[1] || 1
      const account = command.split("-")[1]
      const data = db.get("accounts")
      let accInDb = data.find(el => el.name === account)
      if (!accInDb) { return message.channel.send("**This item does not exist ❌**") }
      if (!user)
        return message.channel.send("> **Please select the user correctly **");
      if (accInDb.emails.length < numOfAcc) { return message.channel.send("**الكميه خلصت انتظر احد المسؤولين بتوفير كميه اخرى**") }
//by : ! Pirt YT#1739
      const sentMail = accInDb.emails.splice(0, numOfAcc)
      logAcc = sentMail;
      data[data.indexOf(accInDb)].emails = accInDb.emails;
      db.set("accounts", data)
      user.send({
        embeds: [new Discord.MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setTitle(`**Hi ${user.username} , ${client.user.username} gave you ${numOfAcc} ${account} account${numOfAcc > 1 ? "s" : ""}:**`)
          .setDescription(//by : ! Pirt YT#1739
            `
          **Your account${numOfAcc > 1 ? "s" : ""}:**
\`\`\`${sentMail.join("\n")}\`\`\`
`)
          .setFooter(
            `Black Host New Start`,
            `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
          )//by : ! Pirt YT#1739
          .setColor(embColor)
        ]
      })
      message.channel.send(`<@${user.id}> ** (تم ارسال الحسابات في الخاص نتمنى ان تضع رأيك هنا) <#1202311195101769770> :white_check_mark:**`)

      if (db.has("ch")) {
        ch = db.get("ch")
        client.channels.cache
          .get(ch)
          .send({
            embeds: [new Discord.MessageEmbed().setTitle(`${message.author.tag} gave ${numOfAcc} ${account} account to ${user.username}`)
              .setDescription(`\`\`\`${logAcc.join("\n")}\`\`\``)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })//by : ! Pirt YT#1739
              )
              .setTimestamp()//by : ! Pirt YT#1739
              .setFooter(
                `Black Host New Start`,
                `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
              )
              .setColor(embColor)

            ]
          });//by : ! Pirt YT#1739
      }

    }

    if (command === "buy") {
      const buyId = db.get("buy")
      if (![message.channel.id, "all"].includes(buyId)) {
        message.reply("**(اذهب الى روم الشراء لا يمكنك الشراء هنا) <#1202311136708677762> :exclamation: **");
        return;
      }
      if (cooldown === true) return message.reply("**Wait 1 minute before buy again** " + "<@" + message.author.id + ">");
      const account = args[0], numOfAcc = args[1] || 1
  //by : ! Pirt YT#1739
      const data = db.get("accounts")
      let accInDb = data.find(el => el.name === account)
      if (!accInDb) { return message.channel.send("**This item does not exist ❌**") }
      let { price, tax, emails } = accInDb;
      let probotid = db.get("probot") || "282859044593598464";
      let role = db.get("role");
      if (message.channel.type === "dm") return;
      if (!db.has("status")) return message.channel.send("The store is closed.");

      if (emails.length < numOfAcc) { return message.channel.send("**Not enough accounts in stock, please check the bot at a later time**") }
      let logAcc;//by : ! Pirt YT#1739
      let buys = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )//by : ! Pirt YT#1739
        .setTimestamp()
        .addField(`**Purchasing ${account} account :**`
          ,
          `
            
            > **-الكميه :** \`${numOfAcc}\`
            > **-السعر :** \`${tax * numOfAcc}\`  
            > **عندك وقت كبير للتحويل**
            > **تأكد من انو خاصك مفتوح** ⚠️

            **للشراء يجب عليك التحويل :**
          \`\`\`
#credit <@${owner[0]}> ${numOfAcc * tax}\`\`\`
            
     
            
`   )

        .setFooter(
          `Black Host New Start`,
          `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
        )
        .setColor(embColor);//by : ! Pirt YT#1739
      message.channel.send({ embeds: [buys] }).then(msg => {


        const filter = ({ content, author: { id } }) => {

          return content.startsWith(
            `**:moneybag: | ${message.author.username}, has transferred `
          ) &&
            content.includes(`${owner[0]}`) &&
            id === probotid &&//by : ! Pirt YT#1739
            (Number(content.slice(content.lastIndexOf("`") - String(tax * numOfAcc).length, content.lastIndexOf("`"))) >= price * numOfAcc)
        }


        message.channel.awaitMessages({
          filter,
          max: 1,
          time: 30_000,
          errors: ['time']
        }).then(msg => {
          const sentMail = emails.splice(0, numOfAcc)
          logAcc = sentMail;
          data[data.indexOf(accInDb)].emails = emails;
          db.set("accounts", data)

          message.author.send({
            embeds: [new Discord.MessageEmbed()
              .setAuthor(//by : ! Pirt YT#1739
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setTimestamp()
              .setDescription(`**Hi ${message.author.tag} , you have purchased ${numOfAcc} ${account} account${numOfAcc > 1 ? "s" : ""}:**
> **Total price : \`${tax * numOfAcc}\`**
          **Your account${numOfAcc > 1 ? "s" : ""}:**

         \`\`\` ${sentMail.join("\n")}\`\`\`
`)
              .setFooter(//by : ! Pirt YT#1739
                `Developed by : naji.ma`,
                `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
              )
              .setColor(embColor)
            ]
          })
          message.reply("**(تم ارسال الحسابات في الخاص رأيك هنا ) : <#1202311195101769770> :white_check_mark:**")
          msg.delete()//by : ! Pirt YT#1739

        })

          .then(() => {
            cooldown = false
            if (db.has("ch")) {
              ch = db.get("ch")
              client.channels.cache
                .get(ch)

                .send({
                  embeds: [new Discord.MessageEmbed()
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setTimestamp()
                    .setDescription(`${message.author.tag} bought ${account} :\n \`\`\`${logAcc.join("\n")}\`\`\``)
                    .setFooter(
                      `Black Host New Start`,
                      `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
                    )
                    .setColor(embColor)
                  ]//by : ! Pirt YT#1739
                })
               .send(`${message.author.tag} bought a ${account} account \n Account Informations : \`\`\`${logAcc.join("\n")}\`\`\``);
            }

          })//by : ! Pirt YT#1739

          .catch(err => {
            cooldown = false
            console.log(err)//by : ! Pirt YT#1739
            msg.delete()
            message.reply("**Time is over , operation canceled ❌ **")
          })

      })


      !cooldown && (cooldown = true)//by : ! Pirt YT#1739

    cooldown &&  setTimeout(() => {
       //by : ! Pirt YT#1739
        cooldown = true


      }, 60);
      return
    }
    if (command === "setlog") {
      if (message.channel.type === "dm") return;
      if (!owner.includes(message.author.id))
        return;
      let ch =//by : ! Pirt YT#1739
        message.guild.channels.cache.find(ch =>
          ch.name.toLocaleLowerCase().includes(args[0])
        ) || message.guild.channels.cache.find(ch => ch.id === args[0]);
      if (!ch) return message.channel.send("> **Please select the room correctly **");
      db.set("ch", ch.id);
      message.channel.send("> ** The log room has been selected successfully ✅**");
    }
    if (command === "user-add") {
      if (message.channel.type === "dm") return;
      if (owner[0] != message.author.id) return;
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.find(u => u.id === args[0]);//by : ! Pirt YT#1739

      if (!user)
        return message.channel.send("> **Please select the user correctly **");
      db.push("admins", user.id);
      updateAdmins()
      message.channel.send(`> **${user.tag} Added as an admin ✅**`);
    }
    if (command === "ping") {
      message.channel.send(
        `🏓Latency is ${Date.now() -
        message.createdTimestamp}ms. API Latency is ${Math.round(
          client.ws.ping
        )}ms`
      );
    }
    if (command === "user-remove") {
      if (message.channel.type === "dm") return;
      if (owner[0] != message.author.id) return;
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.find(u => u.id === args[0]);
//by : ! Pirt YT#1739
      if (!user)
        return message.channel.send("> **Please select the user correctly **");
      const filtered = db.get("admins").filter(ad => ad != user.id)
      db.set("admins", filtered);
      updateAdmins()
      message.channel.send(
        `> ** ${user.tag} has been removed from the admin list ✅**`
      );
    }
    if (command === "setprobot") {
      if (!owner.includes(message.author.id)) return;
      if (message.channel.type === "dm") return;
      if (!args[0])
        return message.channel.send("> **Please select the ID Probot correctly **");
      db.set("probot", args[0]);
      message.channel.send("> **✅ Probot has been successfully identified!**");
    }
    if (command === "setcustomerrole") {
      let custommer =
        message.guild.roles.cache.find(r =>
          r.name.toLocaleLowerCase().includes(args[0])
        ) || message.guild.roles.cache.find(r => r.id === args[0]);
      if (!custommer)
        return message.channel.send("> **Please select the customer roll correctly **");
      db.set("role", custommer.id);
      message.channel.send("> ** Customer roll selected successfully ✅**");
    }
    if (command === "stock") {
      if (message.channel.type === "dm") return;

      const accounts = db.get("accounts")


      let embed = new Discord.MessageEmbed()
        .setAuthor(//by : ! Pirt YT#1739
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        ).setFooter(
          `Black Host New Start`,
          `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
        )
        .setTimestamp().setColor(embColor);

      for (let { name, price, tax, emails } of accounts) {
        embed.addField(
          `**+------[ ${name} ]------+**`,
          `
            > **Price :** ${price}
            > **Stock :** ${emails.length}
            > **To buy:** \`${prefix}buy ${name}\` 
            `
        )//by : ! Pirt YT#1739
      }

      message.channel.send({ embeds: [embed] }
      );
    }
    if (command === "setbuy") {
      if (message.channel.type === "dm") return;
      if (!owner.includes(message.author.id))
        return;
      let ch =
        message.guild.channels.cache.find(ch =>
          ch.name.toLocaleLowerCase().includes(args[0])
        ) ?.id || message.guild.channels.cache.find(ch => ch.id === args[0]) ?.id;
      args[0] === "all" && (ch = "all")
      if (!ch) return message.channel.send("> **Please select the room correctly **");
      db.set("buy", ch);
      message.channel.send("> ** The buy room has been selected successfully ✅**");
//by : ! Pirt YT#1739
    }
    if (command.startsWith("remove-")) {
      const acc = command.split("-")[1]
     //by : ! Pirt YT#17398
      if (!owner.includes(message.author.id))
        return;
      if (message.channel.type === "dm") return;
      if (!args[0])
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed() //by : ! Pirt YT#1739
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )//by : ! Pirt YT#1739
              .addField(
                `> Error :`,
                `Usage : ${prefix}remove-${acc} \`ACCOUNT\`\n\n \`\`\`ACCOUNT = [ EMAIL:PASSWORD ]\`\`\``
              )
              .setFooter(
                `Black Host New Start`,
                `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
              )
              .setColor(embColor)
              .setTimestamp()
              .setTitle(`Remove ${acc} Account Command`)]
        }
        ); //by : ! Pirt YT#1739
      const data = db.get("accounts"); //by : ! Pirt YT#1739
      const account = data.find(el => el.name === acc)
      if (!account)
        return message.channel.send(`> **:x: There are no accounts in the stock! **`); //by : ! Pirt YT#1739
      if (args[0] === "all") {
        data[data.indexOf(account)].emails.length = 0
        db.set("accounts", data)

        return message.channel.send(`> **All ${acc} accounts has been removed successfully ✅**`);

      }
      else if (!message.content.includes(":"))
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setColor(embColor)
              .setDescription(`> usage : ${prefix}remove${acc} [adress:email]`)]
        }
        ); //by : ! Pirt YT#1739
      const filtered = account.emails.filter(accs => accs !== args[0]);
      data[data.indexOf(account)].emails = filtered //by : ! Pirt YT#1739
      db.set("accounts", data)
      message.channel.send(`> **account \`${args[0]}\`  has been removed successfully ✅**`);
    } //by : ! Pirt YT#1739
    if (command.startsWith("display-")) {
      const account = command.split("-")[1]
    //by : ! Pirt YT#1739
      if (message.channel.type === "dm") return; //by : ! Pirt YT#1739
      if (!owner.includes(message.author.id)) return; //by : ! Pirt YT#1739
      const accounts = db.get("accounts") ?.find(el => el ?.name === account) ?.emails;
      const text =
        accounts && accounts[0]
          ? accounts.join("\n")
          : ` There are no ${account} accounts in your stock ❌`; //by : ! Pirt YT#1739
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setTitle(`All ${account} accounts :`)
            .setDescription(`\`\`\`${text}\`\`\``)
            .setFooter(
              `Black Host New Start`,
              `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
            )
            .setTimestamp().setColor(embColor)
        ]
      }
      );
    }
    if (command.startsWith("setcolor")) {
      if (!owner.includes(message.author.id)) return message.channel.send("**you are not an admin**")
      embColor = args[0].toUpperCase();
      message.channel.send(`**all embeds color was set to ${args[0].toUpperCase()}**`)
    }

    if (command === "restart") {
      if (!owner.includes(message.author.id)) return; //by : ! Pirt YT#1739
      message.channel
        .send(`Restart is in progress...`)
        .then(() => client.destroy())
        .then(() => {
          client.login(process.env._Pirt_YT);
          message.channel.send("> ** The bot has been successfully restarted ✅**");
        });
    }
    if (command === "help") {
      if (message.channel.type === "dm") return; //by : ! Pirt YT#1739
      const embed =
        new Discord.MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTitle(`About ${client.user.username}`)
          .addField(`General`, `\`stock => to see availabe stuff\`\n\`buy [type] [number] => to buy anything\`\n\`ping => to see the latency\` `)
          .setDescription(
            `Black Host New Start`
          )
//by : ! Pirt YT#1739
          .setFooter(
            `Black Host New Start`,
            `https://cdn.discordapp.com/icons/1016041691842609164/fc41abb9cb4894f933064fb4a62c726a.png?size=1024`
          ).setColor(embColor)
      if (owner.includes(message.author.id)) {
        embed.addField(
          `Administrator`,


          `\n\n**👤 User**\n\n\`user-add [user] => add an administrator\`\n\`user-remove [user] => remove an administrator\`\n\`blacklist [user] => add someone to blacklist\`\n\`unblacklist => remove someone from blacklist\`\n\`resetblacklist => clear blacklist\`\n
\**🛒 Shop\**\n
\`add-[type] [account] => add a new account\`\n\`remove-[type] [account] => remove a specific account\`\n\`remove-[type] => remove all accounts\`\n\`setprice-[type] => change price\`\n\`delete-[type] => delete a full type\`\n\`give-[type] [user] [number] => for replacement\`\n\`setbuy [all] or [channel_id] => select buy channel\`\n
**🛠️ Settings**\n
\`display-[type] => display all accounts\`\n\`setlog => set a log room\`\n\`status [open] or [close]\`\n\`setcolor [color] => to change embeds color\``
        )

      }
      message.channel.send({ embeds: [embed] });
    }
  }
  catch (err) {
    console.log(err.message)
  }
});
//by : ! Pirt YT#1739
//by : ! Pirt YT#1739//by : ! Pirt YT#1739

client.on("message", async message => {
  try {
    if (db.get("blacklist").includes(message.author.id)) return;
    let prefix = await db.get("prefix");
    if (message.content.startsWith(prefix + "setname")) {
      let args = message.content.split(" ");
      let botnameee = args.slice(1).join(" ");
      if (!owner.includes(message.author.id))
        return message.channel.send(`** ❌ Only Owners Can Use this Command **`);
      if (!botnameee)
        return message.channel.send(
          `** ❌ Please Provide me a name for the bot !**`
        );
      client.user.setUsername(`${botnameee}`);
      message.channel.send(`Changing The bot's Name ...`).then(me => {
        me.edit(` Done !`);
      });
    }
    if (message.content.startsWith(prefix + "setavatar")) {
      let args = message.content.split(" ");
      let botnameee = args.slice(1).join(" ");
      if (!owner.includes(message.author.id))
        return message.channel.send(`** ❌ Only Owners Can Use this Command **`);
      if (!botnameee)
        return message.channel.send(
          `** ❌ Please Provide me an avatar for the bot !**`
        );
      client.user.setAvatar(`${botnameee}`);
      message.channel.send(`Changing The bot's Avatar ...`).then(me => {
        me.edit(` Done !`);
      });
    }
  }
  catch (err) {
    console.log(err.message)

  }
});

client.on("message", async message => {
  try {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    const command = args.shift().toLowerCase();
    let user =
      message.mentions.members.first() ||
      client.users.cache.find(u => u.id === args[0]);
    let blacklist = db.get("blacklist")
    if (message.channel.type === "dm") return;
    if (!db.get("admins").includes(message.author.id)) return;
    if (command === "blacklist") {

      if (!user)//by : ! Pirt YT#1739
        return message.channel.send("> **Please select the user correctly**");
      if (blacklist.includes(user.id))
        return message.channel.send("> **:x: The user is already in the list!**");
      db.push("blacklist", user.id)
      message.channel.send("> **The user has been added to the blacklist ✅**");
    }
    if (command === "unblacklist") {

      if (!user)
        return message.channel.send("> **Please select the user correctly**");
      if (!blacklist.includes(user.id))
        return message.channel.send("> **:x: The member is not in the list!**");
      const filtered = db.get("blacklist").filter(u => u != user.id)
      db.set("blacklist", filtered);
      message.channel.send("> **The user has been removed from the blacklist ✅**");
    }
    if (command === "resetblacklist") {

      db.set("blacklist", []);
      message.channel.send(
        "> ** All members have been removed from the blacklist ✅**"
      );
    }
  }
  catch (err) {
    console.log(err)
  }
});
//by : ! Pirt YT#1739

//by : ! Pirt YT#1739

