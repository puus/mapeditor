function initAccordions() {

    [].slice.call(document.getElementsByClassName('accordion-title')).forEach(function(elem, index, array) {
        elem.onclick = _toggleAccordion;
    });

    [].slice.call(document.getElementsByClassName('accordion')).forEach(function(elem, index, array) {
        elem.onclick = function(e) {
            //e.stopPropagation();
        };
    });
}

function _toggleAccordion(e) {
    e.target.parentNode.classList.toggle('collapsed');
}

export default initAccordions;
