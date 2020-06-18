import {Controller, Get} from 'koa-ts-controllers';

@Controller('/user')
export class UserController {

    @Get('/signin')
    signin() {
        return '注册';
    }

    @Get('/signup')
    signup() {
        return '登陆';
    }

}