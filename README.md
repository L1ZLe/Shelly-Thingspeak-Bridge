# MQTT Bridge between ThingSpeak and Shelly Plug S

## Description

This JavaScript code establishes a connection between two MQTT brokers, one hosted by ThingSpeak and another by Shelly Plug S Plug S. It subscribes to specific topics on the Shelly Plug S broker to receive power and temperature data, then upon receiving both values, it publishes the data to the ThingSpeak broker for further processing.

## Installation

1. Clone the repository or download the JavaScript file.
2. Ensure you have Node.js installed on your system.
3. Install the MQTT module using npm:
   ```
   npm install mqtt
   ```

## Usage

1. Install and run Mosquitto MQTT broker:

   - Download and install Mosquitto from [https://mosquitto.org/download/](https://mosquitto.org/download/).
   - Start Mosquitto using the command (run as administrator):
     ```
     net start mosquitto
     ```

2. Configure the MQTT options for both ThingSpeak and Shelly Plug S brokers in the code.
3. Run the JavaScript file:
   ```
   node bridge.js
   ```

## How it Works

1. **Initialization**: The code first imports the MQTT module and defines MQTT options for both ThingSpeak and Shelly Plug S brokers.
2. **Connection Setup**: It establishes connections to both brokers using the specified options.
3. **Subscription**: The code subscribes to specific topics on the Shelly Plug S broker to receive power and temperature data.
4. **Message Handling**: When messages are received from the Shelly Plug S broker, it extracts the data, stores it, and publishes it to the ThingSpeak broker when both power and temperature values are received.
5. **Error Handling**: The code handles any connection errors that may occur.

## Connecting Shelly Plug S to MQTT using MQTT.fx (For visualization)

To connect Shelly Plug S devices to an MQTT broker using MQTT.fx (you can also use mosquitto as an alternative), follow these steps for MQTT.fx:

1. **Install MQTT.fx**: Download and install MQTT.fx on your laptop from [https://www.softblade.de](https://www.softblade.de).
2. **Configure MQTT Broker**: Open MQTT.fx and go to the "Settings" tab. Enter your IP address as the server address (we will use your laptop's IP address as an example), select the port (1883).
3. **Connect Device and Laptop**: Ensure both your Shelly Plug S device and laptop are connected to the same network.
4. **Access Shelly Plug S Device**: Log in to the Shelly Plug S device's web interface.
5. **Navigate to MQTT Settings**: In the settings menu, find the MQTT settings section.
6. **Configure MQTT Settings**: Enter the MQTT broker's IP address and port(your_laptop's_IP:1883). You dont need to enter the username and password.
7. **Topic Configuration**: Back to MQTT.fx to define topics to subscribe to.
8. **Save Settings**: Apply the changes and save the MQTT settings on both MQTT.fx and the Shelly Plug S device.

## Support

For help, please open an issue on the GitHub repository or contact [oundel.store@gmail.com](mailto:oundel.store@gmail.com).

## Authors and Acknowledgment

This code was written by Sami EL Yaagoubi.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Project Status

Development for this project is currently active.

Feel free to contribute to the project by opening pull requests or issues.
