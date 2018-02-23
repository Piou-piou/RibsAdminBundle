import RibsCore from 'ribs-core';

document.querySelector('.menu .title i').addEventListener('click', (event) => {
  const inners = document.querySelectorAll('.inner');
  RibsCore.parents(event.currentTarget, '.menu').classList.toggle('active');
  document.querySelector('.nav-page').classList.toggle('displayed-nav');

  Array.from(inners).forEach((element) => {
    element.classList.toggle('displayed-nav')
  });
});

const lis = document.querySelectorAll('.menu ul li');
Array.from(lis).forEach((element) => {
  element.addEventListener('click', (event) => {
    window.location = event.currentTarget.querySelector('a').href;
  });
});