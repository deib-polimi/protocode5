export const SmartPhones = [
    {
        name: 'iPhoneX',
        label: 'Phone: iOS (375x812) iPhone X',
        type: 'smartphone',
        platform: 'ios',
        //Altezza status bar in points
        viewTop: 50, // 87 - 37 status_bar
        //Altezza schermo in points
        viewBottom: 775, // 812 - 37 status bar
        //Dimensioni in points
        screenWidth: 375,
        screenHeight: 775, // 812 - 37 status bar
        //Dimensioni in px - padding css
        cssWidth: 375,
        cssHeight: 775 // 812 - 37 status bar
    },
    {
        name: 'iPhone7Plus',
        label: 'Phone: iOS (414x736) iPhone 7 Plus',
        type: 'smartphone',
        platform: 'ios',
        //Altezza status bar in points
        viewTop: 64,
        //Altezza schermo in points
        viewBottom: 736,
        //Dimensioni in points
        screenWidth: 414,
        screenHeight: 736,
        //Dimensioni in px - padding css
        cssWidth: 414,
        cssHeight: 736
    },
    {
        name: 'iPhone7',
        label: 'Phone: iOS (375x667) iPhone 7',
        type: 'smartphone',
        platform: 'ios',
        //Altezza status bar in points
        viewTop: 65,
        //Altezza schermo in points
        viewBottom: 667,
        //Dimensioni in points
        screenWidth: 375,
        screenHeight: 667,
        //Dimensioni in px - padding css
        cssWidth: 375,
        cssHeight: 667
    },
    {
        name: 'iPhone6Plus',
        label: 'Phone: iOS (414x736) iPhone 6 Plus',
        type: 'smartphone',
        platform: 'ios',
        //Altezza status bar in points
        viewTop: 64,
        //Altezza schermo in points
        viewBottom: 736,
        //Dimensioni in points
        screenWidth: 414,
        screenHeight: 736,
        //Dimensioni in px - padding css
        cssWidth: 414,
        cssHeight: 736
    },
    {
        name: 'iPhone6',
        label: 'Phone: iOS (375x667) iPhone 6',
        type: 'smartphone',
        platform: 'ios',
        //Altezza status bar in points
        viewTop: 65,
        //Altezza schermo in points
        viewBottom: 667,
        //Dimensioni in points
        screenWidth: 375,
        screenHeight: 667,
        //Dimensioni in px - padding css
        cssWidth: 375,
        cssHeight: 667
    },
    {
        name: 'iPhone5',
        label: 'Phone: iOS (320x568) iPhone 5',
        type: 'smartphone',
        platform: 'ios',
        //Altezza status bar in points
        viewTop: 65,
        //Altezza schermo in points
        viewBottom: 568,
        //Dimensioni in points
        screenWidth: 320,
        screenHeight: 568,
        //Dimensioni in px - padding css
        cssWidth: 320,
        cssHeight: 568
    },
    {
        name: 'GooglePixel',
        label: 'Phone: Android (411x731) Google Pixel ',
        type: 'smartphone',
        platform: 'android',
        //Altezza status bar(30) + toolbar(64) in dp
        viewTop: 93,
        //Altezza schermo (731) - altezza command bar(55) in dp
        viewBottom: 675,
        //Dimensioni in dp
        screenWidth: 411,
        screenHeight: 731,
        //Dimensioni in px - padding css
        cssWidth: 411,
        cssHeight: 731
    },
    {
        name: 'Nexus6P',
        label: 'Phone: Android (411x731) Nexus 6P ',
        type: 'smartphone',
        platform: 'android',
        //Altezza status bar(30) + toolbar(64) in dp
        viewTop: 93,
        //Altezza schermo (731) - altezza command bar(55) in dp
        viewBottom: 675,
        //Dimensioni in dp
        screenWidth: 411,
        screenHeight: 731,
        //Dimensioni in px - padding css
        cssWidth: 411,
        cssHeight: 731
    },
    {
        name: 'Nexus5',
        label: 'Phone: Android (360x640) Nexus 5 ',
        type: 'smartphone',
        platform: 'android',
        //Altezza status bar(23) + toolbar(56) in dp
        viewTop: 79,
        //Altezza schermo (640) - altezza command bar(47) in dp
        viewBottom: 593,
        //Dimensioni in dp
        screenWidth: 360,
        screenHeight: 640,
        //Dimensioni in px - padding css
        cssWidth: 360,
        cssHeight: 640
    }
];

export const Tablets = [
    {
        name: 'iPad12_9',
        label: 'Tablet: iOS (1366x1024) iPad Pro 12.9',
        type: 'tablet',
        platform: 'ios',
        //Altezza status bar in points
        viewTop: 65,
        //Altezza schermo in points
        viewBottom: 1024,
        //Dimensioni in points
        screenWidth: 1366,
        screenHeight: 1024,
        //Dimensioni in px - padding css
        cssWidth: 1366,
        cssHeight: 1024
    },
    {
        name: 'iPad9_7',
        label: 'Tablet: iOS (1024x768) iPad Air/Pro 9.7',
        type: 'tablet',
        platform: 'ios',
        //Altezza status bar in points
        viewTop: 65,
        //Altezza schermo in points
        viewBottom: 768,
        //Dimensioni in points
        screenWidth: 1024,
        screenHeight: 768,
        //Dimensioni in px - padding css
        cssWidth: 1024,
        cssHeight: 768
    },
    {
        name: 'Nexus7',
        label: 'Tablet: Android (960x600) Nexus 7 ',
        type: 'tablet',
        platform: 'android',
        //Altezza status bar(24) + toolbar(64) in dp
        viewTop: 88,
        //Altezza schermo (600) - altezza command bar(47) in dp
        viewBottom: 553,
        //Dimensioni in points
        screenWidth: 960,
        screenHeight: 600,
        //Dimensioni in px - padding css
        cssWidth: 960,
        cssHeight: 600
    },
    {
        name: 'Nexus9',
        label: 'Tablet: Android (1024x768) Nexus 9 ',
        type: 'tablet',
        platform: 'android',
        //Altezza status bar(24) + toolbar(64) in dp
        viewTop: 88,
        //Altezza schermo (768) - altezza command bar(47) in dp
        viewBottom: 721,
        //Dimensioni in points
        screenWidth: 1024,
        screenHeight: 768,
        //Dimensioni in px - padding css
        cssWidth: 1024,
        cssHeight: 768
    },
    {
        name: 'Nexus10',
        label: 'Tablet: Android (1280x800) Nexus 10 ',
        type: 'tablet',
        platform: 'android',
        //Altezza status bar(24) + toolbar(64) in dp
        viewTop: 88,
        //Altezza schermo (800) - altezza command bar(47) in dp
        viewBottom: 753,
        //Dimensioni in points
        screenWidth: 1280,
        screenHeight: 800,
        //Dimensioni in px - padding css
        cssWidth: 1280,
        cssHeight: 800
    }
];

export const SmartWatches = [
    {
        name: 'AppleWatch',
        label: 'WatchOS (156x195) Apple Watch 42mm',
        type: 'smartwatch',
        platform: 'watchos',
        viewTop: 22,
        viewBottom: 195,
        screenWidth: 156,
        screenHeight: 195,
        cssWidth: 156,
        cssHeight: 195
    },
    {
        name: 'AsusZenWatch',
        label: 'AndroidWear (213x213) Asus Zen Watch',
        type: 'smartwatch',
        platform: 'androidwear',
        viewTop: 0,
        viewBottom: 213,
        //Dimensioni in dp
        screenWidth: 213,
        screenHeight: 213,
        //Dimensioni in px - padding css
        cssWidth: 213,
        cssHeight: 213
    },
    {
        name: 'Moto360',
        label: 'AndroidWear (241x248) Moto 360',
        type: 'smartwatch',
        platform: 'androidwear',
        viewTop: 0,
        viewBottom: 248,
        //Dimensioni in dp
        screenWidth: 241,
        screenHeight: 248,
        //Dimensioni in px - padding css
        cssWidth: 241,
        cssHeight: 248
    }
];

export const Devices = [
    ...SmartPhones,
    ...Tablets,
    ...SmartWatches
];

export default Devices;