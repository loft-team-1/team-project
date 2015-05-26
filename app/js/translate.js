// preparing language file
var aLangKeys = new Array();
aLangKeys['en'] = new Array();
aLangKeys['ru'] = new Array();

// EN
aLangKeys['en']['title'] = 'Watermark generator';
aLangKeys['en']['basic-img'] = 'Basic image';
aLangKeys['en']['wtmark-img'] = 'Watermark image';
aLangKeys['en']['settings'] = 'Settings';
aLangKeys['en']['location'] = 'Location';
aLangKeys['en']['opacity'] = 'Opacity';
aLangKeys['en']['reset'] = 'Reset';
aLangKeys['en']['download'] = 'Download';

// RU
aLangKeys['ru']['title'] = 'Генератор водяных знаков';
aLangKeys['ru']['basic-img'] = 'Исходное изображение';
aLangKeys['ru']['wtmark-img'] = 'Водяной знак';
aLangKeys['ru']['settings'] = 'Настройки';
aLangKeys['ru']['location'] = 'Положение';
aLangKeys['ru']['opacity'] = 'Прозрачность';
aLangKeys['ru']['reset'] = 'Сброс';
aLangKeys['ru']['download'] = 'Скачать';

// translation
$(document).ready(function() {

		// define lang onclick
		$('.b-language-select-link').click( function() {
				var lang = $(this).attr('id');

				// translate all translatable elements
				$('[data-i18n]').each(function(i){
					if ($(this).val()) {
						$(this).val(aLangKeys[lang][ $(this).attr('data-i18n') ]);
					} else {
						$(this).text(aLangKeys[lang][ $(this).attr('data-i18n') ]);
					}
				});

		});

});
