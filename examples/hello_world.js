import { startApp, Router } from '../V';

@Router.get({
	'/': 'Hello, world !'
})
class App {
	port = 1234
}

startApp(App).then(port => console.log(`a app started at port: ${port} !`));