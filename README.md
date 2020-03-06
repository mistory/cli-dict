# cli-dict

命令行翻译工具

## 安装
``` bash
  $ npm install cli-dict -g
```

## 使用

支持中英互译

**Example**
``` bash
  $ dict hello world
  > 你好世界
  
  $ dict 然
  > pron. [rán]
    conj. but；however
    adj. right
    vt. correct
    adv. so；nevertheless

  $ dict deficiency
  > pron. [dɪˈfɪʃnsi]
    n. 缺陷，缺点；缺乏；不足的数额

```

**Options**
``` bash
  $ dict -h

  Usage: index [options]

  Options:

    -V, --version        output the version number
    -s, --source [name]  specify translation source
    -h, --help           output usage information
```

## 其他

目前翻译源为有道翻译
