var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 360, height: 720 });
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    let UserLoggedIn = yield figma.clientStorage.getAsync("UserLoggedIn");
    let UserDetails = yield figma.clientStorage.getAsync("UserDetails");
    let myTemplates = yield figma.clientStorage.getAsync("myTemplates");
    if (msg.type === "checkUserLogin") {
        figma.ui.postMessage({
            type: "checkUserLogin",
            UserLoggedIn: UserLoggedIn,
            UserDetails: UserDetails,
            myTemplates: myTemplates,
        });
    }
    else if (msg.type === "login") {
        yield figma.clientStorage.setAsync("UserLoggedIn", true);
        yield figma.clientStorage.setAsync("UserDetails", msg.userDetails);
        figma.ui.postMessage({
            type: "checkUserLogin",
            UserLoggedIn: true,
            UserDetails: msg.userDetails,
        });
    }
    else if (msg.type === "sync_myTemplates") {
        yield figma.clientStorage.setAsync("myTemplates", msg.myTemplates);
    }
    else if (msg.type === "insert_template") {
        // await figma.clientStorage.setAsync("myTemplates", msg.myTemplates);
        myTemplates = [...myTemplates, msg.template];
        figma.clientStorage.setAsync("myTemplates", myTemplates);
    }
    else if (msg.type === "remove_template") {
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
    }
    else if (msg.type === "create-spirograph") {
        const nodes = [];
        var str = msg.svg;
        const node = figma.createNodeFromSvg(str);
        node.resize(500, 500);
        let length = figma.currentPage.children.length;
        if (length > 1) {
            node.x = figma.currentPage.children[length - 2].x + 350;
        }
        figma.currentPage.appendChild(node);
        nodes.push(node);
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
        figma.flatten(nodes, figma.currentPage);
    }
    else if (msg.type === 'notify') {
        figma.notify(msg.text, { timeout: 1000 });
    }
    else if (msg.type === "logout") {
        yield figma.clientStorage.setAsync("UserLoggedIn", false);
        yield figma.clientStorage.setAsync("UserDetails", "");
        figma.ui.postMessage({
            type: "checkUserLogin",
            UserLoggedIn: false,
            UserDetails: "",
        });
    }
    // figma.closePlugin();
});
