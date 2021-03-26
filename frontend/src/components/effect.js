import { resetRender } from './../utils';
	// slide
	export function slide (box, boxSlide, slides) {
		let index = 1;
		let slideId;
		const firstImg = slides[0].cloneNode(true);
		const lastImg = slides[slides.length - 1].cloneNode(true);
		boxSlide.append(firstImg);
		boxSlide.prepend(lastImg);

		firstImg.id = 'first';
		lastImg.id = 'last';

		let widthImg = slides[index].clientWidth;
		boxSlide.style.transform = `translateX(${-widthImg * index}px)`;

		const runSlide = () => {
			slideId = setInterval(() => {
				moveNextToSlide();
			}, 3000);
		}

		boxSlide.addEventListener('transitionend', () => {
			const slides = document.querySelectorAll('.slide');

			// const slides = $$('.slide');
			if(slides[index].id === firstImg.id){
				boxSlide.style.transition = 'none';
				index = 1;
				boxSlide.style.transform = `translateX(${-widthImg * index}px)`
			}

			if(slides[index].id === lastImg){
				boxSlide.style.transition = 'none';
				index = slides.length - 2;
				boxSlide.style.transform = `translateX(${-widthImg * index}px)`;
			}

		});

		function moveNextToSlide () {
			const slides = $('.slide');
			if(index >= slides.length - 1){
				return;
			}
			index++;
			boxSlide.style.transition = `0.5s linear`;
			boxSlide.style.transform = `translateX(${-widthImg * index}px)`;
		}

		function movePrevToSlide () {
			if(index <= 0){
				return;
			}
			index--;
			boxSlide.style.transition = `0.5s linear`;
			boxSlide.style.transform = `translateX(${-widthImg * index}px)`;

		}

		box.addEventListener('mouseenter', () => {
			clearInterval(slideId);
		})

		box.addEventListener('mouseleave', runSlide);
		const btnPrev = document.querySelector('.btn-prev');
		const btnNext = document.querySelector('.btn-next');
		btnPrev.addEventListener('click', moveNextToSlide);
		btnNext.addEventListener('click', movePrevToSlide);
	}

	
	// option quantity product
	export const optionQuantityProduct = (btnMinus, btnPlus, valueQuantity, selectInput, selectMinus, component, position) => {
		const updateQuantityAndRender = (_this) => {
			const dataPrd = JSON.parse(localStorage.getItem('prdInCart'));
			const idPrd = (_this.parentElement).dataset.id;
			const classElement = _this.classList.contains('btn-plus');
			
			if(dataPrd.length > 1) {
				dataPrd.forEach(product => {
					if(product.id == idPrd){
						if(classElement){
							product.quantity += 1;
							localStorage.setItem('prdInCart', JSON.stringify(dataPrd));
							resetRender(component, position);
						} else {
							product.quantity -= 1;
							localStorage.setItem('prdInCart', JSON.stringify(dataPrd));
							resetRender(component, position);
						}
					}
				})
			} else if (dataPrd.length <= 1) {
				console.log('oko');
			}
		}
		
		const checkValueInput = (valueInput, it) => {
			if(valueInput > 1) {
				it.classList.remove('disable');
			} else {
				it.classList.add('disable');
			}
		}
	
		if(Array.isArray(btnMinus) && Array.isArray(btnPlus)) {
			btnMinus.forEach(minus => {
				minus.addEventListener('click', function (e) {
					e.preventDefault();
					const input = this.parentElement.querySelector(selectInput);
					input.value = parseInt(input.value) - 1; 
					updateQuantityAndRender(this);
					checkValueInput(parseInt(input.value), this);
				})
			})

			btnPlus.forEach(plus => {
				plus.addEventListener('click', function (e) {
					e.preventDefault();
					const input = this.parentElement.querySelector(selectInput);
					const buttonMinus = this.parentElement.querySelector(selectMinus);
					input.value = parseInt(input.value) + 1; 
					updateQuantityAndRender(this);
					checkValueInput(parseInt(input.value), buttonMinus);
				})
			})
		} else {
			btnMinus.addEventListener('click', (e) => {
				valueQuantity.value = parseInt(valueQuantity.value) - 1; 
				checkValueInput(parseInt(valueQuantity.value), btnMinus);
			})
	
			btnPlus.addEventListener('click', (e) => {
				valueQuantity.value = parseInt(valueQuantity.value) + 1; 
				checkValueInput(parseInt(valueQuantity.value), btnMinus);
			})
		}
	}


 