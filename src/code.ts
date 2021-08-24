figma.showUI(__html__, { width: 360, height: 720 });

figma.ui.onmessage = async (msg) => {
  let UserLoggedIn = await figma.clientStorage.getAsync("UserLoggedIn");
  let UserDetails = await figma.clientStorage.getAsync("UserDetails");
  let myTemplates = await figma.clientStorage.getAsync("myTemplates");
  if (msg.type === "checkUserLogin") {
    figma.ui.postMessage({
      type: "checkUserLogin",
      UserLoggedIn: UserLoggedIn,
      UserDetails: UserDetails,
      myTemplates: myTemplates,
    });
  } else if (msg.type === "login") {
    await figma.clientStorage.setAsync("UserLoggedIn", true);
    await figma.clientStorage.setAsync("UserDetails", msg.userDetails);
    figma.ui.postMessage({
      type: "checkUserLogin",
      UserLoggedIn: true,
      UserDetails: msg.userDetails,
    });
  } else if (msg.type === "sync_myTemplates") {
    await figma.clientStorage.setAsync("myTemplates", msg.myTemplates);
  } else if (msg.type === "insert_template") {
    // await figma.clientStorage.setAsync("myTemplates", msg.myTemplates);
    myTemplates = [...myTemplates, msg.template];
    figma.clientStorage.setAsync("myTemplates", myTemplates);
    figma.ui.postMessage({
      type: "setTemplates",
      UserDetails: UserDetails,
      myTemplates: myTemplates,
    });
  } else if (msg.type === "remove_template") {
    // await figma.clientStorage.setAsync("myTemplates", msg.myTemplates);
    myTemplates = myTemplates.filter((myTemplate) => {
      return myTemplate.templateId !== msg.templateId;
    });
    figma.clientStorage.setAsync("myTemplates", myTemplates);
    figma.ui.postMessage({
      type: "setTemplates",
      UserDetails: UserDetails,
      myTemplates: myTemplates,
    });
  } else if (msg.type === "create-spirograph") {
    const nodes = [];
    var str = msg.svg;
    const node = figma.createNodeFromSvg(str);
    node.resize(500, 500);
    node.x = 500;
    node.y = 500;
    nodes.push(node);
    figma.flatten(nodes, figma.currentPage);
  } else if (msg.type === "logout") {
    await figma.clientStorage.setAsync("UserLoggedIn", false);
    await figma.clientStorage.setAsync("UserDetails", "");
    await figma.clientStorage.setAsync("favorites", "");
    await figma.clientStorage.setAsync("myCopies", "");
    figma.ui.postMessage({
      type: "checkUserLogin",
      UserLoggedIn: false,
      UserDetails: "",
    });
  }
  // figma.closePlugin();
};
