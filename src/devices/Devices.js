export const SmartPhones = [
    {
        name: 'iPhoneX',
        label: 'Phone: iOS (375x812) iPhone X',
        type: 'smartphone',
        platform: 'ios',
        contentWidth: 375,
        contentHeight: 724
    },
    {
        name: 'iPhone7Plus',
        label: 'Phone: iOS (414x736) iPhone 7 Plus',
        type: 'smartphone',
        platform: 'ios',
        contentWidth: 414,
        contentHeight: 672
    },
    {
        name: 'iPhone7',
        label: 'Phone: iOS (375x667) iPhone 7',
        type: 'smartphone',
        platform: 'ios',
        contentWidth: 375,
        contentHeight: 603,
    },
    {
        name: 'iPhone6Plus',
        label: 'Phone: iOS (414x736) iPhone 6 Plus',
        type: 'smartphone',
        platform: 'ios',
        contentWidth: 414,
        contentHeight: 672
    },
    {
        name: 'iPhone6',
        label: 'Phone: iOS (375x667) iPhone 6',
        type: 'smartphone',
        platform: 'ios',
        contentWidth: 375,
        contentHeight: 603,
    },
    {
        name: 'iPhone5',
        label: 'Phone: iOS (320x568) iPhone 5',
        type: 'smartphone',
        platform: 'ios',
        contentWidth: 320,
        contentHeight: 504
    },
    {
        name: 'GooglePixel',
        label: 'Phone: Android (411x731) Google Pixel ',
        type: 'smartphone',
        platform: 'android',
        contentWidth: 411,
        contentHeight: 582
    },
    {
        name: 'Nexus6P',
        label: 'Phone: Android (411x731) Nexus 6P ',
        type: 'smartphone',
        platform: 'android',
        contentWidth: 411,
        contentHeight: 582
    },
    {
        name: 'Nexus5',
        label: 'Phone: Android (360x640) Nexus 5 ',
        type: 'smartphone',
        platform: 'android',
        contentWidth: 360,
        contentHeight: 514
    }
];

export const Tablets = [
    {
        name: 'iPad12_9',
        label: 'Tablet: iOS (1366x1024) iPad Pro 12.9',
        type: 'tablet',
        platform: 'ios',
        contentWidth: 1024,
        contentHeight: 1302,
        contentWidthRotated: 1366,
        contentHeightRotated: 960,
    },
    {
        name: 'iPad9_7',
        label: 'Tablet: iOS (1024x768) iPad Air/Pro 9.7',
        type: 'tablet',
        platform: 'ios',
        contentWidth: 768,
        contentHeight: 960,
        contentWidthRotated: 1024,
        contentHeightRotated: 704
    },
    {
        name: 'Nexus7',
        label: 'Tablet: Android (960x600) Nexus 7 ',
        type: 'tablet',
        platform: 'android',
        contentWidth: 600,
        contentHeight: 825,
        contentWidthRotated: 960,
        contentHeightRotated: 465
    },
    {
        name: 'Nexus9',
        label: 'Tablet: Android (1024x768) Nexus 9 ',
        type: 'tablet',
        platform: 'android',
        contentWidth: 768,
        contentHeight: 889,
        contentWidthRotated: 1024,
        contentHeightRotated: 633,
    },
    {
        name: 'Nexus10',
        label: 'Tablet: Android (1280x800) Nexus 10 ',
        type: 'tablet',
        platform: 'android',
        contentWidth: 800,
        contentHeight: 1145,
        contentWidthRotated: 1280,
        contentHeightRotated: 665,
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