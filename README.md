##マーチングアプリ

# URL
https://port-0-dating-app-by-nextjs-euegqv2llofjlcjn.sel5.cloudtype.app/

```
npm run json-server
```

```

neo4j

label
    People
        - description : 会員情報
        - properties
            1. userId
            2. userName
            3. password
    Community
        - description : 趣味
        - node
            - グルメ系
            - アウトドア系
            - ペット系
            - 癒し系
    Age
        - description : 年齢
        - node
            - 20代
            - 30代
            - 40代
            - 50代
    Salay
        - description : 年収
        - node
            - 500未満
            - 600未満
            - 700未満
            - 800未満
            - 900未満
            - 1000未満

relationships
    People - People
        1. love
            - description : いいね
        2. favorite
            - description : 気に入る

```