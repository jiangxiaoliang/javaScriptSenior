##前后端交互01

## 课堂目标

1. 理解ajax基本使用
2. 会使用XMLHttpRequest对象实现数据交互
3. 了解onreadystatechange服务器响应信息
4. 会使用FormData对象上传文件
5. 了解upload事件对象

## 知识要点

1. ajax使用
2. XMLHttpRequest对象
3. FormData对象
4. upload 事件对象

## 登录简单回顾

 1、提出ajax验证用户名需求；

2、如果通过跳转解决很麻烦；



## 利用ajax来解决验证用户名问题

- ajax是：	*Ajax* 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML）

- ajax的基本使用；

  - 新建XMLHttpRequest对象；

    ```js
    let xhr = new XMLHttpRequest();
    ```

  - 配置请求参数

    ```js
    xhr.open("get","/checkUser",true); //true是异步，false是同步
    ```

  - 接收返还值

    ```js
     xhr.onload = function(){
        let res = JSON.parse(xhr.responseText);
     }
    ```

  - 发送服务器

    ```
    xhr.send();
    ```

## 针对ajax的详细解释

- get注意点
  - get通过parmas传参
  - get和querystring的问题,通过url传参

- post注意点

  - 发送数据时候需要设置http正文头格式；

    ```js
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  //默认编码
    xhr.setRequestHeader("Content-type","multipart/form-data");  //二进制编码
    xhr.setRequestHeader("Content-type","application/json");  //json编码
    ```

  - 获取头部信息；
    - getAllResponseHeaders  或者是getResponseHeader  ；

## onreadystatechange

onreadystatechange：存有处理服务器响应的函数，每当 readyState 改变时，onreadystatechange 函数就会被执行。

readyState：存有服务器响应的状态信息。

- 0: 请求未初始化（代理被创建，但尚未调用 open() 方法）
- 1: 服务器连接已建立（`open`方法已经被调用）
- 2: 请求已接收（`send`方法已经被调用，并且头部和状态已经可获得）
- 3: 请求处理中（下载中，`responseText` 属性已经包含部分数据）
- 4: 请求已完成，且响应已就绪（下载操作已完成）

status常用状态码

<table>
  <tr>
  <td>HTTP状态码</td>
  <td>描述</td>
  </tr> 
  <tr>
  <td>100</td>
  <td>继续。继续响应剩余部分，进行提交请求</td>
  </tr>
  <tr>
  <td>200</td>
  <td>成功</td>
  </tr>
  <tr>
  <td>301</td>
  <td>永久移动。请求资源永久移动到新位置</td>
  </tr>
  <tr>
  <td>302</td>
  <td>临时移动。请求资源零时移动到新位置</td>
  </tr>
  <tr>
  <td>304</td>
  <td>未修改。请求资源对比上次未被修改，响应中不包含资源内容</td>
  </tr>
  <tr>
  <td>401</td>
  <td>未授权，需要身份验证</td>
  </tr>
  <tr>
  <td>403</td>
  <td>禁止。请求被拒绝</td>
  </tr>
  <tr>
  <td>404</td>
  <td>未找到，服务器未找到需要资源</td>
  </tr><tr>
  <td>500</td>
  <td>服务器内部错误。服务器遇到错误，无法完成请求</td>
  </tr>
  <tr>
  <td>503</td>
  <td>服务器不可用。临时服务过载，无法处理请求</td>
  </tr>
</table>



- 返还数据类型  

  - 服务器返还json数据

    ```js
    xhr.responseText  //来获取
    ```

  - 服务器返还xml数据

    ```js
    xhr.responseXML //获取值
    ```
    
    - 重写response里的content-type内容
    - xhr.overrideMimeType('text/xml; charset = utf-8')

- 同步及异步ajax；

  - 设置true和false区别；


##利用FormData来实现文件上传

- 创建FormData对象

- 监控上传进度

  upload 事件

  - onloadstart   上传开始
  - onprogress  数据传输进行中
    - evt.total ：需要传输的总大小；
    - evt.loaded :当前上传的文件大小；
  - onabort 上传操作终止
  - onerror  上传失败
  - onload 上传成功
  - onloadend 上传完成（不论成功与否）
  



## 回顾

1.ajax基本使用

2.get/post在ajax中的使用

3.ajax中成功的返还

4.返还数据格式

5.FormData对象

6.upload事件对象