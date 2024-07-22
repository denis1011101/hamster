// Comtext - top
// Passage through the plug
function updateIframeSrc() {
  const iframeElement = document.querySelector('iframe');
  if (iframeElement) {
    let srcValue = iframeElement.getAttribute('src');
    srcValue = srcValue.replace('gWebAppPlatform=weba', 'gWebAppPlatform=android');
    iframeElement.setAttribute('src', srcValue);
  } else {
    console.log('Элемент <iframe> не найден');
  }
}

// Comtext - clicker
// Resize screen for so that the button is in the center
function changeScreenWidthTo500px() {
  document.documentElement.style.width = '500px';
}

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Find the element in the center of the screen
const elementAtCenter = document.elementFromPoint(centerX, centerY)

const energyElement = document.querySelector('.user-tap-energy p');

// Function to get the current energy value
function getCurrentEnergy() {
  const energyText = energyElement.textContent;
  const [current, max] = energyText.split(' / ').map(Number);
  return current;
}

// Function to get the maximum energy value
function getMaxEnergy() {
  const energyText = energyElement.textContent;
  const [current, max] = energyText.split(' / ').map(Number);
  return max;
}

// Modified function for creating and dispatching events to an element
function simulateEvents(element, eventTypes) {
  if (element) {
    // Generate a random number of repetitions from 3 to 5 for all events
    const repeatCount = Math.floor(Math.random() * 3) + 3; // Generates 3, 4 or 5
    console.log(repeatCount);
    eventTypes.forEach(eventType => {
      for (let i = 0; i < repeatCount; i++) {
        let event;
        if (eventType.startsWith('touch')) {
          event = new TouchEvent(eventType, {
            bubbles: true,
            cancelable: true,
            composed: true,
          });
        } else {
          event = new PointerEvent(eventType, {
            bubbles: true,
            cancelable: true,
            composed: true,
          });
        }
        // Dispatch an event to an element
        element.dispatchEvent(event);
      }
    });
  }
}

// Create an array with the types of events we want to simulate
const eventTypes = ['pointerdown', 'pointerup', 'touchmove', 'touchstart', 'click'];

// Function for checking and performing taps
function checkAndTap() {
  const currentEnergy = getCurrentEnergy();
  const maxEnergy = getMaxEnergy();

  if (currentEnergy < 30 || currentEnergy > 100) {
    // We wait until the energy is filled to the maximum
    const waitForMaxEnergy = () => {
      if (getCurrentEnergy() < maxEnergy) {
        setTimeout(waitForMaxEnergy, 1000); // We check every second
      } else {
        // When the energy is filled to the maximum, add a random delay from 10 to 30 seconds
        const randomDelay = Math.random() * (30000 - 10000) + 10000; // From 10 to 30 seconds
        setTimeout(checkAndTap, randomDelay);
      }
    };
    waitForMaxEnergy();
  } else {
    console.log('Energy in the range of 30-100. Current energy:', currentEnergy);
    if (currentEnergy < maxEnergy) {
      const refillDelay = 1000; // Delay for checking energy filling, can be adjusted
      setTimeout(checkAndTap, refillDelay); // We repeat the check after a specified delay
    } else {
      console.log('Energy is filled to the maximum:', maxEnergy);
    }
  }
}

// Let's start the process
checkAndTap();

