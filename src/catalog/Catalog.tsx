
let Catalog: Elerium.BigPicture.catalogList = {

	bigBlock: {
		name: "This is my homepage. Few words about me:",
		nameRus: "Добро пожаловать на мою страницу",
		english: `
		
			<p class="about">
			I am frontend developer with over five years of experience in web development.
			Three of them in outsourcing companies where I worked with USA and EU based teams,
			creating web solutions for E-Commerce projects.
			I am fluent English speaker, experienced in working in group and familiar with working process
			from planning to testing/supporting. I'm looking forward to work on interesting and challenging
			projects and always open to learning new technologies.
			</p>
		`,
		russian: `
		
			<p class="about">
				Я frontend developer с пятилетним опытом.
				Три года из них проработал в сфере аутсорсинга создавая и поддерживая проекты для E-Commerce.
				У меня богатый опыт работы в команде и разработке от проектирования до тестирования и поддержки.
				Я открыт к изучению новых технологий и хочу работать на интересных проектах, где можно профессионально расти.
			</p>

		`,
		isBig: true
	},

	phasergame: {
		name: "Phaser Game Demo",
		nameRus: "Игра на Phaser",
		english: "Simple html5 game demo.<br />Desktop, Javascript, Phaser.io",
		russian: "Простая игра на хтмл 5.<br />Desktop, Javascript, Phaser.io",
		details: "phasergame",
		image: "pg.jpg",
		open: "http://elerium.org/phaser/"
	},

	piximap: {
		name: "Pixi Map Demo",
		nameRus: "Динамическая карта",
		english: "Desktop, Javascript, Canvas, Pixi.js",
		russian: "Desktop, Javascript, Canvas, Pixi.js",
		details: "piximap",
		image: "pm.jpg",
		open: "http://elerium.org/map/"
	},

	skydemo: {
		name: "Animation Demo",
		english: "Web animation.<br /> Desktop/Mobile, Javascript, Canvas, Pixi.js",
		russian: "Программная анимация.<br /> Desktop/Mobile, Javascript, Canvas, Pixi.js",
		details: "skydemo",
		image: "sd.jpg",
		open: "http://elerium.org/sky3/"
	},

	walker: {
		name: "Unity Web App Demo",
		english: "Walker Demo.<br /> Desktop, C#, WebGL Unity",
		russian: "Walker Demo.<br /> Desktop, C#, WebGL Unity",
		image: "wk.jpg",
		open: "http://elerium.org/walker/"
	},

	efl: {
		name: "English Fast Learner",
		english: "English learning application.<br /> Desktop/Mobile, Native Javascript",
		russian: "Веб версия приложения для запоминания английский слов.<br /> Desktop/Mobile, Native Javascript",
		image: "el.jpg",
		open: "http://elerium.org/english/"
	},

	efla: {
		name: "English Fast Learner - build for android",
		english: "English learning application build as mobile application.<br /> Mobile, Javascript, Cordova",
		russian: "Версия под Android. <br /> Mobile, Javascript, Cordova",
		image: "em.jpg",
		open: "https://play.google.com/store/apps/details?id=com.englishfastlearner.mobile"
	},

	nfl: {
		name: "Nihongo Fast Learner",
		english: "Japanese learning application (currently only with Russian interface).<br /> Desktop/Mobile, Javascript",
		russian: "Когда неправильные глаголы английского языка уже не впечатляют. <br /> Desktop/Mobile, Javascript",
		image: "nl.jpg",
		open: "http://elerium.org/nihongo/"
	},

	nfle: {
		name: "Nihongo Fast Learner - old version",
		english: "Old verstion of Japanese learning application.<br /> Desktop, Javascript",
		russian: "Первая версия, до переезда на новый учебный движок. <br /> Desktop, Javascript",
		image: "no.jpg",
		open: "http://elerium.org/oldnihongo/"
	},

	mainskills: {
		name: "Main Skills",
		nameRus: "Основные Навыки",
		english: `

			<ul>
				<li>html5 (crossbrowser, adaptive, mobile)</li>
				<li>javascript (es6+), typescript (pref)</li>
				<li>demandwareScript</li>
				<li>less/sass, css animations</li>
				<li>html5 mobile apps (cordova)</li>
			</ul>

		`,
		isText: true
	},

	libs: {
		name: "Libs/Frameworks",
		english: `

			<ul>
				<li>React/Redux (main, pref)</li>
				<li>Angular.js (secondary) </li>
				<li>Angular 2+ (secondary)</li>
				<li>Phaser.io (as hobby)</li>
				<li>Pixi.js (as hobby)</li>
				<li>Cordova/Mobile</li>
			</ul>

		`,
		isText: true
	},

	utils: {
		name: "Working Process",
		english: `

			<ul>
				<li>Scrum/Agile</li>
				<li>Gulp/Grunt</li>
				<li>Webpack</li>
				<li>Unit Testing (Jest)</li>
				<li>Git/SVN</li>
				<li>Docs</li>
			</ul>

		`,
		isText: true
	},

	plus: {
		name: "Plus",
		english: `

			<ul>
				<li>Photoshop</li>
				<li>Blender</li>
				<li>Web Design</li>
				<li>Basic 3d modeling</li>
			</ul>

		`,
		isText: true
	}

};

export default Catalog;
