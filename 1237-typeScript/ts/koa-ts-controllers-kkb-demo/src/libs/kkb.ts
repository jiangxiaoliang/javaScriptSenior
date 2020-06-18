import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as glob from 'glob';

interface InitOptions {
    basePath: string,
    controllers: string
}

let methods: any[] = [];

export async function bootstrapControllers (
    app: Koa,
    options: InitOptions
) {

    /**
     * 把 options controllers 下面的所有文件进行读取，然后把类中通过get装饰过的方法添加到router中
     */
    let router = new KoaRouter();

    let controllers = glob.sync(options.controllers);

    // console.log(controllers);

    for (let controllerFile of controllers) {
        // console.log(controllerFile);
        let Controller = require(controllerFile).default;

        // console.log(Controller);
        console.log(methods);

        let controller = new Controller();

        console.log(controller.index)

        // router.get('/', async ctx => {
        //     let result = await controller.index();
        //     ctx.body = result;
        // });

        methods.forEach(m => {
            router.get(options.basePath + m.path, async ctx => {
                let result = await controller[m.method]();
                ctx.body = result;
            });
        })
    }

    // router.get('/', (new MainController).index)


    app.use( router.routes() );

}

// {
//     'MainController': {
//         'get': ['index']
// }
// }
export function Get(path: string) {
    return function(target: any, key: string, descriptor: any) {
        methods.push({
            path,
            method: key
        });
    }
}