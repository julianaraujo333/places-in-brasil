const iconMenu = document.querySelector(".nav--icon")
const navMenu = document.querySelector(".nav--menu")


console.log('OK')

iconMenu.addEventListener('click', function(){
	if (navMenu.style.display === 'none' || navMenu.style.display === '') {
		navMenu.style.display = 'block';
		navMenu.style.height = 'auto';
		navMenu.style.opacity = '1';
		iconMenu.setAttribute('aria-expanded', 'true');
		iconMenu.setAttribute('aria-hidden', 'false');
	} else {
		navMenu.style.display = 'none';
		navMenu.style.height = '0';
		navMenu.style.opacity = '0';
		iconMenu.setAttribute('aria-expanded', 'false');
		iconMenu.setAttribute('aria-hidden', 'true');
	}
});


function toggleMenu() {
	if (window.innerWidth > 790) {
		if (navMenu.style.display === 'none' || navMenu.style.display === '') {
			navMenu.style.display = 'flex';
			navMenu.style.height = 'auto';
			navMenu.style.opacity = '1';
			iconMenu.setAttribute('aria-expanded', 'true');
      iconMenu.setAttribute('aria-hidden', 'false');
		} else {
			navMenu.style.display = 'none';
			navMenu.style.height = '0';
			navMenu.style.opacity = '0';
			iconMenu.setAttribute('aria-expanded', 'false');
			iconMenu.setAttribute('aria-hidden', 'true');
		}
	} else {
		navMenu.style.display = 'none';
		navMenu.style.height = '0';
		navMenu.style.opacity = '0';
		iconMenu.setAttribute('aria-expanded', 'false');
		iconMenu.setAttribute('aria-hidden', 'true');
	}
}

toggleMenu();

window.addEventListener('resize', toggleMenu);