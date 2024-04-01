// #include <BTstackLib.h>
// #include <SPI.h>

// // Application state
// int counter[2] = {0, 0};
// BD_ADDR known_devices[2] = {BD_ADDR("DB:88:B6:70:9E:EB"),
//                             BD_ADDR("C9:60:BD:F2:B4:9D")};

// void advertisementCallback(BLEAdvertisement *bleAdvertisement);

// void setupBluetooth()
// {
//   Serial.begin(9600);
//   BTstack.setBLEAdvertisementCallback(advertisementCallback);
//   BTstack.setup();
//   BTstack.bleStartScanning();
// }

// void loopScan()
// {
//   BTstack.loop();
// }

// void advertisementCallback(BLEAdvertisement *bleAdvertisement)
// {
//   if (!(bleAdvertisement->isIBeacon()))
//   {
//     Serial.print("Device discovered: ");
//     Serial.println(bleAdvertisement->getBdAddr()->getAddressString());
//     for (size_t i = 0; i < sizeof(counter) / sizeof(int); i++)
//     {
//       if (memcmp(bleAdvertisement->getBdAddr()->getAddress(),
//                  known_devices[i].getAddress(), sizeof(known_devices[i])) == 0)
//       {
//         counter[i]++;
//         Serial.printf("Known device: %s, has been discovered %d times.\n",
//                       known_devices[i].getAddressString(), counter[i]);
//       }
//     }
//   }
// }