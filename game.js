let gifs = TagArray();
gifs.is_child('wtf', 'negative surprise');
gifs.is_child('no', 'negative');
gifs.is_child('yes', 'positive');
gifs.is_child('sad', 'negative');
gifs.is_child('angry', 'negative');
gifs.is_child('happy', 'positive');


class PopUp {
    constructor() {
        let PU = this;
        PU.html_el = div().ap(
            PU.plenka = div('plenka').ap(
                PU.box = div()
            )
        );
        PU.plenka.onClick( function(e){ if (e.target == PU.plenka) PU.hide(); });

        document.body.on('keydown', function(e) {
            if (e.keyCode == 27)
                PU.hide();
                PU.show
        });

        document.body.ap(PU.html_el);

        PU.html_el.hide();
    }

    show() {
    	this.html_el.fadeIn(200);
    }

    hide() {
        let PU = this;
        //PU.box.classList.remove('shakepls');
        if (PU.problem) PU.problem.empty();
        PU.html_el.fadeOut(300);

        if (PU.delete_on_hide) setTimeout(function() {
            PU.html_el.remove();
        },500);
    }

    shake() {
        let PU = this;
        if (PU.problem) {
            PU.problem.hide();
            PU.problem.show(200);
        }
        PU.box.shake();
    }

    destroy() {
        let PU = this;
        PU.slowRemove(300);
    }

    finish(img, title, message) {
        let PU = this;
        PU.plenka.empty().ap(
            div().ap(
                img,
                div('title').text(title),
                div().text(message)
            )
        );
        setTimeout(function(){
            PU.destroy();
        }, 4000);
    }
};


`himym
barney-winks.gif happy wink
barney-dancing.gif happy
barney-finger-gun-suicide.mp4 negative
barney-what.mp4 wtf
barney-applauding.mp4 happy
lily-turns-back.mp4 wtf
robin-crying-drinking.gif sad
:::doctor-who
doctor-who-nope-feet.mp4 no
doctor-who-under-rain.mp4 sad
doctor-who-what.mp4 wtf
:::breaking-bad
flinn-this-is-bullshit.mp4 angry
jessie-walter-high-five.gif happy
jessie-what.mp4 wtf
mike-no.gif no
you-re-goddamn-right.mp4 yes
:::friends
phoebe-jumping.mp4 happy
phoebe-rachel-jumping.mp4 happy
:::shameless
fiona-confused.mp4 negative
fiona-what.mp4 negative
frank-smiles.mp4 happy
kevin-confused.mp4 negative
`.split(':::').forEach(function(pack) {
	pack = pack.split('\n');
	let pack_name = pack[0];
	for (let i=1; i<pack.length; i++) {
		let s = pack[i].match(/(.+?) (.+)/) || pack[i].match(/(.+)/);
		if (s) gifs.add(pack_name + '/' + s[1], (s[2] ? s[2] + ' ' : '') + pack_name);
	}
});

let tick_svg = div().html(`<svg viewBox="0 0 512 512"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#2196f3"/><path d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0" fill="#fafafa"/></svg>`);
let cross_svg = div().html(`<svg version="1.1" id="Capa_1" x="0px" y="0px"	 viewBox="0 0 455.111 455.111" style="enable-background:new 0 0 455.111 455.111;" xml:space="preserve"><circle style="fill:#E24C4B;" cx="227.556" cy="227.556" r="227.556"/><path style="fill:#D1403F;" d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333	c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222	C422.4,91.022,455.111,155.022,455.111,227.556z"/><path style="fill:#FFFFFF;" d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533	c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533	c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533	c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533	C339.911,308.622,339.911,322.844,331.378,331.378z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);
let gear_svg = div().html(`<svg class="icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 490.05 490.05" style="enable-background:new 0 0 490.05 490.05;" xml:space="preserve"><g>	<g>		<path style="fill:#2C2F33;" d="M250.15,485.85l24.5-10.1c13.1-5.4,19.3-20.5,13.9-33.5l-6.3-15.2c12.3-9.1,23-19.9,32.2-32.2			l15.2,6.3c6.3,2.6,13.3,2.6,19.6,0c6.3-2.6,11.3-7.6,13.9-13.9l10.2-24.5c5.4-13.1-0.8-28.1-13.9-33.5l-22.5-9.3			c-5.1-2.1-10.8,0.3-12.9,5.4s0.3,10.8,5.4,12.9l22.5,9.3c3,1.2,4.4,4.7,3.2,7.7l-10.2,24.5c-0.6,1.4-1.7,2.6-3.2,3.2			c-1.4,0.6-3,0.6-4.5,0l-22.5-9.3c-4.4-1.8-9.4-0.3-12,3.6c-10.1,15.2-22.9,28-38.1,38.1c-3.9,2.6-5.5,7.7-3.7,12l9.3,22.5			c1.2,3-0.2,6.4-3.2,7.7l-24.5,10.1c-1.4,0.6-3,0.6-4.5,0c-1.4-0.6-2.6-1.7-3.2-3.2l-9.3-22.5c-1.8-4.4-6.4-6.9-11.1-5.9			c-17.8,3.6-36,3.5-53.8,0c-4.6-0.9-9.3,1.6-11.1,5.9l-9.3,22.5c-1.2,3-4.7,4.4-7.7,3.2l-24.5-10.2c-1.4-0.6-2.6-1.7-3.2-3.2			c-0.6-1.4-0.6-3,0-4.5l9.3-22.5c1.8-4.4,0.3-9.4-3.6-12c-15.2-10.1-28-22.9-38.1-38.1c-2.6-3.9-7.7-5.5-12-3.7l-22.5,9.3			c-1.5,0.6-3,0.6-4.5,0c-1.4-0.6-2.6-1.7-3.2-3.2l-10.1-24.5c-0.6-1.4-0.6-3,0-4.5c0.6-1.4,1.7-2.6,3.2-3.2l22.5-9.3			c4.4-1.8,6.8-6.4,5.9-11.1c-3.6-17.8-3.5-36,0-53.8c0.9-4.6-1.6-9.3-5.9-11.1l-22.5-9.3c-3-1.2-4.4-4.7-3.2-7.7l10.2-24.5			c1.2-3,4.7-4.4,7.7-3.2l22.5,9.3c4.4,1.8,9.4,0.3,12-3.6c10.1-15.2,22.9-28,38.1-38.1c3.9-2.6,5.5-7.7,3.7-12l-9.3-22.5			c-0.6-1.4-0.6-3,0-4.5c0.6-1.4,1.7-2.6,3.2-3.2l24.5-10.1c1.4-0.6,3-0.6,4.5,0c1.4,0.6,2.6,1.7,3.2,3.2l9.3,22.5			c2.1,5.1,7.9,7.5,12.9,5.4c5.1-2.1,7.5-7.9,5.4-12.9l-9.3-22.5c-2.6-6.3-7.6-11.3-13.9-13.9c-3.2-1.3-6.5-2-9.8-2s-6.7,0.7-9.8,2			l-24.5,10.1c-6.3,2.6-11.3,7.6-13.9,13.9c-2.6,6.3-2.6,13.3,0,19.6l6.3,15.2c-12.3,9.1-23,19.9-32.2,32.2l-15.2-6.3			c-13.1-5.4-28.1,0.8-33.5,13.9l-10.3,24.5c-5.4,13.1,0.8,28.1,13.9,33.5l15.2,6.3c-2.2,15.1-2.2,30.4,0,45.5l-15.2,6.3			c-6.3,2.6-11.3,7.6-13.9,13.9s-2.6,13.3,0,19.6l10.1,24.5c2.6,6.3,7.6,11.3,13.9,13.9s13.3,2.6,19.6,0l15.2-6.3			c9.1,12.3,19.9,23,32.2,32.2l-6.3,15.2c-2.6,6.3-2.6,13.3,0,19.6c2.6,6.3,7.6,11.3,13.9,13.9l24.5,10.2			c13.1,5.4,28.1-0.8,33.5-13.9l6.3-15.2c15.1,2.2,30.4,2.2,45.5,0l6.3,15.2c2.6,6.3,7.6,11.3,13.9,13.9			C236.85,488.45,243.85,488.45,250.15,485.85z"/>		<path style="fill:#2C2F33;" d="M107.15,300.75c0.3,44.2,36.4,79.9,80.5,79.9c0.2,0,0.4,0,0.6,0c21.5-0.2,41.7-8.7,56.8-24			c15.1-15.3,23.3-35.6,23.2-57.1c0-5.4-4.5-9.8-9.9-9.8h-0.1c-5.5,0-9.9,4.5-9.8,10c0.1,16.2-6.1,31.5-17.5,43.1			s-26.6,18-42.8,18.1c-0.1,0-0.3,0-0.4,0c-33.3,0-60.5-27-60.7-60.3c-0.2-33.5,26.8-60.9,60.3-61.2c5.5,0,9.9-4.5,9.8-10			c0-5.4-4.5-9.8-9.9-9.8c0,0,0,0-0.1,0C142.65,219.95,106.85,256.35,107.15,300.75z"/>		<path style="fill:#3C92CA;" d="M354.75,2.25h-19.3c-11.8,0-21.4,9.6-21.4,21.4v9.9c-9.6,2.6-18.8,6.4-27.4,11.4l-7-7			c-4-4-9.4-6.3-15.1-6.3s-11.1,2.2-15.1,6.3l-13.6,13.6c-4,4-6.3,9.4-6.3,15.1s2.2,11.1,6.3,15.1l7,7c-5,8.6-8.8,17.8-11.4,27.4			h-9.9c-11.8,0-21.4,9.6-21.4,21.4v19.3c0,11.8,9.6,21.4,21.4,21.4h9.9c2.6,9.6,6.4,18.8,11.4,27.4l-7,7c-4,4-6.3,9.4-6.3,15.1			s2.2,11.1,6.3,15.1l13.6,13.6c4,4,9.4,6.3,15.1,6.3s11.1-2.2,15.1-6.3l7-7c8.6,5,17.8,8.8,27.4,11.4v9.9			c0,11.8,9.6,21.4,21.4,21.4h19.3c11.8,0,21.4-9.6,21.4-21.4v-9.9c9.6-2.6,18.8-6.4,27.4-11.4l7,7c4,4,9.4,6.3,15.1,6.3			s11.1-2.2,15.1-6.3l13.6-13.6c8.3-8.3,8.3-21.9,0-30.2l-7-7c5-8.6,8.8-17.8,11.4-27.4h9.9c11.8,0,21.4-9.6,21.4-21.4v-19.3			c0-11.8-9.6-21.4-21.4-21.4h-9.9c-2.6-9.6-6.4-18.8-11.4-27.4l7-7c8.3-8.3,8.3-21.9,0-30.2l-13.6-13.6c-4-4-9.4-6.3-15.1-6.3			s-11.1,2.2-15.1,6.3l-7,7c-8.6-5-17.8-8.8-27.4-11.4v-9.9C376.05,11.85,366.45,2.25,354.75,2.25z M399.45,65.65			c1.7,1.1,3.6,1.7,5.5,1.7c2.6,0,5.1-1,7-2.9l12.5-12.5c0.4-0.4,0.8-0.5,1.1-0.5s0.7,0.1,1.1,0.5l13.6,13.6c0.6,0.6,0.6,1.6,0,2.2			l-12.5,12.5c-3.3,3.3-3.9,8.6-1.2,12.5c7.2,10.7,12.1,22.6,14.6,35.2c0.9,4.6,5,8,9.7,8h17.7c0.9,0,1.6,0.7,1.6,1.6v19.3			c0,0.9-0.7,1.6-1.6,1.6h-17.7c-4.7,0-8.8,3.3-9.7,8c-2.5,12.6-7.4,24.5-14.6,35.2c-2.6,3.9-2.1,9.2,1.2,12.5l12.5,12.5			c0.6,0.6,0.6,1.6,0,2.2l-13.6,13.6c-0.4,0.4-0.8,0.5-1.1,0.5s-0.7-0.1-1.1-0.5l-12.5-12.7c-3.3-3.3-8.6-3.9-12.5-1.2			c-10.7,7.2-22.6,12.1-35.2,14.6c-4.6,0.9-8,5-8,9.7v17.7c0,0.9-0.7,1.6-1.6,1.6h-19.3c-0.9,0-1.6-0.7-1.6-1.6v-17.7			c0-4.7-3.3-8.8-8-9.7c-12.6-2.5-24.5-7.4-35.2-14.6c-3.9-2.6-9.2-2.1-12.5,1.2l-12.5,12.5c-0.4,0.4-0.8,0.5-1.1,0.5			s-0.7-0.1-1.1-0.5l-13.6-13.6c-0.4-0.4-0.5-0.8-0.5-1.1s0.1-0.7,0.5-1.1l12.5-12.5c3.3-3.3,3.9-8.6,1.2-12.5			c-7.2-10.7-12.1-22.6-14.6-35.2c-0.9-4.6-5-8-9.7-8h-17.7c-0.9,0-1.6-0.7-1.6-1.6v-19.3c0-0.9,0.7-1.6,1.6-1.6h17.7			c4.7,0,8.8-3.3,9.7-8c2.5-12.6,7.4-24.5,14.6-35.2c2.6-3.9,2.1-9.2-1.2-12.5l-12.5-12.5c-0.4-0.4-0.5-0.8-0.5-1.1s0.1-0.7,0.5-1.1			l13.6-13.6c0.4-0.4,0.8-0.5,1.1-0.5s0.7,0.1,1.1,0.5l12.5,12.5c3.3,3.3,8.6,3.9,12.5,1.2c10.7-7.2,22.6-12.1,35.2-14.6			c4.6-0.9,8-5,8-9.7v-17.5c0-0.9,0.7-1.6,1.6-1.6h19.3c0.9,0,1.6,0.7,1.6,1.6v17.7c0,4.7,3.3,8.8,8,9.7			C376.85,53.55,388.75,58.45,399.45,65.65z"/>		<path style="fill:#3C92CA;" d="M286.35,147.05c0,32.4,26.4,58.8,58.8,58.8s58.8-26.4,58.8-58.8s-26.4-58.8-58.8-58.8			S286.35,114.65,286.35,147.05z M384.05,147.05c0,21.5-17.5,39-39,39s-39-17.5-39-39s17.5-39,39-39S384.05,125.65,384.05,147.05z"			/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`);


let pronounce_icon = `<svg class="icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 496.159 496.159" style="enable-background:new 0 0 496.159 496.159;" xml:space="preserve"><path style="fill:#E5AA17;" d="M496.159,248.085c0-137.023-111.07-248.082-248.076-248.082C111.071,0.003,0,111.063,0,248.085	c0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.159,385.086,496.159,248.085z"/><g>	<path style="fill:#FFFFFF;" d="M247.711,125.252c-3.41-1.851-7.559-1.688-10.813,0.426l-95.137,61.789h-35.164		c-5.845,0-10.583,4.738-10.583,10.584v92.727c0,5.845,4.738,10.583,10.583,10.583h35.164l95.137,61.79		c1.748,1.135,3.753,1.707,5.765,1.707c1.733,0,3.471-0.425,5.049-1.281c3.41-1.852,5.534-5.421,5.534-9.301V134.553		C253.244,130.672,251.121,127.103,247.711,125.252z"/>	<path style="fill:#FFFFFF;" d="M282.701,319.271c0.894,0,1.801-0.162,2.685-0.504c24.239-9.412,40.524-38.49,40.524-72.359		c0-29.957-13.2-57.049-33.63-69.018c-3.534-2.072-8.08-0.885-10.153,2.65c-2.073,3.536-0.885,8.082,2.651,10.153		c15.971,9.358,26.291,31.424,26.291,56.214c0,27.359-12.77,51.424-31.055,58.525c-3.82,1.481-5.714,5.781-4.231,9.602		C276.924,317.474,279.729,319.271,282.701,319.271z"/>	<path style="fill:#FFFFFF;" d="M302.073,350.217c0.895,0,1.802-0.162,2.684-0.504c34.046-13.219,57.822-55.979,57.822-103.988		c0-43.187-18.884-82.156-48.11-99.279c-3.534-2.072-8.082-0.885-10.152,2.652c-2.073,3.535-0.885,8.081,2.651,10.152		c24.768,14.512,40.771,48.455,40.771,86.475c0,42.027-19.883,79.1-48.353,90.154c-3.82,1.481-5.715,5.781-4.231,9.602		C296.295,348.418,299.1,350.217,302.073,350.217z"/>	<path style="fill:#FFFFFF;" d="M322.025,379.715c-3.005,0-5.841-1.818-6.994-4.788c-1.499-3.861,0.416-8.206,4.277-9.706		c38.764-15.051,65.837-64.404,65.837-120.019c0-50.136-21.609-95.192-55.052-114.786c-3.574-2.094-4.773-6.688-2.68-10.262		c2.094-3.574,6.688-4.774,10.263-2.68c37.948,22.232,62.469,72.369,62.469,127.728c0,61.66-31.009,116.764-75.409,134.002		C323.846,379.551,322.928,379.715,322.025,379.715z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`; 

function capitalize(string) {
	return string[0].toUpperCase() + string.slice(1);
}

function loadScript(url, callback) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onreadystatechange = callback;
  script.onload = callback;
  document.head.appendChild(script);
}


function loadScripts(urls, callback) {
	let loadedCount = 0;
	let multiCallback = () => {
		loadedCount++;
		if (loadedCount >= urls.length) {
			callback.call(this, arguments);
		}
	};
	for (let url of urls) {
		loadScript(url, multiCallback);
	}
}


function ToggleSwitch() {
	let TS = this;
	TS.dom = crel('label').addClass('switch').ap(
		TS.cb = crel('input').attr('type','checkbox'),
		crel('span').addClass('slider2').addClass('round')
	);
}

ToggleSwitch.prototype = {
	get enabled() {
		return this.cb.checked;
	},
	set enabled(v) {
		this.cb.checked = v;
	},
	onChange: function(callback) {
		this.cb.on('change', callback);
	}
};


let Game = (function() {
	let current_module;

	let correct_sound = new Audio("correct.mp3");
	correct_sound.controls = true;
	correct_sound.volume = 0.3;

	let question_box, input_box, answer_box, actual_answer, picture_box, under_input, settings_dom;

	let dom = div('columns').ap(
		//div(),
		div('game_div').ap(
			question_box = div(),
			div('container').ap(
				input_box = crel('input'),
				gear_svg
			),
			under_input = div('under_input').ap(
				picture_box = div('answer_svg'),
				answer_box = div('answer_box').ap(
					div().text('Correct answer: '),
					actual_answer = crel('R')
				)
			)
		),
		
	);

	under_input.onClick(continue_game);
	gear_svg.onClick(function(){
		settings_dom.show();
	});

	document.body.on('keydown', function(e){
		if (e.key == 'Enter') {
			if (input_box.disabled) {
				continue_game();
			}
			else if (input_box.value != '') {
				check_answer();
				if (document.activeElement) document.activeElement.blur();
			}
		}
		else if (e.key == 'Escape') {
			continue_game();
		}
	});

	function continue_game() {
		input_box.disabled = false;
		generate_task();
	}

	function generate_task() {
		input_box.value = '';
		answer_box.hide();
		picture_box.hide();
		current_task = current_module.random_task();
		if (typeof current_task.question == 'string') 
			question_box.html(current_task.question);
		else question_box.empty().ap(current_task.question);
		
		actual_answer.html(current_task.answer);
		input_box.focus();
	}

	function random_media(tag) {
		let m = gifs.get(tag).random().element;
		if (m.match(/\.gif$/)) return crel('img').attr('src', 'media/' + m);
		else if (m.match(/\.mp4$/)) {
			return crel('video').attr('autoplay','').attr('loop','').attr('type','video/mp4').ap(
				crel('source').attr('src', 'media/' + m)
			);
		}
	}


	function check_answer() {
		let user_answered_correctly = current_task.check ?
		current_task.check(input_box.value) :
		current_task.answer == input_box.value.trim();

		if (user_answered_correctly) {
			picture_box.empty().show().ap(random_media('positive') );
			correct_sound.play();
		}
		else {
			picture_box.empty().show().ap( random_media('negative') );
		}

		input_box.disabled = true;
		answer_box.show();
	}

	function load_module(module) {
		loadScript(module + '/main.js');
	}

	function set_current_module(m) {
		current_module = m;
		settings_dom = new PopUp();
		settings_dom.box.ap(current_module.settings.dom);
		
		generate_task();
	}

	return {dom, set_current_module, load_module, generate_task};
})();


Game.load_module('german');


document.body.ap(
	crel('h1').text('Practice German'),
	Game.dom
);