curl 'https://api.twilio.com/2010-04-01/Accounts/AC506e5d9f84f88bf16c657cd783971326/Messages.json' -X POST --data-urlencode 'To=+1(DESTINATION)' --data-urlencode 'Body=(Message)' --data-urlencode 'From=(TWILIO_PHONE_NUMBER)' -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN