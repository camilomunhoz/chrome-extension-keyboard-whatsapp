let messages = document.querySelectorAll('.message-in > div, .message-out > div')
let messagesContent = document.querySelectorAll('.message-in .copyable-text, .message-out .copyable-text')

messages.forEach(item => {
	item.addEventListener('mouseenter', e => {
		e.currentTarget.querySelectorAll('.copyable-text').forEach(item => {
			item.style.opacity = '1'
		})
	})
	item.addEventListener('mouseleave', e => {
		e.currentTarget.querySelectorAll('.copyable-text').forEach(item => {
			item.style.opacity = '0'
		})
	})
})

messagesContent.forEach(item => {
	item.style.transition = 'opacity .3s ease'
	item.style.opacity = '0'
})

/********************************************************************************************************* */

function getChat() {
    return document.querySelector('.copyable-area')
}

function getInput() {
    return document.querySelector('.lexical-rich-text-input')
}

function getLastMessageSent() {
    return Array.from(document.querySelectorAll('.message-out')).at(-1)
}

function editLastMessage(event) {
    if (event.key === ' ') {
        // getPopover().style.visibility = 'hidden'

        getLastMessageSent()
            .querySelector('[data-js-context-icon="true"]')
            .click()

        setTimeout(_ => {
            document.querySelector('[data-animate-dropdown-item="true"] [aria-label="Editar"]')
                .click()
        }, 10)
    }
}

function enterNavigation(event) {
    if (event.ctrlKey && event.key === ' ') {
        console.log('unfocus')
        getChat().focus()
    }
}

getInput().addEventListener('keydown', enterNavigation)

getChat().addEventListener('keydown', editLastMessage)

/********************************************************************************************************* */

function addEditButton(event) {
    const btn = document.createElement('div');
    btn.style.cssText = `
        height: 24px;
        width: 24px;
        background: #00cbff;
        position: absolute;
        right: 30px;
        top: 5px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 9999;
    `
    btn.classList.add('venom__edit');

    btn.addEventListener('click', () => {
        document
            .querySelector('[data-js-context-icon="true"]')
            .click()

        setTimeout(_ => {
            document.querySelector('[data-animate-dropdown-item="true"] [aria-label="Editar"]')
                .click()
        }, 1)
    })

    const container = event.currentTarget.querySelector(':scope > div')
    container.style.position = 'relative'
    container.appendChild(btn);
}

function dropEditButton(event) {
    var venomEdit = event.currentTarget.querySelector('.venom__edit');
    if (venomEdit) {
        venomEdit.remove();
    }
}

const forceEditInterval = setInterval(initListeners, 500)

function initListeners() {
    document.querySelectorAll('.message-out').forEach((element) => {
        element.removeEventListener('mouseenter', addEditButton)
        element.removeEventListener('mouseleave', dropEditButton);
        element.addEventListener('mouseenter', addEditButton)
        element.addEventListener('mouseleave', dropEditButton);
    });
}