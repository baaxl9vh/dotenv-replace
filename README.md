
.env 文件配置项值替换，用于CI/CD时替换生产配置

## 安装

```shell
npm install --save-dev dotenv-replace
```

## 使用

替换当前目录中的.env文件的配置，默认文件编码UTF8

```shell
npx dotenv-replace HOST=127.0.0.1
```

替换path/to/.env文件的配置，文件编码UTF8

```shell
npx dotenv-replace -f path/to/.env -e utf8 HOST=0.0.0.0
```
