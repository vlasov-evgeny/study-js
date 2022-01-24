function showCalculatorPage() {
    return `
        <div>
            <h1>Калькулятор</h1>
            <p>Страница калькулятора</p>
            <input class="form-control" id="calculator-input"></input>
            <button type="button" class="btn btn-light" onclick="calcExec()">Вычислить</button>

            <div id="container-result"></div>
        </div>
    `;
}

function calcExec() {
    const expression = $('#calculator-input').val();
    const result = eval(expression);

    $('#container-result').html(
        `
        <div class="alert alert-info" role="alert">
            ${result}
        </div>
        `
    )
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
    const page = ({ 
        'calculator-button': showCalculatorPage,
        'alarm-button': showAlarmPage
    })[id]();

    $("#router-view").html(page);
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
