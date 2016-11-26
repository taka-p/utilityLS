# utilityLS
ローカルストレージのラッパーライブラリ

https://github.com/taka-p/utilityLS

## 使い方

```
// 保存(オブジェクトに対応)
ULS.set(key, value);

// 取得
ULS.get(key);

// 削除
ULS.rm(key);
ULS.clear();

// 走査(配列/オブジェクトに対応)
ULS.each(target, function(item, index) {
 console.log(item, index);
});
```
