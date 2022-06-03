## POST Request to SEND SMS to number
curl 'https://api.twilio.com/2010-04-01/Accounts/AC506e5d9f84f88bf16c657cd783971326/Messages.json' -X POST --data-urlencode 'To=+1(DESTINATION)' --data-urlencode 'Body=(Message)' --data-urlencode 'From=(TWILIO_PHONE_NUMBER)' -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

## To RECEIVE incomming SMS
Use Google's Firebase app... or something to send a push notification to your device.
Upon receiving the push notification, have your device make a request to the server to sync the newest messages.

## To RECEIVE incomming Voicemail
Have a push notification sent to your app
Have your app, upon receiving the push notification, list the urls for retrieving those voicemails
Download those voice mails (needs files permission, and a place to store them)
Use another app to play the audio.