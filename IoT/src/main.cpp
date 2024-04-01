#include "Arduino.h"
#include <PubSubClient.h>
#include "secrets.h"
#include <WiFi.h>
#include <BluetoothScanner.cpp>
#include <BTstackLib.h>
#include <SPI.h>

#define MQTT_SCAN_RESULT_TOPIC "scan_result"

// void loopScan(void);
void mqttPublishA0Status();
void mqttPublishLEDStatus();
void mqttCommandReceived(char *topic, byte *payload, unsigned int length);

struct ScanResult
{
   uint64_t timestamp; // Timestamp of the scan result
   BD_ADDR address;    // Bluetooth device address
   int rssi;           // Received Signal Strength Indicator (RSSI) of the device
};

void publishScanResult(ScanResult *scanResult);

ScanResult createScanResult(BLEAdvertisement *advertisment, int rssi)
{
   ScanResult result;
   result.timestamp = millis();
   result.address = advertisment->getBdAddr()->getAddressString();
   result.rssi = rssi;
   return result;
}

// Defines
#define DEBUG 1 ///< The mode of operation; 0 = normal, 1 = debug.

// Global Constants
// Secrets stored in secrets.h file
const char WiFiSSID[] = WIFI_SSID;                      ///< The WiFi network SSID (name).
const char WiFiPassword[] = WIFI_PASSWORD;              ///< The WiFi network password.
const char MQTTBrokerIP[] = MQTT_BROKER_IP;             ///< The MQTT broker IP address.
const uint16_t MQTTBrokerPort = MQTT_BROKER_PORT;       ///< The MQTT broker port.
const char MQTTBrokerUsername[] = MQTT_BROKER_USERNAME; ///< The MQTT broker username.
const char MQTTBrokerPassword[] = MQTT_BROKER_PASSWORD; ///< The MQTT broker password.
const char MQTTClientID[] = MQTT_CLIENT_ID;             ///< The MQTT client ID.

// Global Variables
uint8_t previousLEDValue = LOW; ///< The previous value of the on-board LED.
int previousA0Value = 0;        ///< The previous value of the A0 analog input pin.

// Global Instances
WiFiClient wifiClient;               ///< The instance of the WiFi client.
PubSubClient mqttClient(wifiClient); ///< The instance of the MQTT client.

// Application state // unnessacary
int counter[2] = {0, 0};
BD_ADDR known_devices[2] = {BD_ADDR("DB:88:B6:70:9E:EB"),
                            BD_ADDR("C9:60:BD:F2:B4:9D")};

void advertisementCallback(BLEAdvertisement *bleAdvertisement);

void setupBluetooth()
{
   // Serial.begin(9600);
   BTstack.setBLEAdvertisementCallback(advertisementCallback);
   BTstack.setup();
   BTstack.bleStartScanning();
}

void loopScan()
{
   BTstack.loop();
}

void advertisementCallback(BLEAdvertisement *bleAdvertisement)
{
   if (!(bleAdvertisement->isIBeacon()))
   {
      Serial.print("Device discovered: ");
      Serial.println(bleAdvertisement->getBdAddr()->getAddressString());
      for (size_t i = 0; i < sizeof(counter) / sizeof(int); i++)
      {
         if (memcmp(bleAdvertisement->getBdAddr()->getAddress(),
                    known_devices[i].getAddress(), sizeof(known_devices[i])) == 0)
         {
            counter[i]++;
            Serial.printf("Known device: %s, has been discovered %d times.\n",
                          known_devices[i].getAddressString(), counter[i]);
         }
      }
      ScanResult scanResult = createScanResult(bleAdvertisement, 1);
      publishScanResult(&scanResult);
   }
}

void publishScanResult(ScanResult *scanResult)
{
   char message[100];
   snprintf(message, sizeof(message), "Device discovered: %s", scanResult->address);

   // Publish to MQTT topic
   if (mqttClient.connected())
   {
      mqttClient.publish(MQTT_SCAN_RESULT_TOPIC, message);
   }
   else
   {
      Serial.println("ERROR: MQTT client not connected");
   }
}

// Functions
/**
 * Configures the MQTT client.
 */
void configureMQTTClient()
{
   mqttClient.setServer(MQTTBrokerIP, MQTTBrokerPort);
   mqttClient.setCallback(mqttCommandReceived);
}

/**
 * Initializes the Serial Monitor.
 */
void configureSerialMonitor()
{
   Serial.begin(9600); // initialize serial bus
   while (!Serial)
      ; // wait for serial connection
}

/**
 * Connects to the MQTT broker.
 */
void connectMQTTBroker()
{
   // Connect to MQTT broker
   if (DEBUG)
   {
      Serial.print("Connecting to MQTT broker (");
      Serial.print(MQTTBrokerIP);
      Serial.print(")...");
   }
   while (!mqttClient.connected())
   {
      if (mqttClient.connect(MQTTClientID))
      {
         if (DEBUG)
            Serial.println("connected.");
      }
      else
      {
         delay(1000); // wait 1 second for connection
         if (DEBUG)
         {
            Serial.print(".");
            // The following is used for debugging connection failures
            // Serial.print("\nERROR: Client failed to connect with error code: ");
            // Serial.println(mqttClient.state());
         }
      }
   }
}

/**
 * Connects to the WiFi network.
 */
void connectWiFiNetwork()
{
   // Check WiFi module connection
   if (WiFi.status() == WL_NO_MODULE)
   {
      if (DEBUG)
         Serial.println("ERROR: Communication with WiFi module failed.");
      while (true)
         ; // don't continue
   }
   else
   {
      if (DEBUG)
         Serial.println("WiFi module found.");
   }

   // Check WiFi module firmware
   if (DEBUG)
   {
      String version = WiFi.firmwareVersion();
      if (version < WIFI_FIRMWARE_LATEST_VERSION)
      {
         Serial.println("Please upgrade the WiFi module firmware.");
      }
   }

   // Connect to WiFi network
   if (DEBUG)
   {
      Serial.print("Connecting to WiFi network (");
      Serial.print(WiFiSSID);
      Serial.print(")...");
   }
   // Connect to WPA/WPA2 network.  Change the begin() arguments if using open or WEP network.
   WiFi.begin(WiFiSSID, WiFiPassword);
   while (WiFi.status() != WL_CONNECTED)
   {
      delay(1000); // wait 1 second for connection
      if (DEBUG)
         Serial.print(".");
   }
   if (DEBUG)
      Serial.println("connected.");
}

/**
 * Checks the status of the current A0 and LED_BUILTIN values and reports any
 * significant changes to the MQTT broker.
 */
void mqttCheckAndReportStatus()
{
   // A0 Status
   int currentA0Value = analogRead(A0);
   if (abs(currentA0Value - previousA0Value) > 100)
   {
      mqttPublishA0Status();
   }

   // LED Status
   uint8_t currentLEDValue = digitalRead(LED_BUILTIN);
   if (currentLEDValue != previousLEDValue)
   {
      mqttPublishLEDStatus();
   }
}

/**
 * The callback function that gets called when an MQTT message is received from
 * the broker.
 *
 * Parses and processes the incoming MQTT command (message).
 *
 * @param topic    The topic of the incoming MQTT based command.
 * @param payload  The message of the incoming MQTT based command.
 * @param length   The message length of the incoming MQTT based command.
 */
void mqttCommandReceived(char *topic, byte *payload, unsigned int length)
{
   // Convert payload bytes to message C-string
   char message[length + 1];
   for (unsigned int i = 0; i < length; i++)
   {
      message[i] = (char)payload[i];
   }
   message[length] = '\0';

   // Print command
   if (DEBUG)
   {
      Serial.print("Command received: ");
      Serial.print(topic);
      Serial.print(" ");
      Serial.println(message);
   }

   // Process command
   char commandA0[sizeof(MQTTClientID) + sizeof("/command/A0")] = "";
   strcat(commandA0, MQTTClientID);
   strcat(commandA0, "/command/A0");
   char commandLED[sizeof(MQTTClientID) + sizeof("/command/LED")] = "";
   strcat(commandLED, MQTTClientID);
   strcat(commandLED, "/command/LED");
   if (!strcmp(topic, commandA0) && !strcmp(message, "get"))
   {
      mqttPublishA0Status();
   }
   else if (!strcmp(topic, commandLED) && !strcmp(message, "get"))
   {
      mqttPublishLEDStatus();
   }
   else if (!strcmp(topic, commandLED) && !strcmp(message, "on"))
   {
      digitalWrite(LED_BUILTIN, HIGH);
      if (DEBUG)
         Serial.println("Turned on LED.");
      mqttPublishLEDStatus();
   }
   else if (!strcmp(topic, commandLED) && !strcmp(message, "off"))
   {
      digitalWrite(LED_BUILTIN, LOW);
      if (DEBUG)
         Serial.println("Turned off LED.");
      mqttPublishLEDStatus();
   }
   else
   {
      if (DEBUG)
         Serial.println("ERROR: Unknown command.");
   }
}

/**
 * Publishes the status (value) of the A0 analog input pin to the MQTT broker.
 */
void mqttPublishA0Status()
{
   char topic[sizeof(MQTTClientID) + sizeof("/status/A0")] = "";
   strcat(topic, MQTTClientID);
   strcat(topic, "/status/A0");
   int currentA0Value = analogRead(A0);
   char status[5] = "";
   itoa(currentA0Value, status, 10); // convert integer reading to C-string
   if (mqttClient.publish(topic, status, true))
   { // retain = true
      if (DEBUG)
      {
         Serial.print("Status published: ");
         Serial.print(topic);
         Serial.print(" ");
         Serial.println(status);
      }
      previousA0Value = currentA0Value;
   }
   else
   {
      if (DEBUG)
         Serial.println("ERROR: Unable to publish A0 status.");
   }
}

/**
 * Publishes the status (state) of the LED_BUILTIN pin to the MQTT broker.
 */
void mqttPublishLEDStatus()
{
   char topic[sizeof(MQTTClientID) + sizeof("/status/LED")] = "";
   strcat(topic, MQTTClientID);
   strcat(topic, "/status/LED");
   uint8_t currentLEDValue = digitalRead(LED_BUILTIN);
   char status[4] = "";
   strcpy(status, currentLEDValue == HIGH ? "on" : "off");
   if (mqttClient.publish(topic, status, true))
   { // retain = true
      if (DEBUG)
      {
         Serial.print("Status published: ");
         Serial.print(topic);
         Serial.print(" ");
         Serial.println(status);
      }
      previousLEDValue = currentLEDValue;
   }
   else
   {
      if (DEBUG)
         Serial.println("ERROR: Unable to publish LED status.");
   }
}

/**
 * Subscribes to commands (topics) from the MQTT broker.
 */
void mqttSubscribeToCommands()
{
   char topic[sizeof(MQTTClientID) + sizeof("/command/#")] = "";
   strcat(topic, MQTTClientID);
   strcat(topic, "/command/#");
   if (mqttClient.subscribe(topic, 1))
   { // QoS = 1
      if (DEBUG)
      {
         Serial.print("Subscribed to topic: ");
         Serial.println(topic);
      }
   }
   else
   {
      if (DEBUG)
      {
         Serial.print("ERROR: Unable to subscribe to topic: ");
         Serial.println(topic);
      }
   }
}

/**
 * The standard Arduino setup function used for setup and configuration tasks.
 */
void setup()
{
   // Pin configuration
   pinMode(LED_BUILTIN, OUTPUT);
   // setupBluetooth();
   // Serial Monitor
   if (DEBUG)
      configureSerialMonitor();

   // ble
   setupBluetooth();

   // WiFi and MQTT connections
   configureMQTTClient();
   connectWiFiNetwork();
   connectMQTTBroker();

   // Publish initial status
   mqttPublishA0Status();
   mqttPublishLEDStatus();

   // Subscribe to commands
   mqttSubscribeToCommands();
}

/**
 * The standard Arduino loop function used for repeating tasks.
 */
void loop()
{
   // Keep broker connected
   // loopScan();
   if (!mqttClient.connected())
   {
      connectMQTTBroker();
      mqttSubscribeToCommands();
   }

   // Listen for incoming commands
   mqttClient.loop();
   loopScan();

   // Report status changes
   mqttCheckAndReportStatus();
}
