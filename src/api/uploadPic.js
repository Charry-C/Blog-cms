import PicGo from 'picgo'

const picgo = new PicGo()
picgo.use(browserAdapter, 'uploader') // 使用 browser-adapter 作为上传器
picgo.setConfig({
    picBed: {
        current: 'github',
        github: {
            repo: 'Charry-C/Blog-picture', // 仓库名，格式是 username/reponame
            token: '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', // github token
            path: '', // 自定义存储路径，比如 img/
            customUrl: '', // 自定义域名，注意要加 http://或者 https://
            branch: 'main' // 分支名，默认是 main
        }
    }
})
