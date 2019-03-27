# Protocode v5.0

Protocode is a web application that helps you to prototype iOS and Android mobile apps. Thanks to its model-driven approach, you can model your app once for different operating systems.
Here's a list of the key points of this web application:

## What's new in v5.0 ##
* __Upgrade__: Protocode5 is written as a ReactJS application, while previous versions used Ember 1.6. This was necessary since Ember 1.6 is no more supported, and no more documentation exists for it (even consulting [https://emberjs.com](https://emberjs.com)). No breaking change wrt functionalities have been made during reimplementation.

* __Layout mechanism fixed__: Constraint layout and control chains have been rewritten to fix some bugs. Current implementation is coherent with Android's ConstraintLayout and ControlChain

* __Scene models__: Added the possibility to describe which data from the model are needed in each scene. This allows to automatically produce code to load pieces of data from persistency, use them and automatically persist them back

* __Control bindings__: Controls can be connected to the scene model with one-way or two-way data bindings. This allows to sync model and view: changes to model are reflected in the view and events from the view are translated in model updates

* __Dynamic lists and grids__: Just like controls, lists and grids can now take data directly from collections stored in Scene Models, and render a cell for each of those elements. Title and eventual subtitle of the cells can reflect values from the collection item associated with the cell they belong to

## Features from v4.0 ##

* __Layout Constraints__: View Editor has been re-styled with constraint-based positioning mechanisms, giving the user the ability to create complex and screen size-adapive UI layouts

* __Control Chains__: in addition to layout constraints, it is now possible to create horizontal and vertical chains of UI controls increasing further the design possibilities for the user

* __Navigation Drawer Menu__: the application menu has been re-styled to the modern Navigation Drawer layout

* __Scenes__: focusing on adaptivity, the design approach has been changed: now the user can create Scenes, which represent different "screens" of the application; each Scene contains one or more View Controllers, and the way in which the different View Controllers of a Scene are presented on screen can be differentiated for Phones and Tablets (so the same Scene can appear with a particular layout on a Phone and with another layout on a Tablet)

* __Reusable View Controllers__: to achieve code reusability, the same View Controller can be reused many times in different Scenes

* __Editor Report__: while viewing a Scene, the View Editor shows a report text view pointing out potential problems like Scene unreachability (no navigation items pointing to that), missing constraints and invalid objects

* __New tablet devices__: iPad Pro 12.9" and iPad Air (9.7") for iOS 11, Nexus 7, 9 and 10 for Android Oreo

* __New smartphone device__: iPhone X.

## Features from v3.0 ##

* __Model editor__: now protocode lets you model also the data you want to store for your application

* __Default Preferences Handler__: you can now add default preferences to your app

* __Database Handler__: you can now add an SQLite DB to your app

* __Cloud Handler__: you can now add cloud storage to your app (Google Firebase and iCloud)

* __File Handler__: you can now add files to your app

* __New devices__: Google Pixel for Android 7 Nugat, iPhone 7, 7 Plus for iOS 10.

## Features from v2.0 ##

* __New devices__: Nexus 6P for Android M and iPhone 6, 6 Plus for iOS 9.

* __Smartwatches__: You can now add buttons, labels, switches, sliders and a "speech-to-text" button to your Wearable device! Simulated devices are Apple Watch 42mm, Moto 360 and Asus Zen Watch.

* __New mobile widgets__: Switches, spinners, sliders, mapView, datePickers, timePickers and cardViews are now available.

* __Upgraded mobile widgets__: Added new properties for the widgets like text color, background color and font style; ListViews and GridViews are now available in 3 different layouts : simple text, with an image or both.

## Features from v1.0 ##

* __Widget based prototyping tool__: the user can create the pages that compose the prototype adding various controls such as label, edit texts etc. Now it supports 16 controls: button, label, edit text, web view, image view, video view, audio player, list view, grid view, photocamera controller, videocamera controller and audio recorder.

* __WYSIWYG Editor__: in other word the user can immediately see the final result without exporting the model and generate the project for iOS and Android. This is possible thanks to the built-in simulator of the supported OS. Actually there are two simulators: iPhone 5s for iOS and Nexus 5 for Android.

* __Auto-adaptative control views__: in order to have a responsive layout throughout all different operating system, the position of the controls are not given by absolute position, but it uses a constraint-based approach. The result is a responsive layout that auto-adjust on different mobile screens. The classic position system is allowed even if it's not recommended.

* __Drag & Drop positioning__: controls can be placed on screen via drag & drop. We can move the widgets on the simulator dragging them on it.

* __Easy creation of common functionalities__: how many times we have to spend a lot of time to create menus, tab bars on iOS, navigational behavior and listItems? All these aspect are very simplified and their creation require very few clicks!

## Requirements ##

In order to deploy the web application we need:

* [Node.js](http://nodejs.org/)
* [Yarn](https://yarnpkg.com)
* [MobileCodeGenerator](https://github.com/polimi-deib/mobilecodegenerator5): this app is required to generate both iOS and Android projects from the model exported by Protocode.

## Installation ##

1. Download this project
2. Install all node.js dependencies. From the root of the project execute `yarn install`
3. Start the server using grunt `yarn start`
4. That's it! Now you have a server with this application up and running on [localhost:3000](http://localhost:3000)
5. If you want only minified and compressed version of this web application, just execute in the root of the project `yarn build`. Now you have in `/PROJECT_PATH/dist` the web application ready for distribution.

