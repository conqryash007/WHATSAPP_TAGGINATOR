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

/////////////////////////

function simulateMouseEvents(element, eventName) {
  var mouseEvent = document.createEvent("MouseEvents");
  mouseEvent.initEvent(eventName, true, true);
  element.dispatchEvent(mouseEvent);
}

var eventFire = (MyElement, ElementType) => {
  var MyEvent = document.createEvent("MouseEvents");
  MyEvent.initMouseEvent(
    ElementType,
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  MyElement.dispatchEvent(MyEvent);
};

function myFunc() {
  messageBox = document.querySelectorAll("[contenteditable='true']")[1]; //text box

  message = "My Message"; // Replace My Message with your message use  to add spaces to your message

  counter = 5; // Replace 5 with the number of times you want to send your message

  for (i = 0; i < counter; i++) {
    let event = document.createEvent("UIEvents");
    messageBox.innerHTML = message.replace(/ /gm, ""); // test it
    event.initUIEvent("input", true, true, window, 1);
    messageBox.dispatchEvent(event);
    event.initUIEvent("click", true, true, window, 1);
    messageBox.dispatchEvent(event);
    eventFire(document.querySelector('span[data-icon="send"]'), "click");
  }
}

/////////////////////////

let arr = [];
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
  let messageBox = document.querySelectorAll("[contenteditable='true']")[1]; //text box
  // console.log(arr);
  // console.log(box);
  let inptext = `    `;
  for (let i = 0; i < arr.length - 1; i++) {
    inptext += `Hello `;
    inptext += arr[i];
    inptext += `
    `;
    let event = document.createEvent("UIEvents");
    messageBox.innerHTML = inptext;
    event.initUIEvent("input", true, true, window, 1);
    messageBox.dispatchEvent(event);
    // let evt = new MouseEvent("click", {
    //   view: window,
    //   bubbles: true,
    //   cancelable: true,
    //   clientX: 20,
    // });
    // messageBox.dispatchEvent(evt);
    // const ke = new KeyboardEvent("keydown", {
    //   bubbles: true,
    //   cancelable: true,
    //   keyCode: 13,
    // });
    // messageBox.dispatchEvent(ke);
  }
  messageBox.addEventListener("click", () => {
    const ke = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });
    messageBox.dispatchEvent(ke);
  });
};

let createButton = {
  create() {
    let $ = document;
    let exportButton = $.createElement("button");
    let $$ = exportButton.style;
    exportButton.id = "ExportButton";
    exportButton.innerText = "Tag User";
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
