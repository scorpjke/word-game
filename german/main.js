
let German = function() {
	let detailed_verb_list = dictionary.filter(x => x.type == 'verb').map(function(x){
		let v = new Verb(x.word);
		Object.assign(v, x);
		return v;
	});

	function pronounce(w) {
		responsiveVoice.speak(w, "Deutsch Female", {rate: 0.7, pitch: 1.1} );
	}

	function remove_from_array(array, el) {
		const index = array.indexOf(el);
		if (index > -1) {
			array.splice(index, 1);
		}
	}

	let noun_list = dictionary.filter(w => ['die', 'der', 'das', 'MF'].includes(w.type));

	let settings = {
		irr_diffs: new Set([true,false]),
		prefix_types: new Set(['none', 'insep', 'sep']),
		freq: {min: 1, max: 500},
		show_translations: true,
		always_pronounce: false,
		themes: new Set(['listening'])
	};

	let irr_checkboxes = div();
	for (let i of [false,true]) {
		let c = crel('input').attr('type','checkbox');
		c.checked = settings.irr_diffs.has(i);
		c.on('change', function() {
			if (c.checked) settings.irr_diffs.add(i);
			else if (Array.from(settings.irr_diffs).length == 1) {
				c.checked = true;
			}
			else settings.irr_diffs.delete(i);
		});

		irr_checkboxes.ap(
			crel('div').ap(
				c,
				crel('span').text(i ? 'Strong verbs':'Weak verbs' )
			)
		);
	}


	let pref_group_names = {'none':'No prefix', 'sep':'Separable prefix', 'insep':'Inseparable prefix'};
	let pref_checkboxes = div();
	for (let i of ['none', 'sep', 'insep']) {
		let c = crel('input').attr('type','checkbox');
		c.checked = settings.prefix_types.has(i);
		c.on('change', function() {
			if (c.checked) settings.prefix_types.add(i);
			else if (Array.from(settings.prefix_types).length == 1) {
				c.checked = true;
			}
			else settings.prefix_types.delete(i);
		});

		pref_checkboxes.ap(
			crel('div').ap(
				c,
				crel('span').text(pref_group_names[i] )
			)
		);
	}
	
	let show_translations_switch = new ToggleSwitch();
	show_translations_switch.enabled = settings.show_translations;

	show_translations_switch.onChange( function(){
		settings.show_translations = show_translations_switch.enabled;
	});

	let always_pronounce_switch = new ToggleSwitch();
	always_pronounce_switch.enabled = settings.always_pronounce;

	always_pronounce_switch.onChange( function(){
		settings.always_pronounce = always_pronounce_switch.enabled;
	});

	let settings_tabs = {};

	let slider_dom;

	settings_tabs['General'] = div('settings').ap(
		div('container').ap(
			div().text('Words frequency'),
			div('tooltip').text('(?)').ap(
				div('tooltiptext').text('The dictionary has 4000 words sorted by frequency (common to rare). Choose the range')
			),
		),
		div('frequency_slider').ap(
			slider_dom = div(),
		),
	);

	settings_tabs['Verbs'] = div('settings').ap(
		div().ap(
			irr_checkboxes
		),
		div().ap(
			pref_checkboxes
		)
	);

	settings_tabs['Nouns'] = div();

	settings_tabs['Other'] = div('settings').ap(
		div().ap(
			always_pronounce_switch.dom,
			crel('span').text('Always pronounce')
		),
		div().ap(
			show_translations_switch.dom,
			crel('span').text('Show translations')
		),
	);

	//console.log()

	settings.dom = Tabs(settings_tabs).dom;

	let frequency_slider = noUiSlider.create(slider_dom, {
	    range: {
	        'min': 1,
	        '20%': 200,
	        '50%': 1000,
	        'max': dictionary.length
	    },

	    format: {
	        to: value => parseInt(value/10)*10,
	        from: value => Number(value.replace(',-', ''))
	    },

	    connect: true,
	    step: 10,
	    start: [settings.freq.min, settings.freq.max],
	    behaviour: 'tap-drag',
	    tooltips: true,
	});

	slider_dom.noUiSlider.on('change', function (value) {
	    settings.freq.min = frequency_slider.get()[0];
	    settings.freq.max = frequency_slider.get()[1];
	});

	function filter_by_freq(arr) {
		return arr.filter(x => x.frequency >= settings.freq.min && x.frequency <= settings.freq.max);
	}

	function random_verb() {
		let pt = Array.from(settings.prefix_types);
		let ir = Array.from(settings.irr_diffs);
		return current_word = filter_by_freq(detailed_verb_list).filter(v => pt.includes(v.prefix_type) && ir.includes(v.irr_diff)).random();
	}

	function random_noun() {
		return current_word = filter_by_freq(noun_list).random();
	}

	function random_word() {
		return current_word = filter_by_freq(dictionary).random();
	}

	function maybe_translation(w) {
		return settings.show_translations ? ' (' + w.translation + ') ' : '';
	}

	function create_pronunciation_icon(w) {
		return crelFromString(pronounce_icon).onClick(function(){
			pronounce(w);
			//input_box.focus();
		});
	}

	let current_word, already_pronounced;

	let tasks = {
		'past participle': [
			function() {
				let v = random_verb();
				current_word = v.in('inf');
				return {question: `What is the past participle of:<br> <R>${v.in('inf')}</R>${maybe_translation(v)}?`, answer: v.in('past participle')};
			},
			function() {
				let v = random_verb();
				current_word = v.in('past participle');
				let correct_answer = v.in('inf');
				return {question: `<R>${v.in('past participle')}</R> is the past participle of which verb?`, answer: correct_answer, check: (user_answer) => user_answer == correct_answer};
			}
		],
		'present': [
			function() {
				let v = random_verb();
				current_word = v.in('inf');
				let person = ['ich', 'du', 'er', 'wir', 'ihr','sie (they)', 'sie (she)'].random();
				let person_label = capitalize(person);
				if (person == 'sie (they)') person = 'sie';
				else if (person == 'sie (she)') person = 'er';
				return {
					question: `Conjugate the verb in the present tense: <R>${v.in('inf')}</R> ${maybe_translation(v)}<br>→ ${person_label} ... ?`,
					answer: v.in('present',person)
				};
			},
			function() {
				let v = random_verb();
				let person = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'].random();
				let person_label = person;
				if (person == 'sie' && Math.random() > 0.5) person = 'er';

				current_word = person_label + ' ' + v.in('present',person);

				return {
					question: capitalize(`${person_label} <R>${v.in('present',person)}</R>.<br> ${maybe_translation(v)} <br> What's the infinitive?`),
					answer: v.in('inf')
				};
			},
		],
		'translation': [
			function() {
				let w = filter_by_freq(dictionary).random();
				let t = '';
				if (w.type == 'verb') t = '(verb)';
				else if (['die', 'der', 'das', 'MF'].includes(w.type)) t = '(noun)';

				return {
					question: `<i>Translate to German:</i> ${t} ${w.translation}`,
					answer: w.word
				};
			}
		],
		'noun gender': [
			function() {
				let w = random_noun();
				current_word = w.word;

				return {
					question: `Which definite article comes with: <br> <R>${w.word}</R>${maybe_translation(w)}?`,
					answer: w.type
				};
			}
		],
		'listening': [
			function() {
				let w = random_word();
				current_word = w.word;
				
				//let icon = crelFromString(`<iframe src="https://commons.wikimedia.org/wiki/File:De-${w.word}.ogg?embedplayer=yes" width="120" frameborder="0" ></iframe>`);
				let icon = create_pronunciation_icon(w.word);
				//input_box.on('keypress').
				pronounce(w.word);
				already_pronounced = true;

				let question = div().ap(
					crel('span').text(`Which word do you hear?`),
					icon
				);

				return { question,	answer: w.word };
			}
		]
	};

	let choose_task = TagBox(Object.keys(tasks));
	choose_task.set_tag_set(settings.themes);

	settings_tabs['General'].ap(
		div().ap(
			div().text('Current tasks:'),
			choose_task.dom
		)
	);

	document.body.on('keydown', function(e){
		//console.log(e.key);
		if (e.key == 'ArrowUp') {
			pronounce(current_word);
		}
	});

	function random_task() {
		current_word = null;
		let themes = settings.themes;
		if (!settings.themes) themes = Object.keys(tasks);
		let theme = Array.from(themes).random();
		let res = tasks[theme].random()();
		
		if (settings.always_pronounce && !already_pronounced) pronounce(current_word);
		already_pronounced = false;
		return res;
	}

	return {settings, random_task};
};


loadScripts(['german/dictionary.js', 'german/grammar.js'], function() {
	Game.set_current_module(German());
});

