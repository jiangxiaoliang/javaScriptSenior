class User {
    // id: number
    // username: string
    // constructor(id: number, username: string) {
    //     this.id = id
    //     this.username = username
    // }
    constructor(public id: number, public username: string) {

    }

    postArticle(title: string, content: string): void {
        console.log(`${this.username}发表的了一篇文章:${title}`)
    }
}

class Vip extends User {
    constructor(id: number, username: string, public score = 0) {
        super(id, username)
    }

    // 重写
    // postArticle(title: string, content: string): void {
    //     this.score++
    //     console.log(`${this.username}发表的了一篇文章:${title}, 积分:${this.score}`)
    // }

    // 重载
    postArticle(title: string, content: string): void
    postArticle(title: string, content: string, file: string): void
    postArticle(title: string, content: string, file?: string): void {
        super.postArticle(title, content)
        if (file) {
            this.postAttachment(file)
        }
    }
    
    postAttachment(file: string): void {
        console.log(`${this.username}上传了一个附件：${file}`)
    }
}

// let user1 = new User(1, 'jxl')
// let user2 = new User(2, 'zsy')
// user1.postArticle('vue', 'vuevue')

let vip1 = new Vip(1, 'jxl')
vip1.postArticle('vue', 'vuevue')
vip1.postArticle('react', 'reactreact', '1.png')
// vip1.postAttachment('1.png')