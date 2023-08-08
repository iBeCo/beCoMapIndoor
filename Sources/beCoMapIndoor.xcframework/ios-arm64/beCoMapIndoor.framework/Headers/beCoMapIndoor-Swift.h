#if 0
#elif defined(__arm64__) && __arm64__
// Generated by Apple Swift version 5.8.1 (swiftlang-5.8.0.124.5 clang-1403.0.22.11.100)
#ifndef BECOMAPINDOOR_SWIFT_H
#define BECOMAPINDOOR_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#if defined(__OBJC__)
#include <Foundation/Foundation.h>
#endif
#if defined(__cplusplus)
#include <cstdint>
#include <cstddef>
#include <cstdbool>
#include <cstring>
#include <stdlib.h>
#include <new>
#include <type_traits>
#else
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>
#include <string.h>
#endif
#if defined(__cplusplus)
#if __has_include(<ptrauth.h>)
# include <ptrauth.h>
#else
# ifndef __ptrauth_swift_value_witness_function_pointer
#  define __ptrauth_swift_value_witness_function_pointer(x)
# endif
#endif
#endif

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...) 
# endif
#endif
#if !defined(SWIFT_RUNTIME_NAME)
# if __has_attribute(objc_runtime_name)
#  define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
# else
#  define SWIFT_RUNTIME_NAME(X) 
# endif
#endif
#if !defined(SWIFT_COMPILE_NAME)
# if __has_attribute(swift_name)
#  define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
# else
#  define SWIFT_COMPILE_NAME(X) 
# endif
#endif
#if !defined(SWIFT_METHOD_FAMILY)
# if __has_attribute(objc_method_family)
#  define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
# else
#  define SWIFT_METHOD_FAMILY(X) 
# endif
#endif
#if !defined(SWIFT_NOESCAPE)
# if __has_attribute(noescape)
#  define SWIFT_NOESCAPE __attribute__((noescape))
# else
#  define SWIFT_NOESCAPE 
# endif
#endif
#if !defined(SWIFT_RELEASES_ARGUMENT)
# if __has_attribute(ns_consumed)
#  define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
# else
#  define SWIFT_RELEASES_ARGUMENT 
# endif
#endif
#if !defined(SWIFT_WARN_UNUSED_RESULT)
# if __has_attribute(warn_unused_result)
#  define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
# else
#  define SWIFT_WARN_UNUSED_RESULT 
# endif
#endif
#if !defined(SWIFT_NORETURN)
# if __has_attribute(noreturn)
#  define SWIFT_NORETURN __attribute__((noreturn))
# else
#  define SWIFT_NORETURN 
# endif
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA 
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA 
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA 
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif
#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif
#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER 
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility) 
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if !defined(SWIFT_DEPRECATED_OBJC)
# if __has_feature(attribute_diagnose_if_objc)
#  define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
# else
#  define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
# endif
#endif
#if defined(__OBJC__)
#if !defined(IBSegueAction)
# define IBSegueAction 
#endif
#endif
#if !defined(SWIFT_EXTERN)
# if defined(__cplusplus)
#  define SWIFT_EXTERN extern "C"
# else
#  define SWIFT_EXTERN extern
# endif
#endif
#if !defined(SWIFT_CALL)
# define SWIFT_CALL __attribute__((swiftcall))
#endif
#if !defined(SWIFT_INDIRECT_RESULT)
# define SWIFT_INDIRECT_RESULT __attribute__((swift_indirect_result))
#endif
#if !defined(SWIFT_CONTEXT)
# define SWIFT_CONTEXT __attribute__((swift_context))
#endif
#if !defined(SWIFT_ERROR_RESULT)
# define SWIFT_ERROR_RESULT __attribute__((swift_error_result))
#endif
#if defined(__cplusplus)
# define SWIFT_NOEXCEPT noexcept
#else
# define SWIFT_NOEXCEPT 
#endif
#if defined(_WIN32)
#if !defined(SWIFT_IMPORT_STDLIB_SYMBOL)
# define SWIFT_IMPORT_STDLIB_SYMBOL __declspec(dllimport)
#endif
#else
#if !defined(SWIFT_IMPORT_STDLIB_SYMBOL)
# define SWIFT_IMPORT_STDLIB_SYMBOL 
#endif
#endif
#if defined(__OBJC__)
#if __has_feature(objc_modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import CoreFoundation;
@import Foundation;
@import ObjectiveC;
@import UIKit;
#endif

#endif
#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"
#pragma clang diagnostic ignored "-Wdollar-in-identifier-extension"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="beCoMapIndoor",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

#if defined(__OBJC__)
/// BEView
/// <ul>
///   <li>
///     BEAuthenticationStatus
///   </li>
/// </ul>
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
typedef SWIFT_ENUM(NSInteger, BEAuthorizationStatus, open) {
  BEAuthorizationStatusBEUnknown = 0,
  BEAuthorizationStatusBEUnauthorized = 1,
  BEAuthorizationStatusBEAuthorized = 2,
  BEAuthorizationStatusBEAuthorizing = 3,
};

@class NSString;

/// BECategory represents the category to which a specific point of interest is attributed to. The point of interest on the map is required to belong to the category in order to display map icons and have category-specific features.
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_CLASS("_TtC13beCoMapIndoor10BECategory")
@interface BECategory : NSObject
@property (nonatomic, readonly, copy) NSString * _Nonnull name;
@property (nonatomic, readonly, copy) NSString * _Nonnull color;
@property (nonatomic, readonly, copy) NSString * _Nonnull imageName;
@property (nonatomic, readonly, copy) NSString * _Nonnull textColourSelected;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
- (BOOL)isEqual:(id _Nullable)object SWIFT_WARN_UNUSED_RESULT;
@end


/// BEFloor represents a physical floor object in your BESite. A BESite can have more than one floor. You can add and configure your floors on beCo Dashboard.
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_CLASS("_TtC13beCoMapIndoor7BEFloor")
@interface BEFloor : NSObject
@property (nonatomic, readonly, copy) NSString * _Nonnull identifier;
@property (nonatomic, readonly) NSInteger name;
@property (nonatomic, readonly, copy) NSString * _Nonnull label;
@property (nonatomic, readonly, copy) NSString * _Nonnull floorDescription;
- (BOOL)isEqual:(id _Nullable)object SWIFT_WARN_UNUSED_RESULT;
@end


/// BELocation represents an actual cordinate point. Used to represent the lication for a site.
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_CLASS("_TtC13beCoMapIndoor10BELocation")
@interface BELocation : NSObject
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


/// A BEPoint object defines any point of interest that needs to be displayed on a BEView. A point of interest can be anything from a general point, room, store, etc.  You can categorize a BEPoint using BECategory.
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_CLASS("_TtC13beCoMapIndoor7BEPoint")
@interface BEPoint : NSObject
@property (nonatomic, readonly, copy) NSString * _Nonnull name;
@property (nonatomic, readonly, copy) NSString * _Nonnull pointId;
@property (nonatomic, readonly, strong) BEFloor * _Nonnull floor;
@property (nonatomic, readonly, strong) BECategory * _Nonnull category;
- (BOOL)isEqual:(id _Nullable)object SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


/// This is an abstract class which defines the base session methods. You can access your BESDKSession from BeCo class. BESDKSession has autherisationStatus which checks that your Server API Key is authorized or not.
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_CLASS("_TtC13beCoMapIndoor9BESession")
@interface BESession : NSObject
@property (nonatomic) enum BEAuthorizationStatus autherisationStatus;
@property (nonatomic, copy) NSString * _Nonnull usageToken;
@property (nonatomic, copy) NSString * _Nonnull licenceKey;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


/// The BESite object defines a site object that needs to be displayed and navigated on. The BESite should be added and approved previously on the beCo Dashboard. Once you have access to the organization’s Server API Key, you can collect all sites listed using beCoMap SDK.
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_CLASS("_TtC13beCoMapIndoor6BESite")
@interface BESite : NSObject
@property (nonatomic, readonly, copy) NSString * _Nonnull identifier;
@property (nonatomic, readonly, copy) NSString * _Nonnull bgColor;
@property (nonatomic, readonly, strong) BELocation * _Nonnull location;
@property (nonatomic, readonly, copy) NSString * _Nonnull name;
@property (nonatomic, readonly, copy) NSString * _Nonnull address;
- (BOOL)isEqual:(id _Nullable)object SWIFT_WARN_UNUSED_RESULT;
@end


@protocol BEViewDelegate;
@class NSCoder;

/// You use this class as-is to display map information from your application. When you initialize a map view, you specify the BESite for that map to display by calling the setSite() function. The SDK makes the initial BEFloor and floor region visible based on the user’s current location or default map settings. In addition to this, BEView supports many standard user interactions for changing the position and zoom level of the map. In particular, map views support swipe and pinch gestures for scrolling around the map and zooming in and out. BEView also provides a floor switch button that enables the functionality to switch between floors.
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_CLASS("_TtC13beCoMapIndoor6BEView")
@interface BEView : UIView
@property (nonatomic, weak) id <BEViewDelegate> _Nullable delegate;
/// func voiceAssistanceEnabled:
/// <ul>
///   <li>
///     Setting the value of this property to true will enable voice assistance and setting it to false will disable voice assistance. The default value is true.
///   </li>
/// </ul>
@property (nonatomic) BOOL voiceAssistanceEnabled;
/// func locationButtonIsHidden:
/// <ul>
///   <li>
///     Setting the value of this property to true hides the current location button and setting it to false shows it. The default value is true.
///   </li>
/// </ul>
@property (nonatomic) BOOL locationButtonIsHidden;
/// You can create your map views programmatically. When creating a view, you typically specify its initial size and position relative to its future superview. To add BEView as a subview to another view, call the addSubview(_:) method on the superview.
- (nonnull instancetype)initWithFrame:(CGRect)frame OBJC_DESIGNATED_INITIALIZER;
- (nullable instancetype)initWithCoder:(NSCoder * _Nonnull)aDecoder OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init;
@end




@interface BEView (SWIFT_EXTENSION(beCoMapIndoor))
/// <h2>setSite(_ site: BESite)</h2>
/// To load a site map in your map view, have to tag that <a href="https://docs/reference/ios/Classes/BESite.html">BESite</a> in your map view. You can set your site using <code>setSite(_ : BESite)</code> function.
/// The call will fetch the site details and load the map data in your <a href="https://docs/reference/ios/Classes/BEView.html">BEView</a>.
/// Once the data is loaded you will get a <a href="https://docs/reference/ios/Protocols/BEViewDelegate.html">BEViewDelegate</a> callback on <code>becoView(_:didLoadWith:)</code>
/// If there is any error occurs while loading your site data, the view will trigger the delegate <code>becoView(_:didFailedWith: Error)</code>. For a complete list of errors, see to the <a href="https://docs/reference/ios/Enums/BEError.html">BEError</a> documentation.
/// \param site the BESite referance, required to show in BEView
///
- (void)setSite:(BESite * _Nonnull)site;
/// <h2>getPoints()</h2>
/// You can fetch all the <a href="/docs/reference/ios/Classes/BEPoint.html">BEPoint</a> in the site using <code>getPoints()</code>. The function will return a list of <a href="/docs/reference/ios/Classes/BEPoint.html">BEPoint</a>.
///
/// returns:
/// list of BEPoint
- (NSArray<BEPoint *> * _Nonnull)getPoints SWIFT_WARN_UNUSED_RESULT;
/// <h2>findMapPoints(searchText: String)</h2>
/// The function will help you to filter map points based on the name. The function will return a list of <a href="https://docs/reference/ios/Classes/BEPoint.html">BEPoint</a> based on the <code>searchText</code>. using a <a href="https://docs/reference/ios/Protocols/BEViewDelegate.html">BEViewDelegate</a> callback on <code>becoView(_:didFindResult:)</code>
/// \param searchText Search string
///
- (void)findMapPointsWithSearchText:(NSString * _Nonnull)searchText;
/// <h2>select(point: BEPoint?)</h2>
/// The function will help you to select a point on your <a href="https://docs/reference/ios/Classes/BEView.html">BEView</a> programmatically.
/// On selction compleation you will get a <a href="https://docs/reference/ios/Protocols/BEViewDelegate.html">BEViewDelegate</a> callback on <code>becoView(_:didSelectedPoint:)</code>
/// todo:
/// Clear selected point
/// \param point Point for selection
///
- (void)selectWithPoint:(BEPoint * _Nullable)point;
/// <h2>getRoute(from startPoint: BEPoint,to endPoint: BEPoint)</h2>
/// getRouteFloors: The function will returen the list of BEFloors, in your route with refered Start point and End point.
/// <ul>
///   <li>
///     If routeRequest is not a <code>validRequest</code>, Will trigger error <code>BERoutingErrorInvalidRouteRequest</code>
///   </li>
///   <li>
///     if there isn’t any valid path between startPoint and endPoint, Will trigger error <code>BERoutingErrorNoValidPath</code>
///   </li>
/// </ul>
/// \param startPoint Start point for your route
///
/// \param endPoint BERoute object
///
/// \param wayPoints the waypoints between startpoint and end point (Only available from beCoMap SDK version 2.0)
///
///
/// returns:
/// list of BEFloor that involved in the route
- (NSArray<BEFloor *> * _Nonnull)getRouteFrom:(BEPoint * _Nonnull)startPoint to:(BEPoint * _Nonnull)endPoint wayPoints:(NSArray<BEPoint *> * _Nullable)wayPoints SWIFT_WARN_UNUSED_RESULT;
/// showRouteOnFloor:
/// <ul>
///   <li>
///     Function will draw a route on BEView
///   </li>
///   <li>
///     If routeRequest is not a <code>validRequest</code>, Will trigger error <code>BERoutingErrorInvalidRouteRequest</code>
///   </li>
///   <li>
///     if there isn’t any valid path between startPoint and endPoint, Will trigger error <code>BERoutingErrorNoValidPath</code>
///   </li>
/// </ul>
/// \param floor BEfloor referance
///
- (void)showRouteOnFloorOn:(BEFloor * _Nonnull)floor;
/// func reset
/// <ul>
///   <li>
///     The function will clear routes and selected point in BEView
///   </li>
/// </ul>
- (void)reset;
/// BEView navigate function will start the navigation on the route refered in getRouteFloors or ShowRoute function
/// <ul>
///   <li>
///     Start naviagtion on a route that is predefined based on BEView getRoute function
///   </li>
///   <li>
///     If there is no route set, the function will trigger an error with status BERoutingError
///   </li>
/// </ul>
- (void)navigate;
/// BEView navigate function will start the navigation on the route refered in getRouteFloors or ShowRoute function
/// <ul>
///   <li>
///     Start naviagtion on a route that is predefined based on BEView getRoute function
///   </li>
///   <li>
///     If there is no route set, the function will trigger an error with status BERoutingError
///   </li>
/// </ul>
- (void)preview;
@end


/// BEView
/// <ul>
///   <li>
///     BEViewDelegate
///   </li>
/// </ul>
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_PROTOCOL("_TtP13beCoMapIndoor14BEViewDelegate_")
@protocol BEViewDelegate <NSObject>
/// becoView:didLoadWith:
/// <ul>
///   <li>
///     BEViewDelegate non-optional method.
///   </li>
///   <li>
///     Invoked when a BESite is loaded in your BEView.
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param site BESite reference
///
- (void)becoView:(BEView * _Nonnull)mapView didLoadWith:(BESite * _Nonnull)site;
/// becoView:didFailedWith:
/// <ul>
///   <li>
///     BEViewDelegate non-optional method.
///   </li>
///   <li>
///     Invoked when an error occure while loading your BEView.
///   </li>
///   <li>
///     If there is a permision error, will get BELocationPermissionError
///   </li>
///   <li>
///     Trigger when failed to plot a route in your BEView, Triggered Routing errors are
///     <ul>
///       <li>
///         BERoutingErrorNoValidPath
///       </li>
///       <li>
///         BERoutingErrorInvalidRouteRequest
///       </li>
///     </ul>
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param error Error details
///
- (void)becoView:(BEView * _Nonnull)mapView didFailedWith:(NSError * _Nonnull)error;
@optional
/// becoView:updateUserLocation:
/// <ul>
///   <li>
///     Trigger when user’s current location is updated or changed.
///   </li>
///   <li>
///     If there isn’t any valid BEPoint in user location, you will get a Dummy Point. Point name will be <code>Your Location</code>.
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param point BEPoint reference.
///
- (void)becoView:(BEView * _Nonnull)mapView didUpdateUserLocation:(BEPoint * _Nonnull)point;
/// becoView:didSelectedPoint:
/// <ul>
///   <li>
///     Invoked when a Point in BEView is selected
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param point BEPoint reference.
///
- (void)becoView:(BEView * _Nonnull)mapView didSelectedPoint:(BEPoint * _Nonnull)point;
/// becoView:didFindResult:
/// <ul>
///   <li>
///     This delegate is a call back for the function call <code>findMapPoint(text: String)</code> in your BEView.
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param results List of BEPoint
///
/// \param searchText search text. <code>results</code> are based on <code>searchText</code>
///
- (void)becoView:(BEView * _Nonnull)mapView didFindResult:(NSArray<BEPoint *> * _Nonnull)results forText:(NSString * _Nonnull)searchText;
/// becoView:didRoute:
/// <ul>
///   <li>
///     Trigger when a valid toute is routed.
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param fromPoint start point
///
/// \param toPoint end point
///
- (void)becoView:(BEView * _Nonnull)mapView didRouteFrom:(BEPoint * _Nonnull)source to:(BEPoint * _Nonnull)destination;
/// becoView:didStartNavigatingOn:
/// <ul>
///   <li>
///     Trigger when navigation started on a BERoute
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param fromPoint start point
///
/// \param toPoint end point
///
- (void)becoView:(BEView * _Nonnull)mapView didStartNavigatingFrom:(BEPoint * _Nonnull)source to:(BEPoint * _Nonnull)destination;
/// becoView:didEndNavigationOn:
/// <ul>
///   <li>
///     Trigger when user clicked on Exit navigation button.
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param sourcePoint start point
///
/// \param destinationPoint end point
///
- (void)becoView:(BEView * _Nonnull)mapView didEndNavigationWith:(BEPoint * _Nonnull)source destination:(BEPoint * _Nonnull)destination;
/// becoView:didStartPreviewFrom:
/// <ul>
///   <li>
///     Trigger when preview started on a BERoute
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param fromPoint start point
///
/// \param toPoint end point
///
- (void)becoView:(BEView * _Nonnull)mapView didStartPreviewFrom:(BEPoint * _Nonnull)source to:(BEPoint * _Nonnull)destination;
/// becoView:didEndPreviewWith:
/// <ul>
///   <li>
///     Trigger when user exit from preview mode
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param sourcePoint start point
///
/// \param destinationPoint end point
///
- (void)becoView:(BEView * _Nonnull)mapView didEndPreviewWith:(BEPoint * _Nonnull)source destination:(BEPoint * _Nonnull)destination;
/// becoView:didDeviatedTo:
/// <ul>
///   <li>
///     Trigger when, On beacon navigation when user deviated from refered route.
///   </li>
/// </ul>
/// \param mapView BEView reference
///
/// \param point BERoute reference
///
- (void)becoView:(BEView * _Nonnull)mapView didDeviatedTo:(BEPoint * _Nonnull)point;
@end

@protocol BeCoDelegate;
@class CLLocation;

/// BeCo is a singleton class which interacts as the base interface. You can fetch your BeCo instance using function sharedInstance().
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_CLASS("_TtC13beCoMapIndoor4BeCo")
@interface BeCo : NSObject
@property (nonatomic, weak) id <BeCoDelegate> _Nullable delegate;
@property (nonatomic, strong) BESession * _Nullable beCoSDKSession;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
/// func sharedInstance:
///
/// returns:
/// BeCo signleton object
+ (BeCo * _Nonnull)sharedInstance SWIFT_WARN_UNUSED_RESULT;
/// func configure:
/// <ul>
///   <li>
///     Framework initialization and configuring
///   </li>
///   <li>
///     Configure a BeCoApp shared instance, typically in your app’s application:didFinishLaunchingWithOptions: method. This will validate the token.
///   </li>
/// </ul>
/// \param usageToken Your beCo map server access token
///
/// \param licenceKey Your client’s consumer key
///
- (void)configureWithLicenceKey:(NSString * _Nonnull)licenceKey usageToken:(NSString * _Nonnull)usageToken;
/// func getSiteDetails:
/// <ul>
///   <li>
///     Fetch BESites arount location: CLLocation
///   </li>
/// </ul>
/// todo:
///
/// <ul>
///   <li>
///     Set location on API Call
///   </li>
/// </ul>
/// \param location Your beCo map key
///
- (void)getSiteDetailsWithAround:(CLLocation * _Nonnull)location;
@end


/// BeCoDelegate
/// version:
/// 1.9.0
/// copyright:
/// Copyright © 2022 GlobeCo Technologies Pvt Ltd. All rights reserved.
/// <ul>
///   <li>
///     BeCo delegate callbacks
///   </li>
///   <li>
///     Licence:  See LICENSE File in this project bundle for this projects licensing information.
///   </li>
/// </ul>
SWIFT_PROTOCOL("_TtP13beCoMapIndoor12BeCoDelegate_")
@protocol BeCoDelegate <NSObject>
/// BeCo didFailed:
/// <ul>
///   <li>
///     Set site will load curresponding site data in your map view
///   </li>
/// </ul>
/// \param beCo BeCo Object
///
/// \param error BEErrors (BEFailedToFetchSites,BEInvalidToken)
///
- (void)beco:(BeCo * _Nonnull)beCo didFailedWith:(NSError * _Nonnull)error;
/// BeCo didFindSites:
/// <ul>
///   <li>
///     Set site will load curresponding site data in your map view
///   </li>
/// </ul>
/// \param sites List of BESite
///
/// \param location CLLocation object.
///
- (void)becoWithDidFindSites:(NSArray<BESite *> * _Nonnull)sites around:(CLLocation * _Nonnull)location;
@end






#endif
#if defined(__cplusplus)
#endif
#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif

#else
#error unsupported Swift architecture
#endif
