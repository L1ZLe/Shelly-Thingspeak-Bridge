const mqtt = require("mqtt")
const thingspeakOptions = {
  host: "mqtt3.thingspeak.com",
  port: 1883,
  clientId: "JBgKGi81JyEjByUGMwkZDRU",
  username: "JBgKGi81JyEjByUGMwkZDRU",
  password: "SX5RjrLqIZg5pW33rAPy1qfV",
}

const thingspeak = mqtt.connect(thingspeakOptions)

thingspeak.on("connect", () => {
  thingspeak.subscribe("channels/2477356/publish", (err) => {
    if (!err) {
      thingspeak.publish(
        "channels/2477356/publish",
        "field1=0&field2=10&status=MQTTPUBLISH"
      )
    }
  })
})

thingspeak.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString())
  thingspeak.end()
})
