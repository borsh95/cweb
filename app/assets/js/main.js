/*****
INITIALIZATION PLUGIN
******/
// mobile menu
if (isElem('.mobile-menu')) {
	const mobileMenu = document.querySelector('.mobile-menu');

	broMenu(mobileMenu).init();
}

if (isElem('.services-menu')) {
	const servicesMenu = document.querySelector('.services-menu');

	broMenu(servicesMenu, {
		arrow: `
		<svg width="25" height="25" viewBox="0 0 19 19">
		<path d="M0.735916 9.50004C0.735916 4.65975 4.65975 0.735918 9.50004 0.735918C14.3403 0.735918 18.2642 4.65975 18.2642 9.50004C18.2642 14.3403 14.3403 18.2642 9.50004 18.2642C4.65975 18.2642 0.735916 14.3403 0.735916 9.50004Z" fill="inherit"/>
		<path d="M0 9.5C0 14.7379 4.26138 19 9.5 19C14.7379 19 19 14.7379 19 9.5C19 4.26138 14.7379 0 9.5 0C4.26138 0 0 4.26138 0 9.5ZM17.5283 9.5C17.5283 13.927 13.927 17.5283 9.5 17.5283C5.07304 17.5283 1.47172 13.927 1.47172 9.5C1.47172 5.07304 5.07378 1.47172 9.5 1.47172C13.927 1.47172 17.5283 5.07304 17.5283 9.5Z" fill="inherit"/>
		<path d="M7.45432 5.29824C7.1688 5.58525 7.1688 6.04881 7.45432 6.33582L10.6112 9.49267L7.45432 12.6495C7.19014 12.9579 7.22621 13.4229 7.53451 13.6871C7.80971 13.9233 8.21666 13.9233 8.49186 13.6871L12.1712 10.0078C12.4567 9.72079 12.4567 9.25722 12.1712 8.97021L8.49186 5.29089C8.20267 5.00756 7.73909 5.01053 7.45432 5.29824Z" fill="currentColor"/>
		</svg>
		`
	}).init();
}

if (isElem('.b-tabs')) {
	const tabs = document.querySelectorAll('.b-tabs');

	for (const tab of tabs) {
		bTabs(tab);
	}
}

if (isElem('.accardion')) {
	const accardions = document.querySelectorAll('.accardion');
	const accardionPlagin = accardion();

	for (const item of accardions) {
		accardionPlagin().init(item);
	}
}

/*****
CUSTOM PLUGIN
******/
//Hamburger
(function () {
	const hamburgerBtn = document.querySelector('.header__hamburger');
	const burgerBlock = document.querySelector('.mobile-menu-wrap');
	const burgerInner = burgerBlock.querySelector('.mobile-menu-container');
	const bodyEl = document.querySelector('body');
	const header = document.querySelector('header');

	hamburgerBtn.addEventListener('click', function () {
		this.classList.toggle('active');

		burgerBlock.style.top = header.offsetHeight - 1 + 'px';

		let isActive = this.classList.contains('active');
		burgerBlock.classList[isActive ? 'add' : 'remove']('open');
		burgerInner.style.maxHeight = (isActive) ? `calc(100vh - ${header.offsetHeight}px)` : '';
		bodyEl.style.overflow = (isActive) ? 'hidden' : '';
	});

	window.addEventListener('resize', function () {
		if (window.innerWidth > 970 && burgerBlock.classList.contains('open')) {
			hamburgerBtn.classList.remove('active');
			burgerBlock.classList.remove('open');
			bodyEl.style.overflow = '';
		}
	});

	burgerBlock.addEventListener('click', function (e) {
		if (!e.target.contains(burgerBlock)) return;

		hamburgerBtn.classList.remove('active');
		burgerBlock.classList.remove('open');
		bodyEl.style.overflow = '';
	});
}());

//fixed header
if (isElem('header')) {
	let fixedHeader = showHeader('header');

	function showHeader(el) {
		const $el = (typeof el === 'string') ? document.querySelector(el) : el;
		const htmlEl = document.documentElement;
		let offsetTopEl = $el.getBoundingClientRect().height;

		window.addEventListener('scroll', function () {
			if (window.pageYOffset > offsetTopEl + 20) {
				show();
			} else {
				fixed();
			}
		})

		window.onresize = function () {
			offsetTopEl = $el.getBoundingClientRect().height;
		}

		function show() {
			if ($el.classList.contains('fixed')) return;

			if (window.innerWidth > 1024) {
				htmlEl.style.paddingTop = $el.offsetHeight + "px";
			} else {
				htmlEl.style.paddingTop = $el.offsetHeight + "px";
			}


			$el.classList.add('fixed');
		}

		function fixed() {
			if (!$el.classList.contains('fixed')) return;

			$el.classList.remove('fixed');
			htmlEl.style.paddingTop = '';
		}

		return {
			show,
			fixed,
		}
	}
}

// под меню с гамбургером внутри основного меню
if (isElem('.menu-drop')) {
	const menuDrop = document.querySelector('.menu-drop');
	const toggle = menuDrop.querySelector('.menu-drop__toggle');
	const linkbtn = menuDrop.querySelector('.menu-drop__toggle ~ .menu__link');

	toggle.addEventListener('click', function () {
		this.classList.toggle('active');
		menuDrop.classList.toggle('active');
	});

	linkbtn.addEventListener('click', function (e) {
		e.preventDefault();
		toggle.classList.toggle('active');
		menuDrop.classList.toggle('active');
	});

	document.addEventListener('click', function (ev) {
		if (!ev.target.closest('.menu-drop')) {
			if (menuDrop.classList.contains('active')) {
				toggle.classList.remove('active');
				menuDrop.classList.remove('active');
			}
		}
	})
}

// main slider 
if (isElem('.main-slider')) {
	const sliders = document.querySelectorAll('.main-slider');

	for (const slider of sliders) {
		new Swiper(slider, {
			effect: "coverflow",
			speed: 700,
			autoHeight: true,
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			},
			navigation: {
				nextEl: slider.parentElement.querySelector('.slider-arr--next'),
				prevEl: slider.parentElement.querySelector('.slider-arr--prev'),
			},
		});
	}
}

// band slider
if (isElem('.band-slider')) {
	const sliderBand = document.querySelector('.band-slider');

	const swiper = new Swiper(sliderBand, {
		grabCursor: true,
		loop: true,
		slidesPerView: "auto",
		spaceBetween: 32,
		slideToClickedSlide: true,
		centeredSlides: true,
		speed: 500,

		breakpoints: {
			320: {
				spaceBetween: 10,
			},
			769: {
				slidesPerView: "auto",
				spaceBetween: 20,
			},
			1071: {
				slidesPerView: 3,
			},
			1221: {

			}
		},
		navigation: {
			nextEl: sliderBand.parentElement.querySelector('.slider-arr--next'),
			prevEl: sliderBand.parentElement.querySelector('.slider-arr--prev'),
		}
	});

	swiper.on('resize', function () {
		swiper.update();
	})
}

// reviews slider
if (isElem('.reviews-slider')) {
	const reviewsSlider = document.querySelector('.reviews-slider');

	const swiper = new Swiper(reviewsSlider, {
		loop: true,
		spaceBetween: 80,
		speed: 500,
		speed: 700,
		effect: "coverflow",
		speed: 700,
		coverflowEffect: {
			rotate: 30,
			stretch: -50,
			slideShadows: false,
		},

		breakpoints: {
			320: {

			},
			769: {

			},
			1071: {
			},
			1221: {

			}
		},
		navigation: {
			nextEl: reviewsSlider.parentElement.querySelector('.slider-arr--next'),
			prevEl: reviewsSlider.parentElement.querySelector('.slider-arr--prev'),
		},
		pagination: {
			el: reviewsSlider.parentElement.querySelector('.slider-pagination'),
			clickable: true,
		},
	});
}

if (isElem('.clients-slider')) {
	const slider = document.querySelector('.clients-slider');

	new Swiper(slider, {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 24,
		slideToClickedSlide: true,
		speed: 500,
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			769: {
				slidesPerView: 2,
			},
			1071: {
				slidesPerView: 3,
			}
		},
		navigation: {
			nextEl: slider.parentElement.querySelector('.slider-arr--next'),
			prevEl: slider.parentElement.querySelector('.slider-arr--prev'),
		},
		pagination: {
			el: slider.parentElement.querySelector('.slider-pagination'),
			clickable: true,
		},
	})
}

if (isElem('.info-slider')) {
	new Swiper('.info-slider', {
		enabled: false,
		slidesPerView: 1,
		spaceBetween: 100,
		breakpoints: {
			320: {
				enabled: true
			},
			1071: {
				enabled: false
			}
		},
		pagination: {
			el: document.querySelector('.info-slider-wrap .slider-pagination'),
			clickable: true,
		}
	})
}

if (isElem(".twenty-b")) {
	$(".twenty-b").twentytwenty();
}

if (isElem('.gallery-slider')) {
	const slider = document.querySelector('.gallery-slider');

	const swiper = new Swiper(slider, {
		enabled: false,
		spaceBetween: 30,
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 60,
				enabled: true,
			},
			769: {
				enabled: true,
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 30,
			},
			1071: {
				spaceBetween: 0,
				enabled: false,
			},
		},
		pagination: {
			el: slider.parentElement.querySelector('.slider-pagination'),
			clickable: true,
		}
	});

	swiper.on('resize', function () {
		swiper.update();
	});
}

if (isElem('.examples-work-slider')) {
	const sliderEl = document.querySelector('.examples-work-slider');

	const swiper = new Swiper(sliderEl, {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 32,
		autoHeight: true,
		breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1,
			},
			769: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			1071: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			}
		},
		navigation: {
			prevEl: sliderEl.parentElement.querySelector('.slider-arr--prev'),
			nextEl: sliderEl.parentElement.querySelector('.slider-arr--next'),
		},
		pagination: {
			el: sliderEl.parentElement.querySelector('.slider-pagination'),
			clickable: true,
		}
	})
}

// if (isElem('header .menu')) {
// 	const $menu = document.querySelector('header .header__nav');
// 	const menu = broMenu($menu);

// 	toggleMenu();

// 	window.addEventListener('resize', toggleMenu);

// 	function toggleMenu() {
// 		if (window.innerWidth < 1025) {
// 			console.log(23)
// 			menu.init();
// 		} else {
// 			menu.destroy();
// 		}
// 	}
// }

// обработка событий на кнопок сайта
// которые имеют атрибут data-btn-type
if (isElem('[data-btn-type]')) {
	document.addEventListener('click', function (e) {
		if (!e.target.closest('[data-btn-type]')) {
			document.querySelector('[data-btn-type="toggleClass"].active')
				&& document.querySelector('[data-btn-type="toggleClass"].active').classList.remove('active');
		}

		if (e.target.closest('[data-btn-type]')) {
			const btn = e.target.closest('[data-btn-type]');

			if (btn.dataset.btnType === 'toggleClass') {
				if (document.querySelector('[data-btn-type="toggleClass"].active')) {
					document.querySelector('[data-btn-type="toggleClass"].active').classList.remove('active');
				}

				btn.classList.toggle('active');
			}
		}
	});
}

if (isElem('.drop')) {
	const dropElList = document.querySelectorAll('.drop');

	for (const dropEl of dropElList) {
		dropdown(dropEl);
	}
}

//показ окна статистики к блоке кейса
if (isElem('.service-tool')) {
	let lastOpenEl;

	document.addEventListener('click', function (e) {
		const btn = e.target.closest('.service-tool__btn');

		if (lastOpenEl && lastOpenEl.classList.contains('active')) {
			lastOpenEl.classList.remove('active');
			lastOpenEl = null;
		}

		if (btn) {
			btn.classList.toggle('active');
			lastOpenEl = btn;
		}
	})
}

//v-modal
if (document.querySelector('.v-modal')) {
	const modalEl = document.querySelector('.v-modal');
	const body = document.querySelector('body');
	const typeOpen = "openModal";
	const typeClose = 'closeModal';

	document.addEventListener('click', function (e) {
		const btn = e.target.closest('[data-button-type]');
		if (btn && btn.dataset.buttonType === typeOpen) {

			const scrollBarWidth = window.innerWidth - body.offsetWidth;

			e.preventDefault();
			modalEl.classList.add('active');

			body.style.overflow = 'hidden';
			body.style.paddingRight = scrollBarWidth + "px";
		}
		else if (e.target.classList.contains('v-modal__inner') || e.target.dataset.buttonType === typeClose) {
			modalEl.classList.remove('active');
			body.style.overflow = '';
			body.style.paddingRight = "";
		}
	});
}

// v-up кнопка вверх
(function () {
	document.querySelector('body').insertAdjacentHTML('afterbegin', `
		<div class="v-up"></div>
	`);

	const btnDown = document.querySelector('.v-up');
	let vUpTriggerTimer = 0;

	vUp(btnDown, getScroledWindow);

	btnDown.addEventListener('click', function () {
		backToTop(-45, 0);
	});

	window.addEventListener('scroll', function () {
		clearTimeout(vUpTriggerTimer);
		vUpTriggerTimer = setTimeout(() => {
			vUp(btnDown, getScroledWindow);
		}, 200)
	});

	//пролистываине окна вверх при клике на кнопку
	function vUp(btn, scroled) {
		if (scroled() > (document.documentElement.clientHeight / 2)) {
			btn.classList.add('active');
		} else if (scroled() < (document.documentElement.clientHeight / 2) || btn.classList.contains('active')) {
			btn.classList.remove('active');
		}
	}

	//прокрутка окна вверх вниз
	function backToTop(interval, to) {
		if (window.pageYOffset <= to) return;

		window.scrollBy(0, interval);
		setTimeout(() => {
			backToTop(interval, to)
		}, 0);
	}

	//на сколько прокручено окно
	function getScroledWindow() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}
}());


if (isElem('.portfolio-b')) {
	const filterCard = document.querySelectorAll('.portfolio-b .work-card');

	document.querySelector('.portfolio-b__categories').addEventListener('click', function (e) {
		const filterBtn = e.target.closest('[data-f]');

		if (filterBtn) {
			if (filterBtn.classList.contains('active')) return;

			document.querySelector('[data-f].active').classList.remove('active');
			filterBtn.classList.add('active');

			const filterClass = 'f-' + e.target.dataset['f'];

			for (const card of filterCard) {
				card.classList.remove('hide');

				if (!card.classList.contains(filterClass) && filterClass !== 'f-all') {
					card.classList.add('hide');
				}
			}
		}
	});

}
/*****
FUNCTION PLUGIN
******/
//slinky menu
function broMenu(selector, options) {
	const $menu = typeof selector === "string" ? document.querySelector(selector) : selector;
	const $level_1 = $menu.lastElementChild;
	const $subMenuList = $menu.querySelectorAll('li ul');
	let activated;

	let defaulOptions = {
		arrow: `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M12.219 2.281L10.78 3.72 18.062 11H2v2h16.063l-7.282 7.281 1.438 1.438 9-9 .687-.719-.687-.719z" />
			</svg>
		`
	}

	Object.assign(defaulOptions, options);

	let $activeUl;
	let translate = 0;

	const method = {
		init() {
			if (activated) return;

			for (let submenu of $subMenuList) {
				const link = submenu.parentElement.firstElementChild;

				_addBtnNext(link);
			}

			$menu.classList.add('bro-menu');
			for (let submenu of $subMenuList) {
				const link = submenu.parentElement.firstElementChild;
				link.classList.add('bro-menu__next');

				_addBtnBack(submenu, link);

				activated = true;
			}

			$menu.addEventListener('click', clickHandler);

			window.addEventListener('resize', _setHeighMenu);
		},

		destroy() {
			if (!activated) return;

			const btnBack = $menu.querySelectorAll('.bro-menu__back');
			translate = 0;

			$level_1.style.transform = `translateX(0px)`;

			$menu.removeEventListener('click', clickHandler);

			for (btn of btnBack) {
				btn.remove();
			}

			if ($activeUl) $activeUl.classList.remove('active');
			$menu.classList.remove('bro-menu');
			$menu.style.height = "";

			activated = false;
		}
	}

	function clickHandler(e) {
		const target = e.target;

		if (target.closest('.bro-menu__next')) {
			e.preventDefault();

			const $nestedMenu = target.closest('li').querySelector('ul');

			if ($activeUl) $activeUl.classList.remove('active');

			$nestedMenu.classList.add('active');
			$nestedMenu.style.visibility = 'visible';
			translate -= 100;

			$level_1.style.transform = `translateX(${translate}%)`;
			$activeUl = $nestedMenu;

			scrollToVisible($activeUl);
			_setHeighMenu();
		}
		else if (target.closest('.bro-menu__back')) {
			e.preventDefault();

			const $upperMenu = $activeUl.parentElement.closest('ul');
			$upperMenu.classList.add('active');

			$activeUl.style.visibility = '';

			translate += 100;

			$level_1.style.transform = `translateX(${translate}%)`;
			$activeUl.classList.remove('active');
			$activeUl = $upperMenu;
			_setHeighMenu();
		}
	}

	function _addBtnNext(elem) {
		elem.classList.add('link')
		elem.insertAdjacentHTML('beforeend', `
			${defaulOptions.arrow}
		`);
	}

	function _addBtnBack(elem, link) {
		const href = link.getAttribute('href');

		elem.insertAdjacentHTML('afterbegin', `
			<li>
				<a class="bro-menu__back" ${(href) ? `href=${href}` : ''}>
					${defaulOptions.arrow}
					${link.textContent}
				</a>
			</li>
		`);
	}

	function _setHeighMenu() {
		if (!$activeUl) return;

		$menu.style.height = $activeUl.offsetHeight + "px";
	}

	function scrollToVisible(el) {
		if (_getPosAbsWindow(el) > window.pageYOffset) return;

		backToTop(-10, _getPos(el));
	}

	function _getPosAbsWindow(elem) {
		const offsetTop = elem.getBoundingClientRect().top;

		return offsetTop - window.pageYOffset;
	}

	function _getPos(el) {
		return el.getBoundingClientRect().top + window.pageYOffset;
	}

	function backToTop(interval, to) {
		if (window.pageYOffset <= to) return;

		window.scrollBy(0, interval);
		setTimeout(() => {
			backToTop(interval, to)
		}, 0);
	}

	return method;
}

//accardion
function accardion() {
	return function () {
		let _mainElement = {}, // .accordion 
			_items = {}; // .accordion-item 
		headerDom = document.querySelector('header');

		return {
			init: function (element) {
				_mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
				_items = _mainElement.querySelectorAll('.accardion__item');
				_setupListeners(_mainElement, 'click', _clickHandler);
			}
		}

		function _clickHandler(e) {
			if (!e.target.closest('.accardion__item-header')) return;

			e.preventDefault();

			let header = e.target.closest('.accardion__item-header'),
				item = header.closest('.accardion__item'),
				itemActive = _getItem(_items, 'open');

			if (itemActive === undefined) {
				item.classList.add('open');
			} else {
				itemActive.classList.remove('open');

				if (itemActive !== item) {
					item.classList.add('open');

					scrollToVisible(item);
				}
			}
		}
	}

	function _setupListeners(elem, event, handler) {
		elem.addEventListener(event, handler);
	}

	function scrollToVisible(el) {
		if (_getPos(el) > window.pageYOffset) return;
		backToTop(-10, _getPos(el) - headerDom.offsetHeight - 30);
	}

	function _getPos(el) {
		return el.getBoundingClientRect().top + window.pageYOffset;
	}

	function _getItem(elements, className) {
		var element = undefined;
		elements.forEach(function (item) {
			if (item.classList.contains(className)) {
				element = item;
			}
		});
		return element;
	};

	function backToTop(interval, to) {
		if (window.pageYOffset <= to) return;

		window.scrollBy(0, interval);
		setTimeout(() => {
			backToTop(interval, to)
		}, 0);
	}
}

// bTabs
function bTabs(target) {
	let _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
		_eventTabsShow,
		_showTab = function (tabsLinkTarget) {
			var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
			tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
			tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.b-tabs__link.active');
			tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.b-tabs__pane.active');
			// если следующая вкладка равна активной, то завершаем работу
			if (tabsLinkTarget === tabsLinkActive) return;
			// удаляем классы у текущих активных элементов
			if (tabsLinkActive !== null) tabsLinkActive.classList.remove('active');

			if (tabsPaneShow !== null) tabsPaneShow.classList.remove('active');
			// добавляем классы к элементам (в завимости от выбранной вкладки)
			tabsLinkTarget.classList.add('active');
			tabsPaneTarget.classList.add('active');
			document.dispatchEvent(_eventTabsShow);
		},
		_switchTabTo = function (tabsLinkIndex) {
			var tabsLinks = _elemTabs.querySelectorAll('.b-tabs__link');
			if (tabsLinks.length > 0) {
				if (tabsLinkIndex > tabsLinks.length) {
					tabsLinkIndex = tabsLinks.length;
				} else if (tabsLinkIndex < 1) {
					tabsLinkIndex = 1;
				}
				_showTab(tabsLinks[tabsLinkIndex - 1]);
			}
		};

	_eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

	_elemTabs.addEventListener('click', function (e) {
		var tabsLinkTarget = e.target;
		// завершаем выполнение функции, если кликнули не по ссылке
		if (!tabsLinkTarget.classList.contains('b-tabs__link')) return;

		e.preventDefault();
		_showTab(tabsLinkTarget);
	});

	return {
		showTab: function (target) {
			_showTab(target);
		},
		switchTabTo: function (index) {
			_switchTabTo(index);
		}
	}

};

//dropdown
function dropdown(selector) {
	const $el = typeof selector === 'string' ? document.querySelector(selector)
		: selector,
		$btn = $el.querySelector('.drop-btn'),
		$content = $el.querySelector('.drop-content');

	$btn.addEventListener('click', function () {
		$el.classList.toggle('open');

		if ($el.classList.contains('open')) {
			$content.style.minHeight = $content.scrollHeight + 'px';
			setTimeout(function () {
				$content.style.overflow = 'visible';
			}, 320)
		} else {
			$content.style.minHeight = '';
			$content.style.overflow = '';
		}
	});

	window.addEventListener('resize', function () {
		if ($el.classList.contains('open')) {
			$content.style.minHeight = '';
			$content.style.minHeight = $content.scrollHeight + 'px';
		}
	})
}

/*****
UTILS
******/
function isElem(selector) {
	return (document.querySelector(selector)) ? true : false;
}
