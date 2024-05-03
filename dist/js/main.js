let stepCont = document.querySelector(".container > .steps");
let steps = document.querySelectorAll(".container > .steps .step");
let nextStepBtns = document.querySelectorAll(
  ".container > .steps .step .next-step",
);
let previousStepBtns = document.querySelectorAll(
  ".container > .steps .step .previous-step",
);
let firstStepInputs = document.querySelectorAll(
  ".step[data-index='1'] form input",
);
let firstStepInputLabels = document.querySelectorAll(
  ".step[data-index='1'] form label",
);
let sidebarIndexes = document.querySelectorAll(".sidebar .step .index");
let planTypeToggle = document.querySelector(
  ".container .steps .step[data-index='2'] .plan-type input",
);
let planTypeOptOne = document.querySelector(
  ".container .steps .step[data-index='2'] .plan-type .opt-1",
);
let planTypeOptTwo = document.querySelector(
  ".container .steps .step[data-index='2'] .plan-type .opt-2",
);
let planBoxesDiscounts = document.querySelectorAll(
  ".container .steps .step[data-index='2'] .select .discount",
);
let toggleablePrices = document.querySelectorAll(".toggleable-price");
let planTimeInBill = document.querySelector(
  ".step[data-index='4'] .info .plan-type .time",
);
let totalPrice = document.querySelector(".step[data-index='4'] .total .amount");
let totalPlanTime = document.querySelector(".step[data-index='4'] .total p");

function updatePrice(totalEl) {
  let accum = 0;

  accum += Number.parseInt(planPriceInBill.textContent.slice(1));

  let addonPrices = document.querySelectorAll(
    ".step[data-index='4'] .cart .addon.active .price",
  );

  for (let i = 0; i < addonPrices.length; i++) {
    accum += Number.parseInt(addonPrices[i].textContent.slice(2))
  }

  if (planPriceInBill.textContent.includes("mo")) {
    totalEl.textContent = `+$${accum}/mo`
  } else {
    totalEl.textContent = `+$${accum}/yr`
  }
}

nextStepBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn == firstNextBtn) return;
    let newIndex = `${+stepCont.getAttribute("data-current-index") + 1}`;
    if (newIndex == steps.length + 1) return;

    stepCont.setAttribute("data-current-index", newIndex);

    steps.forEach((step) => {
      if (step.getAttribute("data-index") == newIndex) {
        steps.forEach((step) => {
          step.classList.remove("active");
        });

        step.classList.add("active");
      }
    });

    sidebarIndexes.forEach((index) => {
      if (index.getAttribute("data-value") == newIndex) {
        sidebarIndexes.forEach((index) => {
          index.classList.remove("active");
        });

        index.classList.add("active");
      }
    });
  });
});

previousStepBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let newIndex = `${+stepCont.getAttribute("data-current-index") - 1}`;

    stepCont.setAttribute("data-current-index", newIndex);

    steps.forEach((step) => {
      if (step.getAttribute("data-index") == newIndex) {
        steps.forEach((step) => {
          step.classList.remove("active");
        });

        step.classList.add("active");
      }
    });

    sidebarIndexes.forEach((index) => {
      if (index.getAttribute("data-value") == newIndex) {
        sidebarIndexes.forEach((index) => {
          index.classList.remove("active");
        });

        index.classList.add("active");
      }
    });
  });
});

planTypeToggle.addEventListener("click", (e) => {
  let addonPrices = document.querySelectorAll(
    ".step[data-index='4'] .cart .addon .price",
  );

  console.log(addonPrices)

  if (e.target.checked) {
    planTypeToggle.setAttribute("data-type", "yearly");

    planTimeInBill.textContent = "(Yearly)";
    totalPlanTime.textContent = "Total (per year)";

    addonPrices.forEach(priceEl => {
      priceEl.textContent = priceEl.getAttribute("data-yearly")
    })

    toggleablePrices.forEach((el) => {
      el.textContent = el.getAttribute("data-yearly");
    });

    planBoxesDiscounts.forEach((el) => {
      el.classList.remove("hidden");
    });

    planTypeOptOne.classList.remove("active");
    planTypeOptTwo.classList.add("active");
  } else {
    planTypeToggle.setAttribute("data-type", "monthly");

    planTimeInBill.textContent = "(Monthly)";
    totalPlanTime.textContent = "Total (per month)";

    toggleablePrices.forEach((el) => {
      el.textContent = el.getAttribute("data-monthly");
    });

    addonPrices.forEach(priceEl => {
      priceEl.textContent = priceEl.getAttribute("data-monthly")
    })

    planBoxesDiscounts.forEach((el) => {
      el.classList.add("hidden");
    });

    planTypeOptOne.classList.add("active");
    planTypeOptTwo.classList.remove("active");
  }

  updatePrice(totalPrice);
});

let firstNextBtn = nextStepBtns[0];

firstNextBtn.addEventListener("click", function () {
  let isValid = true;

  for (let i = 0; i < firstStepInputs.length; i++) {
    if (firstStepInputs[i].value == "" || firstStepInputs[i].value == 0) {
      firstStepInputs[i].classList.add("warn");

      if (firstStepInputLabels[i].querySelector(".warn") == undefined) {
        firstStepInputLabels[
          i
        ].innerHTML += `<span class="warn">this field is required</span>`;
      }

      isValid = false;
    } else {
      firstStepInputs[i].classList.remove("warn");
      if (firstStepInputLabels[i].querySelector(".warn") != undefined)
        firstStepInputLabels[i].querySelector(".warn").remove();
    }
  }

  if (isValid) {
    let newIndex = `${+stepCont.getAttribute("data-current-index") + 1}`;
    if (newIndex == steps.length + 1) return;

    stepCont.setAttribute("data-current-index", newIndex);

    steps.forEach((step) => {
      if (step.getAttribute("data-index") == newIndex) {
        steps.forEach((step) => {
          step.classList.remove("active");
        });

        step.classList.add("active");
      }
    });

    sidebarIndexes.forEach((index) => {
      if (index.getAttribute("data-value") == newIndex) {
        sidebarIndexes.forEach((index) => {
          index.classList.remove("active");
        });

        index.classList.add("active");
      }
    });
  }
});

let planTypeInputs = document.querySelectorAll(
  '.step[data-index="2"] .select input',
);
let planTypeInBill = document.querySelector(
  ".step[data-index='4'] .info .plan-type .type",
);
let planPriceInBill = document.querySelector(
  ".step[data-index='4'] .plan .price",
);

planTypeInputs.forEach((el) => {
  el.addEventListener("click", () => {
    planTypeInBill.textContent = el.getAttribute("data-value");

    let priceEl = el.nextElementSibling.querySelector(".price");

    planPriceInBill.setAttribute(
      "data-monthly",
      priceEl.getAttribute("data-monthly"),
    );
    planPriceInBill.setAttribute(
      "data-yearly",
      priceEl.getAttribute("data-yearly"),
    );

    if (planTypeToggle.getAttribute("data-type") == "monthly") {
      planPriceInBill.textContent =
        planPriceInBill.getAttribute("data-monthly");
    } else {
      planPriceInBill.textContent = planPriceInBill.getAttribute("data-yearly");
    }

    updatePrice(totalPrice);
  });
});

let addonCheckboxes = document.querySelectorAll(
  ".step[data-index='3'] .checkboxes label",
);
let billAddons = document.querySelectorAll(
  ".step[data-index='4'] .cart .addon",
);

addonCheckboxes.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("checked");

    if (el.classList.contains("checked")) {
      billAddons.forEach(addon => {
        if (addon.getAttribute("data-id") == el.getAttribute("for")) {
          addon.classList.add("active")
          addon.classList.remove("hidden")
        }
      })
    } else {
      billAddons.forEach(addon => {
        if (addon.getAttribute("data-id") == el.getAttribute("for")) {
          console.log(addon.getAttribute("data-id"))
          addon.classList.remove("active")
          addon.classList.add("hidden")
        }
      })
    }

    updatePrice(totalPrice);
  });
});

let jumpToChangePlan = document.querySelector(".container .steps .step[data-index='4'] .plan .change-plan")

jumpToChangePlan.addEventListener("click", () => {
  let newIndex = `2`;

  stepCont.setAttribute("data-current-index", newIndex);

  steps.forEach((step) => {
    if (step.getAttribute("data-index") == newIndex) {
      steps.forEach((step) => {
        step.classList.remove("active");
      });

      step.classList.add("active");
    }
  });

  sidebarIndexes.forEach((index) => {
    if (index.getAttribute("data-value") == newIndex) {
      sidebarIndexes.forEach((index) => {
        index.classList.remove("active");
      });

      index.classList.add("active");
    }
  });
})