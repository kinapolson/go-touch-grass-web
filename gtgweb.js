/* menu */
const menu = document.getElementById('menu');
function toggleMenu(x){
  x.classList.toggle('change');
  menu.style.display = (menu.style.display === 'block')?'none':'block';
}


/* assignments.html*/
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