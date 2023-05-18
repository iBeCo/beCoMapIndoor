---
title: beCo iOS SDK Quick Start Guide
---

The following information will help you to integrate the beCoMap SDK with your app using Xcode, Objective-C, and Swift.

### Get Started
beCo map SDK for iOS will help you setup a map based navigation system for your users on their apple devices. The API will be able to access the server, points and routes, user touches and so on automatically. Using the SDK you can provide an interactive and engaging experience to your users with the least effort.

### Requirements
 * iOS 11.0 and above
 * Location Services permissions set to **Always** ([more details below](#step-3-ask-for-location-services-permissions))

### Create an account
You'll need to [create an account](https://app.becomap.com/accounts/register/) to complete the steps below. Already have an account? [Sign in](https://app.becomap.com/accounts/login/).

### Build an app
++toc ++remove-line-start-steps

## Step 1: Set up your app

### Get the latest version of Xcode
To integrate beCoMap iOS SDK, install Xcode latest version. [Xcode](https://developer.apple.com/xcode/)

### Install the SDK with Swift Packages
**Note:** If you are using the enterprise version of the SDK please refer the on boarding documentation provided for installing the SDK.

The beCoMap SDK for iOS is available on swift packages. 
add following packages

1) https://github.com/apple/swift-protobuf.git
2) https://github.com/iBeCo/beCoMapIndoor.git

## Step 2: Integrate the SDK

### Get a Server API Key
The server API key is generarted for an organizations. The app will require keys that are pre-registered with the server that will be authenticated to get the access to the sites registered under the organization. 
You can collect your Server API Key from the [beCo Dashboard](https://app.becomap.com)

### Giving permissions
Add the following to your info.plist

```
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Application requirs location aceess permision to track your location.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Application requirs location aceess permision to track your location.</string>
```

### Import Header File
Import the beCoMap header file into your app's delegate file and in any other place that you plan to use it:

++code-tabs

++tab-Objective-C
```objective-c
#import <beCoMap/beCoMap.h>
```
++end-tab

++tab-Swift
```swift
import beCoMap
```
++end-tab

++end-code-tabs

### Initialize the SDK

Initialize [BeCo](/docs/reference/ios/Classes/BeCo.html) with usage token and licence key.

++code-tabs

++tab-Objective-C
```objective-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    BeCo *beco = [BeCo sharedInstance];
    [beco configureWithLicenceKey:@"YOUR_BECO_MAP_CLIENT_CONSUMER_KEY", usageToken: @"YOUR_BECO_MAP_SERVER_API_KEY"];
    return YES;
}
```
++end-tab

++tab-Swift
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        let beCo = BeCo.sharedInstance()
        beCo.configureWith(licenceKey: "YOUR_BECO_MAP_CLIENT_CONSUMER_KEY", usageToken: "YOUR_BECO_MAP_SERVER_API_KEY")
        return true
}
```
++end-tab

++end-code-tabs

<aside class="notice">
<a href="/docs/reference/ios/Classes/BeCo.html"><code>BeCo</code></a> has delegate. See the section on <a href="#becodelegate">BeCoDelegate</a>
</aside>

## Step 3: Get your BESite's
A [BESite](/docs/reference/ios/Classes/BESite.html) can be any building or campus under an organization, that is registered on beCo. To display an indoor map respective to the site in your application, you have to specify that site to the beCoMap SDK.

To fetch the site list under your organization, use the following code.

++code-tabs

++tab-Objective-C
```objective-c
BeCo *beco = [BeCo sharedInstance];
beco.delegate = self;
[beco getSiteDetailsWithAround:"CLLocation_POINT"]
```
++end-tab

++tab-Swift
```swift
let beCo = BeCo.sharedInstance()
beCo.delegate = self
beCo.getSiteDetails(around: "CLLocation_POINT")
```
++end-tab

++end-code-tabs

The `getSiteDetails` function will trigger the fetch request for the BESite's around the specfied `CLLocation_POINT`. Adopt [BeCoDelegate](/docs/reference/ios/Protocols/BeCoDelegate.html) protocol to get the completion callbacks. If your class already adopts other protocols, you can add commas (`,`) between the protocols.

### BeCoDelegate
The [BeCoDelegate](/docs/reference/ios/Protocols/BeCoDelegate.html) has methods to inform you of key events. 

`beco(_:didFailedWith:)` in the [Understanding Errors](#understanding-beco-errors) section to receive notifications if errors occur.
`beco(didFindSites:around:)` delegate will fetch the list of sites.

#### Understanding BeCo Errors

If there was an error completing an action on the BeCo, the [BeCoDelegate](/docs/reference/ios/Protocols/BeCoDelegate.html) will get a callback with the error cause. For a complete list of errors, see to the [BEError](/docs/reference/ios/Enums/BEError.html) documentation.

++code-tabs

++tab-Objective-C
```objective-c
- (void)beco:(BeCo *)beCo didFailedWith:(NSError *)error {
    NSLog(@"Error: %@", error.localizedDescription);
}
```
++end-tab

++tab-Swift
```swift
func beco(_ beCo: BeCo, didFailedWith error: Error) {
    print("Error: \(error.localizedDescription)")
}
```
++end-tab

++end-code-tabs

## Step 4: Setup your map view

### Build your user interface
A [BEView](/docs/reference/ios/Classes/BEView.html) is the UI element for your map view. 
You can use the following code to add a BEView.

++code-tabs

++tab-Objective-C
```objective-c
BEView *mapView = [[BEView alloc] initWithFrame:self.view.frame];
mapView.delegate = self;
[self.view addSubview:mapView];
```
++end-tab

++tab-Swift
```swift
var mapView: BEView = BEView.init(frame: self.view.frame)
mapView.delegate = self
self.view.addSubview(mapView)
```
++end-tab

++end-code-tabs

### Set site to show the map

To display the map on the iOS app, the site has to be specified using following code.


++code-tabs

++tab-Objective-C
```objective-c
- (void)becoWithDidFindSites:(NSArray<BESite *> * _Nonnull)sites around:(CLLocation * _Nonnull)location {
    [_mapView setSite:sites[0]];
}
```
++end-tab

++tab-Swift
```swift
func beco(didFindSites sites: BESites, around location: CLLocation) {
    mapView.setSite(sites[0])
}
```
++end-tab

++end-code-tabs

### Find your points
A [BEPoint](/docs/reference/ios/Classes/BEPoint.html) is a named point of interest in your site. To get points in your BEView you can make use of either of the following methods.

#### 1. Search for a BEPoint
You can search for a point in your BEView. Check the following code snippet.

++code-tabs

++tab-Objective-C
```objective-c
[_mapView findMapPointsWithSearchText:@"YOUR_SEARCH_TEXT"];
```
++end-tab

++tab-Swift
```swift
mapView.findMapPoints(searchText: "YOUR_SEARCH_TEXT")
```
++end-tab

++end-code-tabs

The [BEViewDelegate](/docs/reference/ios/Protocols/BEViewDelegate.html) provides a callback method when a `findMapPoints` function is called

++code-tabs

++tab-Objective-C
```objective-c
[_mapView findMapPointsWithSearchText:@"YOUR_SEARCH_TEXT"];
```
++end-tab

++tab-Swift
```swift
func becoView(_ mapView: BEView, didFindResult results: BEPoints, forText searchText: String) {
    print("Did find \(results.count) BEPoints for search text:\(searchText)")
}
```
++end-tab

++end-code-tabs

#### 2. Get all pints
You can search for a point in your BEView. Check the following code snippet.
++code-tabs

++tab-Objective-C
```objective-c
[_mapView findMapPointsWithSearchText:@"YOUR_SEARCH_TEXT"];
```
++end-tab

++tab-Swift
```swift
mapView.findMapPoints(searchText: "YOUR_SEARCH_TEXT")
```
++end-tab

++end-code-tabs

### Select a point on the map
You can select a BEPoint in your BEView using following code. If you pass nil value to the select function, BEView will clear any selection.

++code-tabs

++tab-Objective-C
```objective-c
[mapView selectWithPoint:YOUR_BEPoint];
```
++end-tab

++tab-Swift
```swift
mapView.select(point: <BEPoint?>)
```
++end-tab

++end-code-tabs

The point selection in a BEView will trigger the [BEViewDelegate](/docs/reference/ios/Protocols/BEViewDelegate.html) didSelectedPoint. Check the code sample.

++code-tabs

++tab-Objective-C
```objective-c
- (void)becoView:(BEView *)mapView didSelectedPoint:(BEPoint *)point {
    NSLog(@"Selected Point: %@", point.name);
}
```
++end-tab

++tab-Swift
```swift
func becoView(_ mapView: BEView, didSelectedPoint point: BEPoint) {
    print("Selected point with name:\(point.name) on floor:\(point.floorName)")
    destinationPoint = point
}
```
++end-tab

++end-code-tabs

### Get user position
You will get all the updates in user position from delegate `didUpdateUserLocation point:`

## Step 5: Set up navigation

### Show route
Once you defined your source and destination to plot a route on ```BEView```, use the following steps.

* As first step, you have to get your route data. The BEView.getRoute will return the list of [BEFloor](/docs/reference/ios/Classes/BEFloor.html) involved in your route.
* Draw the route in your [BEFloor](/docs/reference/ios/Classes/BEFloor.html) using `showRouteOnFloor(on: BEFloor)`
* If multiple floors are involved in your route, you can preview them using `showRouteOnFloor(on: BEFloor)` by passing your [BEFloor](/docs/reference/ios/Classes/BEFloor.html) instance.

++code-tabs

++tab-Objective-C
```objective-c
NSArray *routeFloors = [mapView getRouteFrom:YOUR_SOURCE_POINT to:YOUR_DESTINATION_POINT];
if routeFloors.count > 0 {
    [mapView showRouteOnFloorOn:routeFloors[0]];
}
```
++end-tab

++tab-Swift
```swift
let routeFloors = mapView.getRoute(from: YOUR_SOURCE_POINT, to: YOUR_DESTINATION_POINT)
if routeFloors.count > 0 {
    mapView.showRouteOnFloor(on: routeFloors[0])
}
```
++end-tab

++end-code-tabs

### Start preview
You can view preview of route in your BEView using  `mapView.preview()`
**Note:** Make sure you have called `getRoute()`, before calling the `navigate()` function.

++code-tabs

++tab-Objective-C
```objective-c
[mapView preview];
```
++end-tab

++tab-Swift
```swift
mapView.preview()
```
++end-tab

++end-code-tabs

### Start navigation
You can navigate on a route in your BEView using  `mapView.navigate()`
**Note:** Make sure you have called `getRoute()`, before calling the `navigate()` function.

++code-tabs

++tab-Objective-C
```objective-c
[mapView navigate];
```
++end-tab

++tab-Swift
```swift
mapView.navigate()
```
++end-tab

++end-code-tabs

#### Understanding BEView Errors

If there was an error completing an action on the BeCo, the [BEViewDelegate](/docs/reference/ios/Protocols/BEViewDelegate.html)  will get a callback with the error cause. For a complete list of errors, see to the [BEError](/docs/reference/ios/Enums/BEError.html) documentation.

++code-tabs

++tab-Objective-C
```objective-c
- (void)becoView:(BEView * _Nonnull)mapView didFailedWith:(NSError * _Nonnull)error {
    NSLog(@"Error: %@", error.localizedDescription);
}
```
++end-tab

++tab-Swift
```swift
func becoView(_ mapView: BEView, didFailedWith error: Error) {
    print("Error: \(error.localizedDescription)")
}
```
++end-tab

++end-code-tabs



#### BEViewDelegate's
 
* ```func becoView(_ mapView: BEView, didLoadWith site: BESite)```
* ```func becoView(_ mapView: BEView, didFailedWith error: Error)```
* ```func becoView(_ mapView: BEView, didUpdateUserLocation point: BEPoint)```
* ```func becoView(_ mapView: BEView, didSelectedPoint point: BEPoint)```
* ```func becoView(_ mapView: BEView, didFindResult results: BEPoints, forText searchText: String)```
* ```func becoView(_ mapView: BEView, didRouteFrom source: BEPoint,to destination: BEPoint)```
* ```func becoView(_ mapView: BEView, didStartNavigatingFrom source: BEPoint,to destination: BEPoint)```
* ```func becoView(_ mapView: BEView, didEndNavigationWith source: BEPoint, destination: BEPoint)```
* ```func becoView(_ mapView: BEView, didDeviatedTo point: BEPoint)```
* ```func becoView(_ mapView: BEView, didStartPreviewFrom source: BEPoint,to destination: BEPoint)```
* ```func becoView(_ mapView: BEView, didEndPreviewWith source: BEPoint, destination: BEPoint)```

#### Other API's
* To reset your point selection and Route call ```mapView.reset()```
* To disable voice assistance set false to variable ```voiceAssistanceEnabled: Bool```
* To hide the current location button in your ```BEView``` set false to variable ```locationButtonIsHidden: Bool```


## Step 6: Test your app

The beCoMap SDK should now be fully integrated in your app. Run the app and use the map. You’re done!

If you are receiving errors, see the [error code documentation](/docs/reference/ios/Enums/BEError.html) to help you troubleshoot.
