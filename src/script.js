'use strict';

// Modal window ----------------------------------------------------------------
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Function to toggle the hidden class to display/hide the modal window
const openModal = function (e) {
  e.preventDefault(); // To prevent the page scrolling back to the top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Add event listener to all the buttons that have the class

// Replaced for loop with forEach method
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(button => button.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal); // clicking the close modal button
overlay.addEventListener('click', closeModal); //Click outside modal

// Close modal when the escape key is pressed
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling when the button 'learn more' is clicked ----------------------------------------------------------------
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation -----------------------------------------

// # This way of attaching event listener can impact performance
// # Hence a workaround is to use EVENT DELEGATION instead

// document.querySelectorAll('.nav__link').forEach(element =>
//   element.addEventListener('click', e => {
//     e.preventDefault();
//     const id = element.getAttribute('href');
//     // Select element to scroll to from the href attribute
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

// EVENT DELEGATION
// 1. Add event listener to common parent element
// 2. Determine what element origignated the event
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  // matching strategy for selecting on the nav__link
  if (e.target.classList.contains('nav__link')) {
    const elementID = e.target.getAttribute('href');
    document.querySelector(elementID).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component for operations section----------------------------------------------------------------
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

// Using EVENT DELEGATION to add event listeners
tabsContainer.addEventListener('click', e => {
  // matching strategy for selecting on the tabs only
  const clicked = e.target.closest('.operations__tab');

  // Guard class - when no tab is clicked
  if (!clicked) return;

  // Remove class on all tabs and tab content
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(tabContent => {
    tabContent.classList.remove('operations__content--active');
  });

  // Add active class on the selected tab
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
