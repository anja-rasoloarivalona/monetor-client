import global from './global.json'
import links from './links.json'
import header from './header.json'
import signup from './signup.json'
import login from './login.json'
import home from './home.json'
import setup from './setup.json'
import todo from './to-do.json'
import transactions from './transactions.json'

const lexique = { login, signup, home, setup, todo, transactions}

const getText = (locale, page) => {
    const text = {
        header: {},
        text: {},
        type: null,
        page: null
    }
    for(const i in header){
        text.header[i] = header[i][locale]
    }
    for(const i in global){
        text.text[i] = global[i][locale]
    }
    for(const i in links){
        text.text[i] = links[i][locale]
        if(page && links[i][locale] === page){
            text.type = links[i].type
            text.page = {
                id: links[i].page,
                locale: links[i][locale]
            }
            for(const t in lexique[links[i].page]     ){
                text.text[t] = lexique[links[i].page][t][locale] 
            }
        }
    }
    return text
}

export {
    getText
}