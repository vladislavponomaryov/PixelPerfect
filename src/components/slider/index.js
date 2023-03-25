"use strict"

class Slider {
    position = 0
    constructor(mainElement) {
        this.mainElement = document.querySelector(mainElement)
        this.wrapper = this.mainElement.querySelector('.wrapper')
        this.prevButtonId = 'prevButton'
        this.nextButtonId = 'nextButton'

        this.init()
    }

    init() {
        this.mainElementResize()
        this.getParams()
        this.createButtons()
        this.kineticScrolling()
    }

    mainElementResize() {
        new ResizeObserver(() => {
            this.getParams()
            this.wrapper.style.transform = 'translateX(0px)'
        }).observe(this.mainElement);
    }

    getParams() {
        this.mainElementStyle = getComputedStyle(this.mainElement)
        this.wrapperStyle = getComputedStyle(this.wrapper)

        let mainElementWidth = this.mainElementStyle.getPropertyValue('width')
        this.mainElementWidth = this.clearPX(mainElementWidth)

        let wrapperWidth = this.wrapperStyle.getPropertyValue('width')
        this.wrapperWidth = this.clearPX(wrapperWidth)
    }

    createButtons() {
        this.prevButton = this.createButton(this.prevButtonId, '_icon-leftBottom', '')
        this.nextButton = this.createButton(this.nextButtonId, 'visibility _icon-leftBottom', '')

        this.nextButton.addEventListener('click', this.buttonScroll.bind(this))
        this.prevButton.addEventListener('click', this.buttonScroll.bind(this))
    }

    createButton(elementId, classNames, content) {
        let button = document.createElement('div')
        button.id = elementId
        button.classList = classNames
        button.innerHTML = content
        this.mainElement.appendChild(button)

        return button
    }

    clearPX(element) {
        return +element.slice(0, element.length - 2)
    }

    getActualPosition() {
        let transformStyle = this.wrapperStyle.getPropertyValue('transform')
        let matrix = new WebKitCSSMatrix(transformStyle)

        return matrix.m41
    }

    buttonScroll(e) {
        let position = this.getActualPosition()
        let maxPosition = this.wrapperWidth - this.mainElementWidth

        if (e.target === this.nextButton) {

            position = position - 200
            if (Math.abs(position) > maxPosition) position = -maxPosition // Ограничение на максимальное смещение вперед

        } else if (e.target === this.prevButton) {

            position = position + 200
            if (position >= 0) position = 0 // Ограничение на максимальное смещение назад

        }

        this.wrapper.style.transform = 'translateX('+ position + 'px)'

        this.position = position
        this.buttonVisibility()
    }

    buttonVisibility() {
        let position = this.position
        let maxPosition = this.wrapperWidth - this.mainElementWidth

        let visClass = 'visibility'

        position === 0 || Math.abs(position) !== maxPosition ? this.nextButton.classList.add(visClass) : this.nextButton.classList.remove(visClass)

        position < 0 ? this.prevButton.classList.add(visClass) : this.prevButton.classList.remove(visClass)
    }

    kineticScrolling() {

        var view, offset, min, max, reference, pressed, xform;

        view = this.wrapper
        if (typeof window.ontouchstart !== 'undefined') {
            view.addEventListener('touchstart', tap.bind(this));
            view.addEventListener('touchmove', drag.bind(this));
            view.addEventListener('touchend', release.bind(this));
        }
        view.addEventListener('mousedown', tap.bind(this));
        view.addEventListener('mousemove', drag.bind(this));
        view.addEventListener('mouseup', release.bind(this));

        min = 0
        offset = 0
        pressed = false;

        xform = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
            var e = prefix + 'Transform';
            if (typeof view.style[e] !== 'undefined') {
                xform = e;
                return false;
            }
            return true;
        });

        function ypos(e) {
            // touch event
            if (e.targetTouches && (e.targetTouches.length >= 1)) {
                return e.targetTouches[0].clientX;
            }

            // mouse event
            return e.clientX;
        }

        function scroll(y) {
            offset = (y > max) ? max : (y < min) ? min : y;
            view.style[xform] = 'translateX(' + (-offset) + 'px)';
        }

        function tap(e) {
            pressed = true;
            max = this.wrapperWidth - this.mainElementWidth
            offset = Math.abs(this.position)
            reference = ypos(e);
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        function drag(e) {
            var y, delta;
            if (pressed) {
                y = ypos(e);
                delta = reference - y;
                if (delta > 1 || delta < -1) {
                    reference = y;
                    scroll(offset + delta);
                }
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        function release(e) {
            pressed = false;
            this.position = -offset
            this.buttonVisibility(offset)
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
}

new Slider('[myslider]')