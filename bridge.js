const mqtt = require("mqtt")

// ThingSpeak MQTT options
const thingspeakOptions = {
  host: "mqtt3.thingspeak.com",
  port: 1883,
  clientId: "YOUR_CLIENT_ID", // Replace with your client ID
  username: "YOUR_USERNAME", // Replace with your username should be the same as the client ID
  password: "YOUR_PASSWORD", // Replace with your password
}

// Connect to ThingSpeak MQTT broker
const thingspeak = mqtt.connect(thingspeakOptions)

// Shelly MQTT connection
const shelly = mqtt.connect("mqtt://Your_Laptop_IP:1883") // Replace with your laptop's IP address

// Topics to subscribe to from Shelly
const powerTopic = "shellies/shellyplug-s-<Your_Device_ID>/relay/0/power" // Replace with your Shelly Plug S ID
const temperatureTopic = "shellies/shellyplug-s-<Your_Device_ID>/temperature"
// Define them variables to store the values
let powerValue = null
let temperatureValue = null

shelly.on("connect", () => {
  // what "connect" does is to subscribe to the topics that we want to receive
  // what shelly.on does is to call the function that is passed as the first argument
  console.log("Connected to Shelly MQTT broker")
  shelly.subscribe([powerTopic, temperatureTopic], (err) => {
    if (err) {
      console.error("Failed to subscribe to Shelly topics", err)
    } else {
      console.log(`Successfully subscribed to Shelly the topics'`)
    }
  })
})

// Handle incoming messages from Shellyk
shelly.on("message", (topic, message) => {
  // what "message" does is to get the message that was sent by the topic
  console.log(
    `Received message on the topic: '${topic}': ${message.toString()}`
  )
  // store the message value in its respective variable
  if (topic === powerTopic) {
    powerValue = message.toString()
  } else if (topic === temperatureTopic) {
    temperatureValue = message.toString()
  }

  // Publish to ThingSpeak when both values are received
  if (powerValue !== null && temperatureValue !== null) {
    thingspeak.publish(
      "channels/<Channel_ID>/publish", // Replace with your ThingSpeak channel ID
      `field1=${powerValue}&field2=${temperatureValue}&status=MQTTPUBLISH`
    )
    powerValue = null
    temperatureValue = null
  }
})

// Listen for errors
shelly.on("error", (error) => {
  console.error("MQTT Shelly error:", error)
})

// ThingSpeak MQTT connection established
thingspeak.on("connect", () => {
  console.log("Connected to ThingSpeak MQTT broker")
})

thingspeak.on("message", (topic, message) => {
  // i wrote this to see what the message looks like
  console.log(message.toString())
  thingspeak.end()
})
