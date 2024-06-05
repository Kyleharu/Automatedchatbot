module.exports.config = {
  name: "allgroups",
  role: 2,
  version: "2.0.0",
  hasPrefix: false,
  credits: "ryuko",
  description: "all groups",
  usePrefix: true,
  commandCategory: "admin",
  usages: "groups",
  cooldowns: 5,
};


module.exports.handleReply = async function({ api, event, args, Threads, handleReply }) {

  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  var arg = event.body.split(" ");
  var idgr = handleReply.groupid[arg[1] - 1];


  switch (handleReply.type) {

    case "reply":
      {
        if (arg[0] == "ban" || arg[0] == "Ban") {
          const data = (await Threads.getData(idgr)).data || {};
          data.banned = 1;
          await Threads.setData(idgr, { data });
          global.data.threadBanned.set(parseInt(idgr), 1);
          api.sendMessage(`successfully banned group id : ${idgr}`, event.threadID, event.messageID);
          break;
        }

