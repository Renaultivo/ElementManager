/*
elementManager.js a Renaultivo Project.

[🌹] ROSE License - Renaultivo Open-Source Exchange

# Most important:

- You can use this software free of charge, for any purpose,
including commercial applications. Credits are not required
but really appreciated.

*** How does 🌹ROSE License work? ***

We just ask you to help us improve this software with *one*
(but more than 1 would be better) of the following items:

- Help us reporting issues
- Implement more functionalities
- Tell us where/why are you using this software 

*Note: We accept suggestions/reports in all languages.

Doing one of the items above you going to help us and the
community that uses this project.

# Legal notices:

- No warranties or liabilities of any kind.

# 🌹ROSE projects have a philosophy:
- Do not copy/paste, if you will use it, make it better.

* */

((window)=>{

    "use strict";
    ''.__proto__.selectors = function(e) { setCSSSelectors(this.valueOf(), e); };
    String.__proto__.selectors = function(e) { setCSSSelectors(this.valueOf(), e); };

    function verify(data) {
        return data != null && data != undefined && data != NaN && typeof data != "undefined";
    }

    window.verify = verify;
    
    let upperCaseLetters = ['_','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let lowerCaseLetters = ['_','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    let cssEvents = [
        'hover', 'focus', 'active',
        'valid', 'root', 'checked'
    ];

    function JSStyleToCss(code) {

        let finalCode = '';
        

        for (let ob in code) {

            let propName = ob.split('');

            for (let l=0; l<propName.length; l++) {
                let verifyLetter = upperCaseLetters.indexOf(propName[l]);
                if (verifyLetter!=-1) {
                    propName[l] = '-'+lowerCaseLetters[verifyLetter];
                }
                finalCode += propName[l];
            }

            finalCode += ':' + code[ob] + ';';

        }

        return finalCode;

    }

    window.JSStyleToCss = JSStyleToCss;

    let elementManagerCSSNames = new Array();
    let elementManagerCSSElement = null;

    function getCSSRandomName() {

        let randomString = '';
        let elementManagerCSSLetters = upperCaseLetters.concat(lowerCaseLetters);

        for (let i=0; i<7; i++) {
            randomString += elementManagerCSSLetters[Math.floor(Math.random() * elementManagerCSSLetters.length)];
        }

        return randomString;

    }

    function createElementManagerCSSElement() {

        if (elementManagerCSSElement == null) {
            elementManagerCSSElement = createElement({
                tag: 'style'
            }).addTo(document.head);
        }

    }

    function createCSS(style) {

        let styleName = getCSSRandomName();

        if (elementManagerCSSNames.indexOf(styleName) != -1) {

            while (elementManagerCSSNames.indexOf(styleName) != -1) {
                styleName = getCSSRandomName();
            }

        }

        elementManagerCSSNames.push(styleName);

        createElementManagerCSSElement();

        elementManagerCSSElement.addText(`.${styleName}${ event != null ? `:${event}` : '' } {${JSStyleToCss(style, styleName)}} `);

        return styleName;

    }

    window.createCSS = createCSS;

    function createCSSObject(jsObject) {

        let cssObject = new Object();

        for (let key in jsObject) {

            let firstKey = Object.keys(jsObject[key])[0];
            let objFirstValue = jsObject[key][firstKey];

            if (typeof objFirstValue == 'object') {

                cssObject[key] = new Object();

                for (let prop in jsObject[key]) {

                    firstKey = Object.keys(jsObject[key][prop])[0];

                    if (typeof jsObject[key][prop][firstKey] == 'object') {

                        cssObject[key][prop] = createCSSObject(jsObject[key][prop]);

                    } else {

                        cssObject[key][prop] = createCSS(jsObject[key][prop]);

                    }

                }

            } else if (typeof objFirstValue == 'string' || typeof objFirstValue == 'number') {

                cssObject[key] = createCSS(jsObject[key]);

            }

        }

        return cssObject;

    }

    window.createCSSObject = createCSSObject;

    function setCSSSelectors(jsStyleName, jsObject) {

        createElementManagerCSSElement();

        for (let event in jsObject) {
            elementManagerCSSElement.addText(`.${jsStyleName}:${event} {${JSStyleToCss(jsObject[event])}} `);
        }

    }

    window.setCSSSelectors = setCSSSelectors;

    function setCSSChildren(jsStyleName, jsObject) {

        for (let child in jsObject) {
            elementManagerCSSElement.addText(`.${jsStyleName} ${child} {${JSStyleToCss(jsObject[child])}} `);
        }

    }

    window.setCSSChildren = setCSSChildren;

    function setStyle(element, style) {

        for (let prop in style) {
            element.style[prop] = style[prop];
        }

        return element;

    }

    function setAttributes(element, attributes) {

        for (let att in attributes) {
            element.setAttribute(att, attributes[att]);
        }

        return element;

    }

    function addTo(area, element) {
        area.appendChild(element);
        return element;
    }

    function clearElement(element) {
        
        for (let content in element.children) {

            if (typeof element.children[content] == 'object') {
                element.removeChild(element.children[content]);
            }

        }

        return element;

    }

    function setContent(element, content) {
        
        clearElement(element);

        if (typeof content == 'string' || typeof content == 'number') {
            content = document.createTextNode(content);
        }

        if (Array.isArray(content)) {
            
            content.forEach((c) => {
                addContent(element, c);
            });

        } else {
            element.appendChild(content);
        }

        return element;

    }

    function clearElement(element) {
        
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        return element;

    }

    function addContent(element, content) {
        
        if (typeof content == 'string' || typeof content == 'number') {
            content = document.createTextNode(content);
        }

        if (Array.isArray(content)) {

            content.forEach((c) => {
                addContent(element, c);
            });

        } else {

            element.appendChild(content);

        }

        return element;

    }

    function setText(element, text) {
        element.innerText = text;
        return element;
    }

    function addText(element, text) {
        element.innerText += text;
        return element;
    }

    function changeText(element, oldText, newText) {
        element.innerText = element.innerText.replace(oldText, newText);
        return element;
    }

    function changeContent(element, oldContent, newContent) {
        element.replaceChildren(oldContent, newContent);
        return element;
    }

    function on(element, event, action, passive = null) {

        if (Array.isArray(element)) {

            element.forEach((e) => {
                on(e, event, action);
            });

            return element;

        }

        if (Array.isArray(event)) {

            event.forEach((e) => {
                on(element, e, action);
            });

            return element;

        }

        if (Array.isArray(action)) {

            action.forEach((a) => {
                on(e, a);
            });

            return element;

        }

        element.addEventListener(event.toLowerCase(), action, { passive });

        return element;

    }

    function setRipple(element, color) {

        let lastStyleSettings;
        let computedStyle = getComputedStyle(element);

        const elementZIndex = element.style.zIndex != "" ? element.style.zIndex - 1 : computedStyle.zIndex - 1;

        let rippleElement = createElement({
            style: {
                zIndex: elementZIndex,
                position: 'absolute',
                transform: 'scale(1)',
                borderRadius: '50%',
                pointerEvents: 'none',
                backgroundColor: color,
                transitionDuration: '0.3s'
            }
        });

        rippleElement.active = false;

        let rippleSize;

        let clickInfo = {
            time: null,
            canceled: false,
            position: {
                top: 0,
                left: 0
            }
        }

        element.on({
            on: ['mousedown', 'touchstart'],
            do: function(e) {

                if (rippleElement.active === true) {
                    return;
                }

                let computedStyle = window.getComputedStyle(element);

                lastStyleSettings = {
                    overflow: element.style.overflow,
                    transform: element.style.transform,
                    position: computedStyle.position,
                    zIndex: computedStyle.zIndex
                };

                clickInfo.canceled = false;
                clickInfo.time = new Date().getTime();
                
                if (e.type == 'touchstart') {

                    clickInfo.position = {
                        top: e.changedTouches[0].clientY - element.offsetTop,
                        left: e.changedTouches[0].clientX - element.offsetLeft
                    }

                } else {

                    clickInfo.position = {
                        top: e.pageY - element.offsetTop,
                        left: e.pageX - element.offsetLeft
                    }

                }

                element.style.overflow = 'hidden';

                if (lastStyleSettings.position == "static"
                || (lastStyleSettings.position == ""
                    && element.style.position == '')) {
                    element.style.position = 'relative';
                }

                if (elementZIndex == "auto"
                || element.style.zIndex == 'auto'
                || element.style.zIndex == '') {
                    element.style.zIndex = 1;
                }

                rippleSize = Math.max(element.offsetWidth, element.offsetHeight) * 3;

                rippleElement.setStyle({
                    top: `${clickInfo.position.top - (rippleSize/2)}px`,
                    left: `${clickInfo.position.left - (rippleSize/2)}px`,
                    width: `${rippleSize}px`,
                    height: `${rippleSize}px`,
                    zIndex: elementZIndex-2,
                    opacity: 1,
                    animation: 'ripple linear 1.5s'
                });

                this.appendChild(rippleElement);

                rippleElement.active = true;

            }
        });

        element.on({
            on: ['mouseup', 'mouseleave', 'touchend'],
            do: () => {

                if (!rippleElement.active
                    || clickInfo.canceled) {
                    return;
                }

                clickInfo.canceled = true;

                let currentRippleSize = rippleSize * ((new Date().getTime() - clickInfo.time) / 1500);

                rippleElement.setStyle({
                    top: `${clickInfo.position.top - (currentRippleSize/2)}px`,
                    left: `${clickInfo.position.left - (currentRippleSize/2)}px`,
                    width: `${currentRippleSize}px`,
                    height: `${currentRippleSize}px`,
                    opacity: 1,
                    animation: '',
                    transform: `scale(1)`,
                    transitionDuration: '0s'
                });

                setTimeout(() => {

                    rippleElement.setStyle({
                        opacity: 0.6,
                        transform: `scale(${rippleSize/currentRippleSize})`,
                        transitionDuration: '0.5s'
                    });

                }, 20);
                
                setTimeout(()=>{

                    rippleElement.setStyle({
                        opacity: 0
                    });

                }, 290);
                
                setTimeout(()=>{

                    if (rippleElement.active === true && rippleElement.parentElement != null) {
                        rippleElement.active = false;
                        element.style.overflow = lastStyleSettings.overflow;
                        element.style.position = lastStyleSettings.position;
                        element.style.zIndex = lastStyleSettings.zIndex;
                        element.removeChild(rippleElement);
                    }

                }, 390);

            }
        });

    }

    function setContextMenu(props) {

        if (!props.margin) {
            props.margin = {
                vertical: 0,
                horizontal: 0
            }
        }

        props.element.contextMenuEnable = true;
        props.menu.style.display = 'none';

        let contextElementArea = createElement({
            style: {
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: verify(props.zIndex) ? props.zIndex : 100,
                position: 'fixed',
                pointerEvents: 'all',
                backgroundColor: 'transparent'
            },
            content: props.menu
        });

        props.element.on({
            on: 'contextmenu',
            do: function(e) {

                e.preventDefault();

                if (e.srcElement.contextMenuEnable
                    && e.srcElement != this) {
                    return;
                }

                if (contextElementArea.parentElement != null) {
                    
                    document.body.removeChild(contextElementArea);
                    
                    if (props.onClose != null) {
                        props.onClose(e);
                    }

                    return;

                }

                let position = {
                    top: e.clientY,
                    left: e.clientX
                }

                contextElementArea.addTo(document.body);

                props.menu.style.display = 'flex';

                if (props.onOpen != null) {
                    props.onOpen(e);
                }

                if ((position.top + props.menu.offsetHeight + props.margin.vertical) > document.body.offsetHeight) {
                    position.top = document.body.offsetHeight - props.margin.vertical - props.menu.offsetHeight;
                }

                if ((position.left + props.menu.offsetWidth + props.margin.horizontal) > document.body.offsetWidth) {
                    position.left = document.body.offsetWidth - props.margin.horizontal - props.menu.offsetHeight;
                }

                props.menu.setStyle({
                    top: `${position.top}px`,
                    left: `${position.left}px`
                });

            }
        });

        contextElementArea.on({
            on: ['click', 'contextmenu'],
            do: (e) =>{

                e.preventDefault();
                
                if (contextElementArea.parentElement != null) {

                    document.body.removeChild(contextElementArea);

                    if (props.onClose != null) {
                        props.onClose(e);
                    }

                }

            }
        });

    }

    function setDefaultMethods(element) {

        element.setStyle = (style, previous=null) => {

            if (Array.isArray(style)) {
                
                style.forEach((s) => {

                    if (typeof s == 'string') {
                        element.addClass(s);
                    } else {
                        element.setStyle(s);
                    }
                
                });

                return element;

            }

            setStyle(element, style);
        
            return element;
        
        }

        element.setAttributes = (attributes) => {
            setAttributes(element, attributes);
            return element;
        }

        element.addTo = (area) => {
            addTo(area, element);
            return element;
        }

        element.setContent = (content) => {
            setContent(element, content);
            return element;
        }

        element.addContent = (content) => {
            addContent(element, content);
            return element;
        }

        element.changeContent = (oldContent, newContent) => {
            changeContent(element, oldContent, newContent);
            return element;
        }

        element.setText = (text) => {
            setText(element, text);
            return element;
        }

        element.addText = (text) => {
            addText(element, text);
            return element;
        }

        element.setHTML = (htmlString) => {
            element.innerHTML = htmlString;
            return element;
        }

        element.changeText = (oldText, newText) => {
            changeText(element, oldText, newText);
            return element;
        }

        element.on = (props) => {

            if (props.on == null) {
                
                for (let event in props) {
                    on(element, event, props[event], props[event].passive);
                }

                return element;

            }

            if (Array.isArray(props)) {

                for (let event in props) {
                    
                    on(element, props[event].on, event, props[event].passive);

                }

            } else {
                on(element, props.on, props.do, props.passive);
            }

            return element;

        }

        element.setClass = (className) => {
            element.className = className;
            return element;
        }

        element.addClass = (className) => {
            element.classList.add(className);
            return element;
        }

        element.removeClass = (className) => {
            element.className = element.className.replace(className, '');
            return element;
        }

        element.changeClass = (oldClassName, newClassName) => {
            element.classList.remove(oldClassName);
            element.classList.add(newClassName);
            return element;
        }

        element.setID = (id) => {
            element.id = id;
            return element;
        }

        element.addID = (id) => {
            element.id.concat(' ' + id);
            return element;
        }

        element.changeID = (oldID, newID) => {
            element.id = element.id.replace(oldID, newID);
            return element;
        }

        element.setRipple = (color) => {
            setRipple(element, color);
            return element;
        }

        element.clear = () => {
            clearElement(element);
            return element;
        }

        element.setContextMenu = (props = {
            vertical: 0,
            horizontal: 0
        }) => {

            setContextMenu({
                element,
                ...props
            });

            return element;

        }

        return element;

    }

    function createElement(props = {}) {

        let element = document.createElement(verify(props.tag) ? props.tag : 'div');
        
        setDefaultMethods(element);

        if (verify(props.id)) {
            element.setID(props.id);
        }

        if (verify(props.class)) {

            props.class.split(' ').forEach((className) => {
                className != '' ? element.addClass(className) : '';
            });

        }

        if (verify(props.content)) {
            element.setContent(props.content);
        }

        if (verify(props.html)) {
            element.setHTML(props.html);
        }

        if (verify(props.event)) {
            element.on(props.event);
        }

        if (verify(props.style)) {

            if (typeof props.style == 'string') {
                element.addClass(props.style);
            } else {
                element.setStyle(props.style);
            }

        }

        if (verify(props.attributes)) {
            element.setAttributes(props.attributes);
        }

        if (verify(props.ripple)) {
            element.setRipple(props.ripple);
        }

        if (verify(props.contextMenu)) {
            element.setContextMenu({ element, ...props.contextMenu});
        }

        return element;

    }

    window.createElement = createElement;

    function createElementList(props = {}) {

        let elementList = new Array();

        if (typeof props.list != 'undefined') {

            if (Array.isArray(props.list)) {

                props.list.forEach((e) => {
                    
                    if (e != null) {
                        elementList.push(createElement(Object.assign(props, e)));
                    }

                });

            } else if (typeof props.list == 'number') {

                for (let i=0; i<props.list; i++) {
                    elementList.push(createElement(props));
                }

            }

        }

        return elementList;

    }

    window.createElementList = createElementList;

    window.elementManager = {
        setDefaultMethods: setDefaultMethods
    };

})(window);
