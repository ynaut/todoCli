const fs = require("fs");
let list = [];

var args = process.argv.slice(2);

var action = args[0];

if (action === "add") {
  fs.readFile("data.json", function(err, data) {
    list = JSON.parse(data);
    list.push(args[1]);

    fs.writeFile("data.json", JSON.stringify(list), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });
}else if(action ==="remove") {
  var indexToRemove = Number(args[1]) -1
  
  fs.readFile("data.json", function(err, data) {
    list = JSON.parse(data);
    if(list.length >= indexToRemove) {
      list = list.slice(0,indexToRemove).concat(list.slice(indexToRemove + 1))
      fs.writeFile("data.json", JSON.stringify(list), function(err) {
        if (err) throw err;
        console.log("Saved!");
      }); 
    } else {
      console.log("No todo in that position");
    }
  })
}
else if( action === "list") {
  fs.readFile("data.json", function(err, data) {
    list = JSON.parse(data);
    if(list.length > 0) {
      console.log(JSON.stringify(list));
    } else {
      console.log("No todos saved");
    }
  });
}
else if(action === "reset"){
  fs.writeFile("data.json", JSON.stringify([]), function(err) {
    if (err) throw err;
    console.log("Saved!");
  }); 
} 

else {
  fs.readFile("data.json", function(err, data) {
    list = JSON.parse(data);
    console.log(JSON.stringify(list));
  });
}

