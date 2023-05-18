//
//  AppDelegate.swift
//  beCoMapDemo
//
//  Created by SayOne Technologies on 02/01/20.
//  Copyright © 2020 GlobeCo Technologies Pvt Ltd. All rights reserved.
//

import UIKit
import beCoMapIndoor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        //Thread.sleep(forTimeInterval: 2.0)//To delay splash screen
        //if UserDefaults.standard.string(forKey: "usageToken") == nil {
            //usageToken
            //b3b919d29a0d9c07ad7c635b7c84b321c7348d6f -> HNH
            //610f52c6ed6e9c335a9ba10d8003b1a0ec674acc -> PRODUCTION TEST
            //b12ec0aa51dbc071e196c612e2326a15e40dd3fb -> Staging
            //6530be9d54dda44289b4817802680a4e538841df -> Hilite Mall
            
            //licenceKey
            //d5a1c252-c09d-4931-baf2-7b6fdff7520b --   - staging
            //ed860e9e-fe47-4d82-b5fd-6b06eae180f6 -> HNH
            //6ba68d21-0acc-40d4-b177-235cb3f0705a -> PRODUCTION TEST
            
            UserDefaults.standard.set("6530be9d54dda44289b4817802680a4e538841df", forKey: "usageToken")
            UserDefaults.standard.set("6ba68d21-0acc-40d4-b177-235cb3f0705a", forKey: "licenceKey")
            UserDefaults.standard.set("hilite-mall", forKey: "SITEID")//cyber-house world-trade-center-kochi
            UserDefaults.standard.synchronize()
        //}
        //Configure BeCo
        let beCo = BeCo.sharedInstance()
        beCo.configureWith(licenceKey: UserDefaults.standard.string(forKey: "licenceKey")!, usageToken: UserDefaults.standard.string(forKey: "usageToken")!)
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }


}


