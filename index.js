function showCalculatorPage() {
    const html = `
        <div class="calculator" id="calculator">
            <h1>Калькулятор</h1>

            <div class="calculator-drag-area"></div>

            <input class="form-control" id="calculator-input"></input>
            
            <div class="calculator-buttons">
                <div class="calculator-buttons-row">
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('7')">7</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('8')">8</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('9')">9</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('/')">/</button>
                </div>
                <div class="calculator-buttons-row">
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('4')">4</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('5')">5</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('6')">6</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('*')">*</button>
                </div>
                <div class="calculator-buttons-row">
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('1')">1</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('2')">2</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('3')">3</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('-')">-</button>
                </div>
                <div class="calculator-buttons-row">
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('0')">0</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('.')">.</button>
                    <button type="button" class="btn btn-light" onclick="calcExec()">=</button>
                    <button type="button" class="btn btn-light" onclick="addSymbolToCalcInput('+')">+</button>
                </div>
            </div>

            <div class="calculator-size-anchor"></div>
        </div>
    `;
    $("#router-view").html(html);

    const calculatorDragArea = $('#calculator .calculator-drag-area')[0];
    const calculator = document.getElementById('calculator');
    calculatorDragArea.onmousedown = function(e) {
        var coords = getCoords(calculator);
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

    const calculatorResizeArea = $('#calculator .calculator-size-anchor')[0];
    calculatorResizeArea.onmousedown = function(e) {
        const calculatorCoords = getCoords(calculator);
        const anchorCoords = getCoords(calculatorResizeArea);
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

    function getCoords(elem) {   // кроме IE8-
        const box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

function calcExec() {
    const expression = $('#calculator-input').val();
    const result = eval(expression);
    $('#calculator-input').val(result);
}

function addSymbolToCalcInput(symbol) {
    $('#calculator-input').val($('#calculator-input').val() + symbol);
}

function showAlarmPage() {
    return `
        <div>
            <h1>Будильник</h1>
            <p>Страница будильника</p>
        </div>
    `;
}

function onMenuItemClick(id) {
    ({ 
        'calculator-button': showCalculatorPage,
        'alarm-button': showAlarmPage
    })[id]();

    // $("#router-view").html(page);
}

$( document ).ready(function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    $('.aside-menu-item').on("click", function() {
        onMenuItemClick($(this).attr('id'))
    });
});