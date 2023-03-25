/* Mobile search */
let mobileMediaWidth = 792

/* Sidebar */
let miniNavigationMediaWidth = 1348
let needDisableResizeEvent = false

window.onload = () => {

    /* Mobile search */
    document.querySelector('#button-mobile-search').addEventListener('click', () => {
        let searchBox = document.querySelector('body header .center')

        searchBox.classList.toggle('visible')
    })


    /* Check in sidebar need full or mini navigation */
    navigationMediaController(miniNavigationMediaWidth)
    window.addEventListener('resize',() => navigationMediaController(miniNavigationMediaWidth))
    document.querySelector('#button-guide').addEventListener('click',() => {
        needDisableResizeEvent = true

        if (document.body.classList.contains('full-guide')) {
            visibleMiniGuide()
        } else {
            visibleFullGuide()
        }
    })
}

function navigationMediaController(miniNavigationMediaWidth) {

    if (needDisableResizeEvent && window.innerWidth >= miniNavigationMediaWidth) return

    if (window.innerWidth <= miniNavigationMediaWidth) {
        visibleMiniGuide()
    } else {
        visibleFullGuide()
    }
}
function visibleMiniGuide() {
    document.body.classList.add('mini-guide')
    document.body.classList.remove('full-guide')
}
function visibleFullGuide() {
    document.body.classList.add('full-guide')
    document.body.classList.remove('mini-guide')
}