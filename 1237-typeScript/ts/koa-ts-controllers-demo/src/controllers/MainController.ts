import {Controller, Get} from 'koa-ts-controllers';

@Controller('/')
export class MainController {


    @Get('')
    index() {
        return 'Hello Kaikeba';
    }

}