import Application from './application';

function start(callback) {
    const app = new Application();
    app.use(async (cx, next) => {
        cx.body = 'hello, world!';
    });
    app.listen(1234, p => {
        console.log(p)
    });
    return app;
}

export default start;