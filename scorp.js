(function() {
    var styles = `
        .hide {
          display: none !important;
        }
    `;

    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
})();


/*
Array.prototype.intersect = function(B) {
    let A = this;
    let res = [];
    for (let el of A) {
        if (B.includes(el)) res.push(el);
    }
    return res;
}

Array.prototype.subtract = function(B) {
    let A = this;
    let res = [];
    for (let el of A) {
        if (!B.includes(el)) res.push(el);
    }
    return res;
}

Array.prototype.unite = function(B) {
    let A = this;
    let res = A;
    for (let el of B) {
        if (!A.includes(el)) res.push(el);
    }
    return res;
}*/


function TagArray() {
    let elements = [];
    let all_with_tag = {};
    let children = {};

    let add = function(element, tags) {
        if (typeof tags == "string") tags = tags.split(' ');

        let e = {element, tags};
        elements.push(e);

        for (let t of tags) {
            if (!all_with_tag[t]) all_with_tag[t] = [];
            all_with_tag[t].push(e);
        }
    };

    let get_all_child_tags = function(tag) {
        if (!children[tag]) return [];
        let res = [].concat(children[tag]);
        for (let c of children[tag]) {
            res = res.concat(get_all_child_tags(c));
        }
        return res;
    }

    let get = function(tag) {
        let all_tags = [tag].concat(get_all_child_tags(tag));
        let res = [];
        for (let t of all_tags) {
            if (all_with_tag[t]) res = res.concat(all_with_tag[t]);
        }
        return res;
    };

    let is_child = function(child, parents) {
        if (typeof parents == "string") parents = parents.split(' ');
        for (let p of parents) {
            if (!children[p]) children[p] = [];
            children[p].push(child);
        }
    }

    return {add, get, elements, children, is_child, get_all_child_tags};
}

t = new TagArray();


Array.prototype.random = function() {
    return this[Math.floor(this.length*Math.random())];
}


const get = function(x) { return document.getElementById(x) };

const crel = function(x, c) {
	let d = document.createElement(x);
	if (c) d.classList.add(c);
	return d;
}

const div = function(c) {
    let d = document.createElement('div');
    if (c) d.classList.add(c);
    return d;
}

const img = function(url) {
    let d = document.createElement('img');
    d.setAttribute('src',url);
    return d;
}

const crelFromString = function(s) {
    let d = document.createElement('div');
    d.innerHTML = s;
    return d.firstChild;
}

String.prototype.toObj = function() {
    let z = this.split(';');
    let styles = {};
    for (let s of z) {
        if (!s.includes(':')) continue;
        let pair = s.split(':');
        styles[pair[0]] = pair[1];
    }
    return styles;
}

var loa = (function () {
    var loa = {};
  
    function animateOverTime(dur, cb, fin) {
      var timeStart;
      
      // create closure
      function _animateOverTime(time) {
        if (!timeStart) timeStart = time;
        var timeElapsed = time - timeStart;
        var completion = Math.min(timeElapsed / dur, 1); // cap completion at 1 (100%)
        
        cb(completion);
        
        if (timeElapsed < dur) {
          requestAnimationFrame(_animateOverTime);
        } else {
          if (typeof fin === 'function') fin();
        }
      };
      
      return _animateOverTime;
    }
  
  
    loa.fadeOut = function(el, dur, fin) {
      // el.style.opacity = 1; is assumed
      if (!dur) dur = 0.01;
      
      // create closure
      var _fadeOut = function(completion) {
        el.style.opacity = 1 - completion;
        if (completion === 1) {
          el.hide();
          el.style.removeProperty('opacity');
        }
      };
      
      var ani = animateOverTime(dur, _fadeOut, fin);
      requestAnimationFrame(ani); // and go
    }
  
  
    loa.fadeIn = function(el, dur, fin) {
      // el.style.opacity = 0; is assumed
      if (!dur) dur = 0.01;
      el.show();
    
      // create closure
      var _fadeIn = function(completion) {
        el.style.opacity = completion; // this is easy since both 0 - 1 decimal
      };
      
      var ani = animateOverTime(dur, _fadeIn, fin);
      requestAnimationFrame(ani); // and go
    }
    
    return loa;
  }());

Element.prototype.ap = function() {for (let a of arguments) this.appendChild(a); return this; };
Element.prototype.onClick = function(f) { this.addEventListener('click', f); return this; };
Element.prototype.on = function(a,b,c) {  this.addEventListener(a,b,c); return this; };
Element.prototype.text = function(t) { this.innerText = t; return this; };
Element.prototype.html = function(t) { this.innerHTML = t; return this; };
Element.prototype.attr = function(x, y) { this.setAttribute(x, y); return this; };
Element.prototype.ID = function(x) { this.setAttribute('id', x); return this; };
Element.prototype.empty = function() { while (this.firstChild) this.removeChild(this.firstChild); return this; };
Element.prototype.addClass = function(x) { this.classList.add(x); return this; };
Element.prototype.removeClass = function(x) { this.classList.remove(x); return this; };

Element.prototype.hide = function(t) { this.addClass('hide'); return this; };
Element.prototype.show = function(t) {
    this.removeClass('hide');
    if (this.style.display == 'none') this.style.display = 'block';
    return this;
};
Element.prototype.toggle = function(t) { this.classList.contains('hide') || this.style.display == 'none' ? this.show(t) : this.hide(t) };
Element.prototype.slideUp = function(t) { $(this).slideUp(t) };
Element.prototype.slideDown = function(t) { $(this).slideDown(t) };
Element.prototype.fadeIn = function(t) { loa.fadeIn(this,t) };
Element.prototype.fadeOut = function(t) { loa.fadeOut(this,t) };
Element.prototype.shake = function() {
    let E = this;
    E.classList.remove('shakepls');
    void E.offsetWidth;
    E.classList.add('shakepls');
    setTimeout(function(){
        E.classList.remove('shakepls');
    },820);
};

Element.prototype.slowRemove = function(t) {
    let E = this;
    E.fadeOut(t);
    setTimeout(function() {
        E.remove();
    }, t+100);
};

/* Element.prototype.css = function(prop, val) {
    let E = this;
    let g = E.getAttribute('style').split(';');
    let styles = [];
    for (let x of g) {
        if (x.trim() === '') continue;
        let s = x.split(':');
        styles.push({ "prop":s[0].trim(), "val":s[1].trim() });
    }
    console.log(styles);
} */

/* 
Element.prototype.hide = function(t) {
    let E = this;
    if (E.style.display == 'none') return;

    if (t) {
        let orig_height = E.style.height;
        let orig_width = E.style.width;
        let orig_opacity= E.style.opacity;
        anime({
            targets: this,
            height: 0,
            width: 0,
            opacity: 0,
            easing: 'easeInOutQuart',
            duration: t,
            complete: function(anim) {
                console.log(anim);
                E.style.display = 'none';
                E.style.height = orig_height;
                E.style.width = orig_width;
                E.style.opacity = orig_opacity;
            }
        });
    }
    else E.style.display = 'none';
};

Element.prototype.show = function(t) {
    let E = this;
    if (E.style.display != 'none') return;
    
    E.style.display = 'block';
    if (t) {
        let orig_height = E.style.height;
        let orig_width = E.style.width;
        let orig_opacity= E.style.opacity;
        anime({
            targets: this,
            height: 0,
            width: 0,
            opacity: 0,
            direction: 'reverse',
            easing: 'easeInOutQuart',
            duration: t,
            complete: function(anim) {
                console.log(anim);
                E.style.height = orig_height;
                E.style.width = orig_width;
                E.style.opacity = orig_opacity;
            }
        });
    }
}; */

/* Element.prototype.rewriteCSS = function(line) {
    let E = this;

    let styles = E.getAttribute('style').toObj();

    let ch = line.toObj();
    console.log(ch);
    if (Object.keys(ch).length === 0) return styles[line].trim();

    for (let c in ch) {
        if (ch[c] == 'null') delete styles[c];
        else styles[c] = ch[c];
    }
    
    let res = '';
    for (let p in styles) res += p + ':' + styles[p] + ';';
    E.setAttribute('style',res);

    return E;
}

Element.prototype.css = function(s) {
    let E = this;
    let g = E.getAttribute('style');
    if (!g.endsWith(';')) g+=';';
    if (!s.endsWith(';')) s+=';';
    if (g.endsWith(s)) return E;
    E.setAttribute('style', g + s);
    return E;
}*/

(function() {
    function assemble(line, arr) {
        let res = '';
        for (let token of line.value) {
            if (typeof token === 'string') res += token;
            else {
                arr.push(token.name);
                let a = assemble(token, arr);
                token.ass = a;
                res += '(' + a + ')';
            }
        }
        return res.replace(/ /g, '').replace(/_/g, ' ');
    }

    function unroll_mod(exp) {
        if (exp[0] == '|') return exp.slice(1).trim().split(/\s+/).join('|')
        return exp;
    }

    function process(var_name, r, vars) {
        r = r.replace(/(@[A-z]+([\+\*]\??)?)/g, '蠍$1蠍').split('蠍').map(function(x){
            if (x.startsWith('@')) {
                let found = x.match(/@([A-z]+)([\+\*]\??)?/);
                if (!vars[found[1]]) vars[found[1]] = {name: found[1]};

                if (found[2] && !vars[x.slice(1)]) {
                    vars[x.slice(1)] = {
                        name: '*' + found[1],
                        value: [ vars[found[1]], found[2]]
                    };
                }
                return vars[x.slice(1)];
                
            }
            return x;
        });
        //console.log(r);

        if (!vars[var_name]) vars[var_name] = {name: var_name};
        vars[var_name].value = r;
    }

    function translate(regex, vars, arr) {
        regex = regex.trim()
        .replace(/\(/g, '(?:')
        .replace(/\\/g, '\\\\')
        .replace(/\/\//g, '阙')
        .replace(/\//g, '\\')
        .replace(/阙/g, '/')
        .split(/\n+/);

        for (let line of regex) {
            let var_def = line.match(/@([A-z]+)\s*=(.+)/);
            if (var_def) {
                let r = unroll_mod(var_def[2].trim());
                process(var_def[1], r, vars);
                continue;
            }
            let main = line.match(/find\s(.+)/);
            if (main) {
                main = main[1].trim();
                process('^', main, vars);
            }
        }

        return assemble(vars['^'], arr);
    }

    String.prototype.regex_match = function(regex) {
        let arr = [], vars = {};
        regex = translate(regex, vars, arr);

        console.log(arr, regex, vars);
        let found = this.match(regex);

        let res = {};
        let count = {};

        if (found) {
            console.log(found);
            res['^'] = found[0];
            for (let i=0; i < arr.length; i++) {
                let parent;
                if (arr[i].startsWith('*')) {
                    parent = arr[i];
                    i++;
                }
                found[i+1] = found[i+1] || '';
                if (!res[arr[i]]) res[arr[i]] = found[i+1];
                else {
                    if (!count[arr[i]]) count[arr[i]] = 1;
                    count[arr[i]]++;
                    res[arr[i] + count[arr[i]]] = found[i+1];
                }

                if (parent) {
                    res[parent + (count[arr[i]] || '') ] = found[i];
                }
            }
        }
        
        for (let v of Object.keys(res).filter(v => v.startsWith('*')) ) {
            console.log(v.slice(1).replace(/\d+$/));
            let r = new RegExp( vars[v.slice(1).replace(/\d+$/,'') ].ass, 'g');
            console.log(r);
            let a = [];
            res[v].replace(r, function(x) {
                a.push(x);
            });
            res[v.slice(1)] = a;
            delete res[v];
        }

        return res;
    };

    String.prototype.regex_replace = function(regex, replacement) {
        regex = new RegExp(translate(regex, []), 'g');
        return this.replace(regex, replacement);
    };
})();

/*
let res = 'herausbekommen'.regex_match(`
@first_two = @init? @vowel
@pref = | ${Verb.all_pref.join(' ')}
@init = | kn pf str? spr? sch[lmnrw]? [tdkgpbf]r [kgfbp]l pfl zw qu ch @consonant
@vowel = [aiueoäüö]
@consonant = [wrtpsdfghjklzvbnmc]
@rest = @first_two (.* e[lr]n | .+ en)

find @pref* @rest
`);

res = `Please visit https://scorpjke.github.io/word-game to practice German`.regex_match(`
@protocol = https?
@domain = /w+
@subdomain = /w+ /.
@addr = [- // /w]+
find ( @protocol ://// )? @subdomain+ @domain (//@addr | //)?
`);*/
/*
res = `visit https://scorpjke.github.io/word-game to practice German`.regex_match(`
@vowel = [aiueoäüö]
@consonant = [wrtpsdfghjklzvbnmc]
@vowel_b = @vowel
@pair = @consonant @vowel
find @pair+
`);*/

//find @vowel @consonant @vowel+

