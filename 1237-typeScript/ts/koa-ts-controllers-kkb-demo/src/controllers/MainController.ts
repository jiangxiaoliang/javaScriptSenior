import {Get} from '../libs/kkb'

export default class MainController {

    @Get('/')
    index() {
        // ctx.body = 'hello';
        return 'hello';
    }

    @Get('/user')
    user() {
        // ctx.body = 'hello';
        return 'user';
    }

}