(function ($) {
  "use strict";

  /*==================================================================
    [ Focus Contact2 ]*/
  $(".input100").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var name = $('.validate-input input[name="name"]');
  var email = $('.validate-input input[name="email"]');
  var message = $('.validate-input textarea[name="message"]');

  $(".validate-form").on("submit", function () {
    var check = true;

    if ($(name).val().trim() == "") {
      showValidate(name);
      check = false;
    }

    if (
      $(email)
        .val()
        .trim()
        .match(
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
        ) == null
    ) {
      showValidate(email);
      check = false;
    }

    if ($(message).val().trim() == "") {
      showValidate(message);
      check = false;
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);

const mainDiv = document.getElementById("mainDiv");
const secondaryDiv = document.getElementById("secondaryDiv");

const calculateButton = document.getElementById("calculateButton");
const goBackbtn = document.getElementById("goBackBtn");
goBackbtn.addEventListener("click", () => {
  secondaryDiv.classList.remove("animate__backInUp");
  secondaryDiv.classList.add("animate__backOutUp");
  setTimeout(() => {
    secondaryDiv.classList.add("d-none");
  }, 500);
  mainDiv.classList.remove("d-none", "animate__backOutUp");
  mainDiv.classList.add("animate__backInUp");
});

const qInput = document.getElementById("qInput");
const iInput = document.getElementById("iInput");
const fInput = document.getElementById("fInput");

// Chart page elements
let initialDSpan = document.getElementById("initialD");
let interestSpan = document.getElementById("interest");
let frequencySpan = document.getElementById("frequency");
let total = document.getElementById("total");
let yield = document.getElementById("netYield");
let dailyYield = document.getElementById("dailyYield");
let weeklYield = document.getElementById("weeklYield");
let monthlyYield = document.getElementById("monthlyYield");

let qChart = [];
let fixedArray = [];

calculateButton.addEventListener("click", function Calculate() {
  if (
    fInput.value == "Choose one option" ||
    qInput.value == "" ||
    iInput.value == ""
  ) {
    alert("Please check the input fields");
    console.log(":(");
  } else {
    if (secondaryDiv.classList.contains("animate__backOutUp")) {
      secondaryDiv.classList.remove("animate__backOutUp");
    }
    mainDiv.classList.add("animate__backOutUp");
    setTimeout(() => {
      mainDiv.classList.add("d-none");
    }, 500);

    qChart = [];
    fixedArray = [];
    let quantity = qInput.value;
    let interest = iInput.value / 100;
    let frequency = fInput.value;
    let iterationsInAYear = Number;
    let compoundRate = 1;
    let compounded = 1;
    let fixedArrayQuantity = 0;

    initialDSpan.innerHTML = "$" + qInput.value;
    interestSpan.innerHTML = iInput.value + "%";
    frequencySpan.innerHTML = fInput.value;

    // fixed rate Chart
    for (let index = 0; index < 12; index++) {
      if (index == 0) {
        fixedArrayQuantity =
          parseFloat(quantity) + parseFloat((quantity * interest) / 12);
      } else {
        fixedArrayQuantity = fixedArrayQuantity + (quantity * interest) / 12;
      }
      fixedArray.push(fixedArrayQuantity);
    }

    if (frequency == "Monthly") {
      iterationsInAYear = 11;
      compoundRate = 1 + interest / 12;
    }
    if (frequency == "Weekly") {
      iterationsInAYear = 51;
      compoundRate = 1 + interest / 52;
    }
    if (frequency == "Daily") {
      iterationsInAYear = 364;
      compoundRate = 1 + interest / 365;
    }
    if (frequency == "Yearly") {
      iterationsInAYear = 0;
      compoundRate = 1 + interest;
    }

    for (let i = 0; i <= iterationsInAYear; i++) {
      if (i == 0) {
        compounded = quantity * compoundRate;
        qChart.push(compounded);
      } else if (i > 0) {
        compounded = compounded * compoundRate;
        qChart.push(compounded);
      }
    }

    if (qChart.length == 12) {
      yield.innerHTML = "$" + (qChart[qChart.length - 1] - quantity).toFixed(2);
      dailyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 365).toFixed(2);
      monthlyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 12).toFixed(2);
      weeklyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 52).toFixed(2);
    }

    if (qChart.length == 365) {
      console.log("tuki");
      qChart = [
        qChart[30],
        qChart[58],
        qChart[89],
        qChart[119],
        qChart[150],
        qChart[180],
        qChart[211],
        qChart[242],
        qChart[272],
        qChart[303],
        qChart[333],
        qChart[364],
      ];
      yield.innerHTML = "$" + (qChart[qChart.length - 1] - quantity).toFixed(2);
      dailyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 365).toFixed(2);
      monthlyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 12).toFixed(2);
      weeklyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 52).toFixed(2);
    } else if (qChart.length == 52) {
      qChart = [
        qChart[4],
        qChart[8],
        qChart[13],
        qChart[17],
        qChart[21],
        qChart[26],
        qChart[30],
        qChart[34],
        qChart[39],
        qChart[43],
        qChart[47],
        qChart[51],
      ];
      yield.innerHTML = "$" + (qChart[qChart.length - 1] - quantity).toFixed(2);
      dailyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 365).toFixed(2);
      monthlyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 12).toFixed(2);
      weeklyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 52).toFixed(2);
    }

    if (qChart.length < 2) {
      qChart.shift();
      for (let index = 0; index < 12; index++) {
        if (index == 0) {
          qChartYearly =
            parseFloat(quantity) + parseFloat((quantity * interest) / 12);
        } else {
          qChartYearly =
            parseFloat(qChartYearly) + parseFloat((quantity * interest) / 12);
        }
        qChart.push(qChartYearly);
      }
      yield.innerHTML = "$" + (qChart[qChart.length - 1] - quantity).toFixed(2);
      dailyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 365).toFixed(2);
      monthlyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 12).toFixed(2);
      weeklyYield.innerHTML =
        "$" + ((qChart[qChart.length - 1] - quantity) / 52).toFixed(2);
    }
    total.innerHTML = "$" + qChart[qChart.length - 1].toFixed(2);

    dibujarTabla();
    secondaryDiv.classList.add("animate__backInUp");
    secondaryDiv.classList.remove("d-none");
    window.imgName =
      "Compound interest on " + qInput.value + " at " + iInput.value + "% APR";
  }
});

// Dom to image

const save = document.getElementById("save");

function showStuff() {
  console.log("showstuff");
  goBackbtn.classList.remove("d-none");
  save.classList.remove("d-none");
}
function hideStuff() {
  console.log("showstuffn´t");

  goBackbtn.classList.add("d-none");
  save.classList.add("d-none");
}

save.addEventListener("click", function snapShot(params) {
  hideStuff();
  domtoimage
    .toPng(secondaryDiv)
    .then(function (dataUrl) {
      let investmentSnapshot = new Image();
      investmentSnapshot.src = dataUrl;
      save.setAttribute("download", window.imgName);
      save.setAttribute("href", investmentSnapshot.src);
      showStuff();
    })
    .catch(function (error) {
      console.error(error);
    });
});

// Months for labels
let date = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let actualMonth = monthNames[date.getMonth()];
let monthsInvested = [];
for (let index = date.getMonth(); index < monthNames.length; index++) {
  monthsInvested.push(monthNames[index]);
}

let nextYearMonths = monthNames.length - (12 - date.getMonth());
for (let index = 0; index < nextYearMonths; index++) {
  monthsInvested.push(monthNames[index]);
}

function dibujarTabla() {
  const data = {
    labels: monthsInvested,
    datasets: [
      {
        label: "Compound yield",
        backgroundColor: "rgb(0,255,0)",
        borderColor: "rgb(0,255,0)",
        data: qChart,
      },
      {
        label: "Fixed yield",
        backgroundColor: "rgb(255,0,0)",
        borderColor: "rgb(255,0,0)",
        data: fixedArray,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {},
  };

  try {
    window.myChart = new Chart(document.getElementById("myChart"), config);
  } catch (error) {
    window.myChart.destroy();
    window.myChart = new Chart(document.getElementById("myChart"), config);
  }
}
