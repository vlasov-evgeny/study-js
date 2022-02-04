class AppCalculator {
    constructor(rootNode) {
        this.rootNode = rootNode;
        this.id = (new Date()).getTime();
        this.render();
        this.setupButtonsHandler();
        this.setupDragHandler();
        this.setupResizeHandler();
    }

    render() {
        const html = `
            <div class="calculator" id="${this.id}">

                <div class="calculator__topbar">
                    <div class="calculator-drag-area"></div>
                    <button class="btn btn-danger btn-sm close-icon">
                        <i class="bi bi-x"></i>
                    </button>
                </div>

                <h1>Калькулятор</h1>
                

                <input class="form-control calculator-input"></input>
                
                <div class="calculator-buttons">
                    <div class="calculator-buttons-row">
                        <button type="button" class="btn btn-light" data-char="7">7</button>
                        <button type="button" class="btn btn-light" data-char="8">8</button>
                        <button type="button" class="btn btn-light" data-char="9">9</button>
                        <button type="button" class="btn btn-light" data-char="/">/</button>
                    </div>
                    <div class="calculator-buttons-row">
                        <button type="button" class="btn btn-light" data-char="4">4</button>
                        <button type="button" class="btn btn-light" data-char="5">5</button>
                        <button type="button" class="btn btn-light" data-char="6">6</button>
                        <button type="button" class="btn btn-light" data-char="*">*</button>
                    </div>
                    <div class="calculator-buttons-row">
                        <button type="button" class="btn btn-light" data-char="1">1</button>
                        <button type="button" class="btn btn-light" data-char="2">2</button>
                        <button type="button" class="btn btn-light" data-char="3">3</button>
                        <button type="button" class="btn btn-light" data-char="-">-</button>
                    </div>
                    <div class="calculator-buttons-row">
                        <button type="button" class="btn btn-light" data-char="0">0</button>
                        <button type="button" class="btn btn-light" data-char=".">.</button>
                        <button type="button" class="btn btn-light" data-result-button>=</button>
                        <button type="button" class="btn btn-light" data-char="+">+</button>
                    </div>
                </div>

                <div class="calculator-size-anchor"></div>
            </div>
        `;
        this.rootNode.insertAdjacentHTML('beforeend', html);
    }

    setupButtonsHandler() {
        const self = this;
        $(`#${this.id}.calculator button[data-char]`).click(function() {
            const char = $(this).attr('data-char');
            self.addSymbolToCalcInput(char);
        });

        $(`#${this.id}.calculator button[data-result-button]`).click(function() {
            self.calcExec();
        });

        $(`#${this.id} .close-icon`).click(() => this.destroy());
    }

    setupDragHandler() {
        const calculatorDragArea = $(`#${this.id} .calculator-drag-area`)[0];
        const calculator = document.getElementById(this.id);
        const self = this;
        calculatorDragArea.onmousedown = function(e) {
            var coords = self.getCoords(calculator);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;

            calculator.style.position = 'absolute';
            document.body.appendChild(calculator);
            moveAt(e);

            calculator.style.zIndex = 1000; // над другими элементами

            function moveAt(e) {
                calculator.style.left = e.pageX - shiftX + 'px';
                calculator.style.top = e.pageY - shiftY + 'px';
            }

            document.onmousemove = function(e) {
                moveAt(e);
            };

            calculatorDragArea.onmouseup = function() {
                document.onmousemove = null;
                calculatorDragArea.onmouseup = null;
            };
        }
        calculatorDragArea.ondragstart = function() {
            return false;
        };
    }

    setupResizeHandler() {
        const calculator = document.getElementById(this.id);
        const calculatorResizeArea = $(`#${this.id} .calculator-size-anchor`)[0];
        const self = this;
        calculatorResizeArea.onmousedown = function(e) {
            const calculatorCoords = self.getCoords(calculator);
            const anchorCoords = self.getCoords(calculatorResizeArea);
            const initWidth = anchorCoords.left - calculatorCoords.left + 25;
            const initHeight = anchorCoords.top - calculatorCoords.top + 25;
            const initX = e.pageX;
            const initY = e.pageY;

            var sizeX = anchorCoords.left + 25 - calculatorCoords.left;
            var sizeY = anchorCoords.top + 25 - calculatorCoords.top;

            resizeAt(e);

            function resizeAt(e) {
                const shiftX = e.pageX - initX;
                const shiftY = e.pageY - initY;

                calculator.style.width = `${initWidth + shiftX}px`;
                calculator.style.height = `${initHeight + shiftY}px`;
            }

            document.onmousemove = function(e) {
                resizeAt(e);
            };

            calculatorResizeArea.onmouseup = function() {
                document.onmousemove = null;
                calculatorResizeArea.onmouseup = null;
            };
        }
        calculatorResizeArea.ondragstart = function() {
            return false;
        };
    }

    calcExec() {
        const expression = $(`#${this.id} .calculator-input`).val();
        const result = eval(expression);
        $(`#${this.id} .calculator-input`).val(result);
    }
    
    addSymbolToCalcInput(symbol) {
        console.log('addSymbolToCalcInput')
        $(`#${this.id} .calculator-input`).val($($(`#${this.id} .calculator-input`)).val() + symbol);
    }

    getCoords(elem) {   // кроме IE8-
        const box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    destroy() {
        const elem = document.getElementById(this.id);
        elem.parentNode.removeChild(elem);
        const event = new Event("destroy");
        this.dispatchEvent(event, { id: this.id });
    }
}