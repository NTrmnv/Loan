import Slider from "./slider";

export default class MiniSlider extends Slider{
    constructor(container, prev, next, activeClass, animate, autoplay){
        super(container, prev, next, activeClass, animate, autoplay);
    }

    decorizeSlides(){
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animate){
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if(!this.slides[0].closest('button')){
            this.slides[0].classList.add(this.activeClass);
        }

        if(this.animate){
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlides() {
        for (let i = 1; i < this.slides.length; i++) {
			if (this.slides[i].tagName !== "BUTTON") {
				this.container.appendChild(this.slides[0]);
				this.decorizeSlides();
				break;
			} else {
				this.container.appendChild(this.slides[i]);
				i--;
			}
		}
    }

    bindTriggers(){
        this.next.addEventListener('click', () => this.nextSlides());

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--){
                if(this.slides[i].tagName !== "BUTTON"){
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }else {
                    this.container.appendChild(this.slides[i]);
                    i--;
                }
            }
        });
    }

    autoplaySlides() {
        let autoplay = setInterval(() => {
			this.nextSlides();
		}, 5000);

        const slidesField = document.querySelector('.modules__content-slider'),
            btnNext = document.querySelector('.slick-next'),
            btnPrev = document.querySelector('.slick-prev');

        slidesField.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
        slidesField.addEventListener('mouseleave', () => {
            this.autoplaySlides();
        });
        btnNext.addEventListener('click', () => {
            clearInterval(autoplay);
        });
        btnPrev.addEventListener('click', () => {
            clearInterval(autoplay);
        });        
    }

    init(){
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;
            this.bindTriggers();
            this.decorizeSlides();
        
            if(this.autoplay){
                this.autoplaySlides();
            }
        } catch (e){}
    }
}