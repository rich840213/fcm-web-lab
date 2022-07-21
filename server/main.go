package main

import (
	"fmt"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
)

func main() {
	ctx := context.Background()

	// Initializing
	opt := option.WithCredentialsFile("service-account-key.json")
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	client, err := app.Messaging(ctx)
	if err != nil {
		log.Fatalf("error getting messaging client: %v\n", err)
	}
	// Registration token to send a message to.
	// 這個 token 是由 client 提供，一般在 client 取得後會傳至 server 儲存起來供 server 發送訊息時取用
	// FCM 會透過這個 token 找到 client，並傳送我們預期的資料給它
	// 此 token 可能會過期，需要確保 server 持有有效的 registration token
	// https://firebase.google.com/docs/cloud-messaging/manage-tokens
	registrationToken := "由 CLIENT 提供"

	// Send messages to topics
	// https://firebase.google.com/docs/cloud-messaging/send-message#send-messages-to-topics-legacy
	// Note: "/topics/" prefix should not be provided.
	// topic := "hello"

	// See documentation on defining a message payload.
	// https://firebase.google.com/docs/cloud-messaging/concept-options#notifications_and_data_messages
	message := &messaging.Message{
		Notification: &messaging.Notification{
			Title: "test",
			Body:  "hello world",
		},
		Data: map[string]string{
			"foo": "bar",
		},
		Token: registrationToken,
		// Topic: topic,
	}
	// Send a message to the device corresponding to the provided
	// registration token.
	response, err := client.Send(ctx, message)
	if err != nil {
		log.Fatalln(err)
	}
	// Response is a message ID string.
	fmt.Println("successfully sent message:", response)
}
