// Cache our elements.
var wheel = document.querySelector("#wheel"),
    button = document.querySelector("#button"),
    
    // Initialise a random number variable. As zero.
    rando = 0,
    spinning = false;

// When we click the button...
var spin_wheel = function () {
  // TODO: START SPIN
  if (spinning) return
  spinning = true // to disable multiple click
  // Generate a random number that'll determine how many degrees the wheel spins.
  // We want it to spin 8 times (2880 degrees) and then land somewhere, so we'll add between 0 and 360 degrees to that.
  // We add this to the already-created "rando" variable so that we can spin the wheel multiple times.
  rando += (Math.random() * 360) + 2880;
  
  // And spin the wheel to the random position we just generated!
  // Gotta cover ourselves with vendor prefixes.
  wheel.style.webkitTransform = "rotate(" + rando + "deg)";
  wheel.style.mozTransform = "rotate(" + rando + "deg)";
  wheel.style.msTransform = "rotate(" + rando + "deg)";
  wheel.style.transform = "rotate(" + rando + "deg)";
  
}

var items = [
  {
    name: 'Mr.Burger',
  },
  {
    name: 'Purple Peanut',
  },
  {
    name: 'Goz city',
  },
  {
    name: 'Bowery to Williamsburg',
  },
  {
    name: 'Schnitz',
  },
  {
    name: 'Vanilla Bean',
  },
  {
    name: 'Grill\'d',
  },
  {
    name: 'In a rush',
  },
  {
    name: 'Son of a burger',
  },
  {
    name: 'Lord of the fries',
  },
  {
    name: 'NanDo\'s',
  },
  {
    name: 'Biscuit In',
  },
  {
    name: 'Crisp',
  },
  {
    name: 'Mad Mex',
  },
  {
    name: 'Thailander',
  },
  {
    name: 'FerdyDurke',
  },
  {
    name: 'By Korea',
  },
  {
    name: 'Bread and Meat',
  },
  {
    name: 'Subway',
  },
  {
    name: 'Curry Bowl',
  },
  {
    name: 'Earl Canteen',
  },
  {
    name: 'Red Rooster',
  },
  {
    name: 'Don Don',
  },
  {
    name: 'The Savoy',
  },
]

// GENERATE ANGLE FOR ITEMS, divide angle equally, pass 
function generateAngles(data, firstItemStartAngle = 0) {
  var eachAngle = 360 / data.length
  const newData = []
  data.forEach((item, index) => {
    if (index === 0) {
      newData[index] = {
        from: firstItemStartAngle,
        to: firstItemStartAngle + eachAngle,
        ...item
      }
      return
    }
    var previousItem = newData[index - 1]
    newData[index] = {
      from: previousItem.to,
      to: previousItem.to + eachAngle,
      ...item
    }
  })
  return newData
}
items = generateAngles(items, -7.5)

// CONVERT ANGLE TO ITEM
function getItem(angle) {
  const finalAngle = angle % 360
  return items.find((item) => {
    const newFrom = item.from < 0 ? 360 + item.from : item.from
    const newTo = item.to < 0 ? 360 + item.to : item.to

    if (newFrom > newTo) {
      if ((finalAngle >= newFrom && finalAngle < 360) || (finalAngle >= 0 && finalAngle < newTo)) {
        return item
      }
      return false
    } else {
      if (finalAngle >= newFrom && finalAngle < newTo) {
        return item
      }
      return false
    }

  })
}

button.addEventListener("click", spin_wheel, false);


function onWheelStop() {
  // TODO: SPIN FINISH
  spinning = false // to allow spin again
  alert(getItem(rando).name)
}
wheel.addEventListener("webkitTransitionEnd", onWheelStop);
wheel.addEventListener('mozTransitionEnd', onWheelStop);
wheel.addEventListener('oTransitionEnd', onWheelStop);
wheel.addEventListener('transitionend', onWheelStop);