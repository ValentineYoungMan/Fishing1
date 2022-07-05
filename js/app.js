//Провірка підтримки webp, додавання класу webp або no-webp для HTML
function isWebp() {
    // Провірка підтримки webp
    function testWebP(callback) {

        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Додавання класу _webp або _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}    

isWebp();

//-----------------------------------

function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

//----------------------------------------------
/*
const iconMenu = document.querySelector('.menu-icon');
const headerNav = document.querySelector('.header-nav');

if (iconMenu) {
    
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        headerNav.classList.toggle('_active');
    });
}
*/
//----------------------------------------------

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.header-submenu-icon');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function(e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
            
        }
    }
} else {
    document.body.classList.add('_pc');
}

//--------------------------------------------------------

let headerNavigationElement = document.querySelectorAll('.header-navigation-element')

let header = document.querySelector('.header')

//--------------------------------------------------------

const anchors = document.querySelectorAll('.header-link[href]')

for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const sectionId = anchor.getAttribute('href')
        
        document.querySelector(sectionId).scrollIntoView({
            behavior: "smooth",
            block: 'start',
        })
        
            setTimeout(()=>{
                if(window.pageYOffset != 0){
                    console.log(window.pageYOffset)
                    header.classList.add('_hide');
                }
            }, 1000)
        
        
    })
}
//--------------------------------------------------------

let sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    
    let scrollDistance = window.scrollY;

    sections.forEach((el, i) => {
        if (el.offsetTop - header.clientHeight <= scrollDistance){
            document.querySelectorAll('.header-navigation-element').forEach((el) => {
                if (el.classList.contains('_linkActive')) {
                    el.classList.remove('_linkActive');
                }
            })
            document.querySelectorAll('.header-navigation-element')[i].classList.add('_linkActive');
        }
    })


})

document.addEventListener('scroll', ()=>{
    header.classList.remove('_hide');
})

//--------------------------------------------------------

//menu burger
const iconMenu = document.querySelector('.header-menu-icon');
const menuBody = document.querySelector('.header-sidemenu-container');
if (iconMenu) {
    
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        buttonToTop.classList.toggle('_blocked');
    });
}

document.addEventListener('click', (e) => {
    let current = e.target;
    
    if ((!current.closest('.header-sidemenu-container') && !current.closest('.header-menu-icon')) || current.closest('.header-link') ) {
        menuBody.classList.remove('_active')
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active');
        buttonToTop.classList.remove('_blocked');
    }

})

//-----------------------------------------------------

let about = document.querySelector('.about');

let aboutIncremented = false;

window.addEventListener('scroll', ()=>{
    if(aboutIncremented == false && window.pageYOffset > about.offsetTop/2) {
        aboutCountIncrement()
        aboutIncremented = true;
    }
})

let aboutCountNumberItem = document.querySelectorAll('.about-count-number-item')

function aboutCountIncrement() {

    aboutCountNumberItem.forEach(item => {

        let i = 0;
        let time = 1;
        let num = +item.dataset.number;
        let step = 1000 * time / num;


        item.innerHTML = i;


        let int = setInterval(function () {
            if (i <= num) {
                item.innerHTML = i + '+';
            } else {
                clearInterval(int);
            }
            i++;
        }, step);


    })

}

//------------------------------------------------

let buttonToTop = document.querySelector('.button-toTop')

window.addEventListener('scroll', () => {
    if(window.pageYOffset > header.offsetHeight) {
        buttonToTop.classList.add('_visible')
       // header.classList.remove('_hide')
    } else if(window.pageYOffset <= header.offsetHeight){
        buttonToTop.classList.remove('_visible')
    }
})
