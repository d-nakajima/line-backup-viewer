# line-backup-viewer

- Notion: https://www.notion.so/12e10ea0320980c7a95edeae0ebd5221?v=53540d5331804092a0f52c4dc5d0b738

## プロジェクト構成

### /firebase (Firebase)

Hostingとバックアップデータの保存

#### AppHosting

- hosting先として利用
- prod/devの環境と、必要に応じて検証用環境を用意

#### Storage

```
[RoomID]/
  text.txt
```

#### Firestore

```
rooms/
  [room]
```

##### room

```ts
type Room {
  own: {
    name: string
    photo: string
  }
  opposite: {
    name: string
    photo?: string
  }
}
```

### /main_app (NextJS)

アプリ本体

#### 全文検索

軽量全文検索エンジンライブラリ [elasticlunr.js](https://github.com/weixsong/elasticlunr.js) を利用

#### UI

- Tailwind + StyleProps
- できるだけLINEと似たUIにする


#### ページ構成

```
Top (トークルーム一覧, トークルーム作成)
  - トークルーム (トーク一覧, 検索窓, アイコン/表示名編集)
```

#### ディレクトリ構成

```
|- app/
|  |- (route)
|    |- _components/
|    |- layout.ts
|    |- page.ts
|    |- [room]
|      |- _components/
|      |- page.ts
|- hooks/
|- types/
|- libs/
|- utils/
```
