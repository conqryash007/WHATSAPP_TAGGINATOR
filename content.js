// let check = {
//   brokenString() {
//     return this.rawString().split(",");
//   },
//   filtered() {
//     return this.brokenString().filter((element) => element.includes("+"));
//   },
//   createElement(data) {
//     console.log(data);
//     // let hiddenElement = document.createElement("a");
//     // hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(data);
//     // hiddenElement.target = "_blank";
//     // hiddenElement.download = "Contacts.csv";
//     // hiddenElement.click();
//   }
// };

//////////////////

function simulate(element, eventName) {
  var options = extend(defaultOptions, arguments[2] || {});
  var oEvent,
    eventType = null;

  for (var name in eventMatchers) {
    if (eventMatchers[name].test(eventName)) {
      eventType = name;
      break;
    }
  }

  if (!eventType)
    throw new SyntaxError(
      "Only HTMLEvents and MouseEvents interfaces are supported"
    );

  if (document.createEvent) {
    oEvent = document.createEvent(eventType);
    if (eventType == "HTMLEvents") {
      oEvent.initEvent(eventName, options.bubbles, options.cancelable);
    } else {
      oEvent.initMouseEvent(
        eventName,
        options.bubbles,
        options.cancelable,
        document.defaultView,
        options.button,
        options.pointerX,
        options.pointerY,
        options.pointerX,
        options.pointerY,
        options.ctrlKey,
        options.altKey,
        options.shiftKey,
        options.metaKey,
        options.button,
        element
      );
    }
    element.dispatchEvent(oEvent);
  } else {
    options.clientX = options.pointerX;
    options.clientY = options.pointerY;
    var evt = document.createEventObject();
    oEvent = extend(evt, options);
    element.fireEvent("on" + eventName, oEvent);
  }
  return element;
}

function extend(destination, source) {
  for (var property in source) destination[property] = source[property];
  return destination;
}

var eventMatchers = {
  HTMLEvents:
    /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  MouseEvents: /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
};
var defaultOptions = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true,
};

/////////////////
let arr = [];
let box;
const getuser = () => {
  const user =
    document.querySelectorAll("header")[1].childNodes[1].childNodes[1]
      .childNodes[0].innerText;
  arr = user.split(",");
  arr = arr.map((str) => {
    return str.trim();
  });
  arr = arr.map((str) => {
    return `@${str}`;
  });
  box = document.querySelector(
    "#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text"
  );
  box.textContent = `${arr[0]}`;
  // console.log(arr);
  // console.log(box);
  simulate(box, "click");
};
let createButton = {
  create() {
    let $ = document;
    let exportButton = $.createElement("button");
    let $$ = exportButton.style;
    exportButton.id = "ExportButton";
    exportButton.innerText = "EXPORT";
    $$.zIndex = "999";
    $$.height = "42px";
    $$.width = "88px";
    $$.color = "#989898";
    $$.fontSize = "14px";
    $$.fontWeight = "bold";
    $$.position = "fixed";
    $$.right = "2%";
    $$.bottom = "80%";
    $$.backgroundColor = "#FFFFFF";
    $$.borderRadius = "21px";
    $$.boxShadow = "0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2)";
    let place = $.querySelector("footer");
    place.prepend(exportButton);
    exportButton.addEventListener("click", getuser);
  },
};
setInterval(() => {
  if (
    document.querySelector("footer") &&
    !document.querySelector("#ExportButton")
  )
    setTimeout(createButton.create, 1000);
}, 2000);
