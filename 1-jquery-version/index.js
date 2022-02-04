function showCalculatorPage() {
    const calculator = new AppCalculator(document.getElementById('router-view'));
    const closeHandler = function(event) {
        document.removeEventListener(closeHandler);
        delete calculator;
    }
    document.addEventListener("destroy", closeHandler);
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