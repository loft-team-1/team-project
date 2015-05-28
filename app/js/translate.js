var translate = (function(){

	// preparing language file
	var i18n = new Array();
		i18n['en'] = new Array();
		i18n['ru'] = new Array();

	// EN
		i18n['en']['title'] = 'Watermark generator';
		i18n['en']['basic-img'] = 'Basic image';
		i18n['en']['wtmark-img'] = 'Watermark image';
		i18n['en']['settings'] = 'Settings';
		i18n['en']['location'] = 'Location';
		i18n['en']['opacity'] = 'Opacity';
		i18n['en']['reset'] = 'Reset';
		i18n['en']['download'] = 'Download';
		i18n['en']['copyright'] = '\u00A9 2015, This is our website, please do not copy and do not steal it.';

	// RU
		i18n['ru']['title'] = 'Генератор водяных знаков';
		i18n['ru']['basic-img'] = 'Исходное изображение';
		i18n['ru']['wtmark-img'] = 'Водяной знак';
		i18n['ru']['settings'] = 'Настройки';
		i18n['ru']['location'] = 'Положение';
		i18n['ru']['opacity'] = 'Прозрачность';
		i18n['ru']['reset'] = 'Сброс';
		i18n['ru']['download'] = 'Скачать';
		i18n['ru']['copyright'] = '\u00A9 2015, Это наш сайт, пожалуйста, не копируйте и не воруйте его.';


	var init = function(){
		_setupListeners();
	},

	// set listeners
	_setupListeners = function(){
		$('.b-language-link').on('click touchstart', _changeLang);
		$(document).on('ready', _detectLang);
	},

	// get language from localstorage
	_detectLang = function(){
		var lang = localStorage.getItem('lang') || 'ru';

		$('.b-language-link.m-active').removeClass('m-active');

		// detect lang
		if (lang ==='en') {
			$('#en.b-language-link').addClass('m-active');
		} else {
			$('#ru.b-language-link').addClass('m-active');
		}

		_toggleLang(lang);
	},

	// change language
	_changeLang = function(){
		var lang = $(this).attr('id');

		// remove tooltip
		upload.reset();

		// toggle active button
		if (!$(this).hasClass('m-active')) {
			$('.b-language-link.m-active').removeClass('m-active');
			$(this).addClass('m-active');

			// set language as local
			localStorage.setItem('lang', lang);
		}

		_toggleLang(lang);
	},

	// toggle language
	_toggleLang = function(lang){
		$('[data-i18n]').each(function(){
			if ($(this).val()) {
				$(this).val(i18n[lang][ $(this).attr('data-i18n') ]);
			} else {
				$(this).text(i18n[lang][ $(this).attr('data-i18n') ]);
			}
		});
	};

	return {
		init: init
	};

})();