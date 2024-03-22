const mqtt = require("mqtt")

// Connect to the MQTT broker on localhost
const shelly = mqtt.connect("mqtt://192.168.141.180:1883")

// Topic to subscribe to
const topic = "shellies/shellyplug-s-B866F6/relay/0/power"

shelly.on("connect", () => {
  console.log("Connected to MQTT broker")
  shelly.subscribe(topic, (err) => {
    if (err) {
      console.error("Failed to subscribe to topic", err)
    } else {
      console.log(`Successfully subscribed to topic '${topic}'`)
    }
  })
})

// Handle incoming messages
shelly.on("message", (topic, message) => {
  console.log(`Received message on topic '${topic}': ${message.toString()}`)
})

// Listen for errors
shelly.on("error", (error) => {
  console.error("MQTT shelly error:", error)
})
