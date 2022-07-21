# Firebase Cloud Messaging

一個 Google 提供的 **免費** Pub/Sub 服務，可支援推播訊息至 iOS、Android、Web、Unity、Flutter

## Table of Contents

- [Firebase Cloud Messaging](#firebase-cloud-messaging)
  - [Table of Contents](#table-of-contents)
  - [既然是免費，使用上有哪些限制?](#既然是免費使用上有哪些限制)
  - [建立 Firebase 專案](#建立-firebase-專案)
  - [產生推播公鑰 (Client 使用)](#產生推播公鑰-client-使用)
  - [產生帳戶私鑰 (Server 使用)](#產生帳戶私鑰-server-使用)
  - [簡單測試小專案 (Golang -> Web)](#簡單測試小專案-golang---web)
  - [DEMO](#demo)
  - [關於 Registration Token](#關於-registration-token)
  - [參考資料](#參考資料)

## 既然是免費，使用上有哪些限制?

[資訊以官方最新說明為主](https://firebase.google.com/docs/cloud-messaging/concept-options#throttling-and-scaling)

- Maximum message rate to a single device
  - 每分鐘 240 則， 每小時 5,000 則
- Upstream message
  - 單個專案: 每分鐘 1,500,000 則
  - 單台設備: 每分鐘 1,000 則
- Topic message
  - 訂閱與退訂: 3,000 QPS

## 建立 Firebase 專案

1. [使用 Google 帳號登入](https://console.firebase.google.com/)
2. 開新專案
   ![開新專案](https://i.imgur.com/TJivJAZ.png)
3. 新增應用程式 (可選 iOS、Android、Web、Unity、Flutter)
   ![首頁新增](https://i.imgur.com/18exAVd.png)
4. 跟著指引跑完 SDK 設定和配置即可往下

## 產生推播公鑰 (Client 使用)

1. 找到專案總覽 > 齒輪 > 專案設定
   ![專案設定](https://i.imgur.com/FStnzsU.png)
2. 切換至雲端通訊 > Generate key pair
   ![Generate key pai](https://i.imgur.com/9wB2U60.jpg)
3. 後面小專案的 client 會用到此 `PUBLIC_KEY`，可以先記下來

## 產生帳戶私鑰 (Server 使用)

- 找到專案總覽 > 齒輪 > 專案設定 > 服務帳戶
- 選擇開發用的語言 (這邊是使用 Go) > 產生新的私密金鑰
  ![產生私鑰](https://i.imgur.com/rVTfPUa.png)
- 將這份 JSON 載下來並取名成 `service-account-key.json` 放到 server 根目錄

## 簡單測試小專案 (Golang -> Web)

- [Source Code](https://github.com/rich840213/fcm-web-lab)
- 需要先修改的地方
  - Client
    - `client/.env` -> REACT_APP_VAPID_KEY (上面取得的 PUBLIC_KEY)
    - `client/public/firebase-messaging-sw.js` -> config
    - `client/src/firebaseInit.js` -> config
  - Server
    - `server/main.go` -> registrationToken
- Client: `yarn start`
- Server: `go run main.go`

## DEMO

- 當頁面於前景時
  ![前景](https://i.imgur.com/xBQB7yt.png)
- 當頁面於背景時 (如果沒反應請允許 Browser 通知權限)
  ![背景](https://i.imgur.com/zEaWC1E.png)

## 關於 Registration Token

- registration token 是由 client 提供，一般在 client 取得後會傳至 server 儲存起來供 server 發送訊息時取用
- FCM 會透過這個 token 找到 client，並傳送我們預期的資料給它
- 此 token 可能會過期，需要確保 server 持有有效的 registration token
- https://firebase.google.com/docs/cloud-messaging/manage-tokens

## 參考資料

- client 修改自 https://github.com/AseemWangoo/expriments_with_react
- [官網](https://firebase.google.com/docs/cloud-messaging)
