/* menu */  
const menu = document.getElementById('menu');
function toggleMenu(x){
  x.classList.toggle('change');
  menu.style.display = (menu.style.display === 'block')?'none':'block';
}


/* homepage.html */
    /* slideshow */
/*
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
*/

/* trails.html */
function openPark(id) {
  document.querySelectorAll('.trail-section').forEach(sec => sec.style.display = 'none');
  const active = document.getElementById(id);
  active.style.display = 'block';
  window.scrollTo(0, 0);

  if (id === 'eola') {
      const wrapper = document.getElementById("eola-thinglink");
      if (!wrapper.dataset.loaded) {
          wrapper.innerHTML = `
              <iframe
                  width="960"
                  height="480"
                  data-original-width="8000"
                  data-original-height="4000"
                  src="https://www.thinglink.com/view/scene/2036229862762480102"
                  type="text/html"
                  style="border: none;"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                  scrolling="no">
              </iframe>
          `;
          wrapper.dataset.loaded = "true";
      }
  } else if (id === 'arboretum') {
    const wrapper = document.getElementById("arb-thinglink");
      if (!wrapper.dataset.loaded) {
          wrapper.innerHTML = `
              <iframe 
                width="960" 
                height="480" 
                data-original-width="11968" 
                data-original-height="5984" 
                src="https://www.thinglink.com/view/scene/2050048994620474021" 
                type="text/html" 
                style="border: none;" 
                webkitallowfullscreen 
                mozallowfullscreen 
                allowfullscreen scrolling="no">
              </iframe>
          `;
          wrapper.dataset.loaded = "true";
      }
  } 
}
 
function switchTab(event, tabId) {
    const sec = event.target.closest('.trail-section');
  
    sec.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    sec.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}


/* achievements.html*/
const allDetails = document.querySelectorAll('details');
const popup = document.getElementById('popup');
const badgeImage = document.getElementById('badgeImage');
const message = document.getElementById('message');
const progressBar = document.getElementById('progressBar');

const checkboxes = [...document.querySelectorAll('details input[type="checkbox"]')];
const badges = {};
allDetails.forEach(d=>{
  const id = d.id;
  const img = "https://upload.wikimedia.org/wikipedia/commons/4/4c/Generic-gold-badge-icon.png"; // unified image
  const name = d.querySelector('summary').textContent.trim();
  badges[id] = {name,img};
});

window.addEventListener('load',()=>{
  checkboxes.forEach(box=>{
    const id = box.closest('details').id;
    const saved = localStorage.getItem(id);
    const date = localStorage.getItem(id+'_date');
    if(saved==='true'){
      box.checked=true;
      if(date) box.closest('details').querySelector('.badge-date').textContent="Completed on: "+date;
    }
  });
  updateProgressBar();
});

checkboxes.forEach(box=>{
  box.addEventListener('change',()=>{
    const id = box.closest('details').id;
    localStorage.setItem(id,box.checked);
    updateProgressBar();
    if(box.checked){
      const date=new Date().toLocaleDateString();
      localStorage.setItem(id+'_date',date);
      box.closest('details').querySelector('.badge-date').textContent="Completed on: "+date;
      const b=badges[id];
      badgeImage.src=b.img;
      message.textContent=`You just completed the "${b.name}" badge! 🎖️`;
      popup.style.display='flex';
    }
  });
});

function closePopup(){popup.style.display='none';}
function updateProgressBar(){
  const total=checkboxes.length;
  const done=checkboxes.filter(b=>b.checked).length;
  const pct=Math.round((done/total)*100);
  if (progressBar) {
    progressBar.style.width=pct+'%';
    progressBar.textContent=pct+'%';
  }
  localStorage.setItem('progress',pct);
}

/* trails.html */
function printImage(src) {
  const win = window.open('', '_blank'); 
  win.document.write(`
      <html>
          <head>
              <title>Print Image</title>
          </head>
          <body onload="window.print(); window.close();">
              <img src="${src}" style="width: 100%;">
          </body>
      </html>
  `);
  win.document.close();
}