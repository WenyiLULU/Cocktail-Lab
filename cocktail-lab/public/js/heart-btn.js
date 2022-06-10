const heartBtn = document.querySelector('.heart')
/* when a user clicks, toggle the 'is-animating' class */
heartBtn.addEventListener('click touchstart', ()=> {
    heartBtn.toggleClass('is_animating')
})

  
  /*when the animation is over, remove the class*/
  heartBtn.addEventListener('animationend', ()=> {
    heartBtn.toggleClass('is_animating');
})
  
  