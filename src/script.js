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

// Navigation fade animation --------------------------------------------------

const nav = document.querySelector('.nav');

// reduce opacity when the link element is hovered over
nav.addEventListener('mouseover', e => {
  if (e.target.classList.contains('nav__link')) {
    const linkElement = e.target;
    const linkElementSiblings = linkElement
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = linkElement.closest('.nav').querySelector('img');

    // Reduce all opacity and then bring it back on hovered element
    linkElementSiblings.forEach(linkElementSibling => {
      linkElementSibling.style.opacity = 0.5;
    });
    linkElement.style.opacity = 1;
    logo.style.opacity = 0.5;
  }
});

// Bring them back to normal condition when the mouse is out
nav.addEventListener('mouseout', () => {
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(navLink => {
    navLink.style.opacity = 1;
  });

  const logo = document.querySelector('.nav__logo');
  logo.style.opacity = 1;
});

// Sticky navigation when the page is scrolled --------------------------------

// This is very bad for performance, hence should not be used.
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;

  if (entry.isIntersecting === false) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections as we approach them -------------------------------------
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;

  // Guard class to do something only when there is intersection
  if (entry.isIntersecting === false) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images -------------------------------------------------

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;

  // Guard class to do something only when there is intersection
  if (entry.isIntersecting === false) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(imgTarget => {
  imgObserver.observe(imgTarget);
});
