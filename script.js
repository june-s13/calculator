function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
  if (num == "") {
      document.getElementById("output-value").innerText = num;
  } else {
      document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}

function getFormattedNumber(num) {
    var n = Number(num);
    var val = n.toLocaleString("en");
    return val;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ""));
}

var op = document.getElementsByClassName("op");

for (var i = 0; i < op.length; i++) {
    op[i].addEventListener("click", function() {
        if (this.id == "clear") {
          printHistory("");
          printOutput("");
        } else if (this.id == "backspace") {
          var output = reverseNumberFormat(getOutput()).toString();
          if (output) {
            output = output.substr(0, output.length - 1);
            printOutput(output);
          }
        } else {
          output = getOutput();
          //console.log(output)
          //console.log(output + 'checking output at line 46')
          var history = getHistory(); //missing var on this line so it was making some funky history object
          //console.log(history)
          //console.log(history + 'checking history var in line 48')
          if (output == "" && history != "") {
            if (isNaN(history[history.length - 1])) {
              //Fixed a "Uncaught TypeError: history.substr is not a function at HTMLButtonElement.<anonymous>" error
              history = String(history).substr(0, history.length - 1);
            }
          }
          if (output != "" || history != "") {
            output = output == "" ? output : reverseNumberFormat(output);
            //console.log(output + 'checking what output has at line 56')
            history = history + output;
            //console.log(history)
            if (this.id == "=") {
              var result = eval(history);
              console.log(result + 'somethings odd')
              printOutput(result);
              printHistory("");
            } else {
              //commented out what I thought was not correct
              history = history + this.id; //this line was right, btw you can write this as history += this.id;
              //console.log('I THINK ISSUE HERE ')
              //console.log(history)
              //console.log('--')
              //console.log(this.id)
              printHistory(history);
              //This displays the multiplication sign
              //printHistory(this.id) commented this line out because it was overriding history for no reason
              printOutput("");
            }
          }
        }
    });
}

var number = document.getElementsByClassName("number");

for (i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function() {
    var output = reverseNumberFormat(getOutput());
    //console.log(output + 'this is checking output')
    if (output != NaN) {
      output = output + this.id;
      printOutput(output);
    }
  });
}