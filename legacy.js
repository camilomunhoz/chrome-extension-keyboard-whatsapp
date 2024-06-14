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