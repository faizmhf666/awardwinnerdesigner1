const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
let timer;

function firstPageAnimation(){

    let tl = gsap.timeline();
    
    tl.from('#nav',{
        y:-10,
        opacity:0,
        ease: Expo.easeInOut,
        duration:1.2,
    }).to('.boundingel',{
        y:0,
        ease: Expo.easeInOut,
        duration:1.2,
        stagger:.2,
    }).from('#herofooter',{
        y:-10,
        opacity:0,
        ease: Expo.easeInOut,
        duration:1.5,
        delay:-1
    })
}
function squishTheCircle(){
    let xscale=1;
    let yscale=1;

    let xprev = 0;
    let yprev=0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timer);
        xscale=gsap.utils.clamp(0.8,1.2,dets.clientX - xprev);
        yscale=gsap.utils.clamp(0.8,1.2,dets.clientY - yprev);
        
        xprev=dets.clientX;
        yprev=dets.clientY;

        circleMouseFollower(xscale, yscale);
        timer = setTimeout(function(){
            document.querySelector('#minicircle').style.transform=`translate(${dets.clientX}px, ${dets.clientY}px ) scale(1,1)`;
        }, 100)
    })
}

squishTheCircle();

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#minicircle').style.transform=`translate(${dets.clientX}px, ${dets.clientY}px ) scale(${xscale}, ${yscale})`;
    })
}

circleMouseFollower();
firstPageAnimation();

document.querySelectorAll(".elem").forEach(function(elem){
    let rotate=0;
    elem.addEventListener("mouseleave", function(dets){
        elem.querySelector("img").style.display='none';
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            duration:0.5,
        })
    })
    elem.addEventListener("mousemove", function(dets){
        let mouseLocationY = dets.clientY - elem.getBoundingClientRect().top
        let mouseLocationX = dets.clientX-rotate
        rotate = dets.clientX
        
        elem.querySelector("img").style.display='block';
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top:mouseLocationY,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,mouseLocationX*0.8)
        })
    })
})
