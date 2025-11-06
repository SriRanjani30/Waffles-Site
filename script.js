const header = document.getElementById('ShopName');

function getRandomColor(){
    const r=Math.floor(Math.random()*256);
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);

    return `rgb(${r}, ${g}, ${b})`;
}
const cards = document.querySelectorAll('.product-card');

cards.forEach(card =>{
setInterval(()=>{
        const randomColor = getRandomColor();
        card.style.backgroundColor = randomColor;
}, 2000);
});

header.addEventListener('mouseover', function(){
    const randomTextColor = getRandomColor();
    const randomBackgroundColor = getRandomColor();
    header.style.color=randomTextColor;
    document.body.style.backgroundColor=randomBackgroundColor;
});

header.addEventListener('mouseout', function(){
    header.style.color='blue';
    document.body.style.backgroundColor= '#f0f0f0';
});

window.addEventListener('load', function(){
    const message = document.getElementById('WelcomeMessage');
    message.textContent = "Welcome to Electronic Shop!";

    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
    }, 200);

    setTimeout(() =>{
        message.style.opacity='0';
        message.style.transform = 'translateY(-20px)';
    }, 3000);


});

cards.forEach(card => {
    card.addEventListener('mouseover',() =>{
    const randomColor = getRandomColor();
    card.style.backgroundColor = randomColor;

});

card.addEventListener('mouseout',()=>{
    card.style.backgroundColor='white';
});
});

window.addEventListener("scroll", () => {
  const footer = document.getElementById("footer");
  if (!footer) return; // safety check

  const scrollY = window.scrollY + window.innerHeight;
  const documentHeight = document.body.scrollHeight;

  if (scrollY >= documentHeight - 50) {
    footer.classList.add("visible");
  } else {
    footer.classList.remove("visible");
  }
});
