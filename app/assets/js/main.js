// под меню с гамбургером внутри основного меню
if (isElem('.menu-drop')) {
	const menuDrop = document.querySelector('.menu-drop');
	const toggle = menuDrop.querySelector('.menu-drop__toggle');

	toggle.addEventListener('click', function () {
		this.classList.toggle('active');
		menuDrop.classList.toggle('active');
	})

	document.addEventListener('click', function (ev) {
		if (!ev.target.closest('.menu-drop')) {
			if (menuDrop.classList.contains('active')) {
				toggle.classList.remove('active');
				menuDrop.classList.remove('active');
			}
		}
	})
}

//Hamburger
(function () {
	const hamburgerBtn = document.querySelector('.header__hamburger');
	const burgerBlock = document.querySelector('.mobile-menu-wrap');
	const bodyEl = document.querySelector('body');
	const header = document.querySelector('header');

	hamburgerBtn.addEventListener('click', function () {
		this.classList.toggle('active');

		burgerBlock.style.top = header.offsetHeight + 'px';

		let isActive = this.classList.contains('active');
		burgerBlock.classList[isActive ? 'add' : 'remove']('open');
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

// mobile menu
if (isElem('.mobile-menu')) {
	const mobileMenu = broMenu('.bro-menu.mobile-menu');

	mobileMenu.init();
}

// main slider 
if (isElem('.main-slider')) {
	const sliders = document.querySelectorAll('.main-slider');

	for (const slider of sliders) {
		new Swiper(slider, {
			effect: "coverflow",
			speed: 700,
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

//slinky menu
function broMenu(selector) {
	const $menu = typeof selector === "string" ? document.querySelector(selector) : selector;
	const $level_1 = $menu.lastElementChild;
	const $subMenuList = $menu.querySelectorAll('li ul');
	let activated;

	let $activeUl;
	let translate = 0;

	for (let submenu of $subMenuList) {
		const link = submenu.parentElement.firstElementChild;

		_addBtnNext(link);
	}

	const method = {
		init() {
			if (activated) return;

			$menu.classList.add('bro-menu');
			for (let submenu of $subMenuList) {
				const link = submenu.parentElement.firstElementChild;
				link.classList.add('bro-menu__next');

				_addBtnBack(submenu, link);

				activated = true;
			}

			$menu.addEventListener('click', clickHandler);
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
		elem.insertAdjacentHTML('beforeend', `
			${_getSvgBtn()}
		`);
	}

	function _addBtnBack(elem, link) {
		const href = link.getAttribute('href') || "#";

		elem.insertAdjacentHTML('afterbegin', `
			<li>
				<a class="bro-menu__back" href="${href}">
					${_getSvgBtn()}
					${link.textContent}
				</a>
			</li>
		`);
	}

	function _getSvgBtn(classBtn) {
		return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<path d="M12.219 2.281L10.78 3.72 18.062 11H2v2h16.063l-7.282 7.281 1.438 1.438 9-9 .687-.719-.687-.719z" />
</svg>`;
	}

	function _setHeighMenu() {
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

function isElem(selector) {
	return (document.querySelector(selector)) ? true : false;
}
