console.log("a文件");
// 导入b模块和导出对象；
define(["b"],function(res){
    console.log("b导出的",res);
    return {
        name:"张三",
        age:20
    }
});