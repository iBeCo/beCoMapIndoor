//
//  ViewController.swift
//  beCoMapTest
//
//  Created by test on 22/07/19.
//  Copyright © 2019 GlobeCo Technologies Pvt Ltd. All rights reserved.

import UIKit
import beCoMapIndoor
import CoreLocation

let proximityMessages = [
    "Reception" : "Welcome to beCo.",
    "Pantry" : "Have a hot cup of Tea.",
    "Nova Technologies" : "You are near Nova Technologies."
]

class MapViewController: UIViewController {
    
    enum MapAction {
        case NoAction
        case SelectPoint
        case DrawRouteWithPoints
    }
    
    var site: BESite?
    var mapView: BEView!
    var myview: UIView = UIView()
    var mapPoints: [String: BEPoint] = [:]
    var routePoints: [BEPoint] = []
    var routeFloors: [BEFloor] = []
    
    var serchHelper: BESearchHelper?
    let beCoManager = BeCo.sharedInstance()
    
    
    var mapAction: MapAction = .NoAction
    var locationPointIDs: [String] = [] {
        didSet {
            if locationPointIDs.count > 1 {
                mapAction = .DrawRouteWithPoints
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.addMapView()
        serchHelper = BESearchHelper.init(with: self)
        serchHelper?.delegate = self
        if let forSite = site {
            mapView.setSite(forSite)
        } else {
            let latitude: CLLocationDegrees = 37.2
            let longitude: CLLocationDegrees = 22.9
            let location: CLLocation = CLLocation(latitude: latitude,  longitude: longitude)
            beCoManager.delegate = self
            beCoManager.getSiteDetails(around: location)
        }
    }
    
    func addMapView() {
        myview = UIView(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.size.width, height: UIScreen.main.bounds.size.height))
        view.addSubview(myview)
        myview.translatesAutoresizingMaskIntoConstraints = false
        myview.bottomAnchor.constraint(equalTo:  view.safeBottomAnchor).isActive = true
        myview.leadingAnchor.constraint(equalTo: view.safeLeadingAnchor).isActive = true
        myview.topAnchor.constraint(equalTo: view.safeTopAnchor).isActive = true
        myview.trailingAnchor.constraint(equalTo: view.safeTrailingAnchor).isActive = true
        
        mapView = BEView.init(frame: CGRect(x: 0, y: 0, width: myview.frame.size.width, height: myview.bounds.size.height - 20))
        myview.addSubview(mapView)
        mapView.translatesAutoresizingMaskIntoConstraints = false
        mapView.bottomAnchor.constraint(equalTo: myview.safeBottomAnchor).isActive = true
        mapView.leadingAnchor.constraint(equalTo: myview.safeLeadingAnchor).isActive = true
        mapView.topAnchor.constraint(equalTo: myview.safeTopAnchor).isActive = true
        mapView.trailingAnchor.constraint(equalTo: myview.safeTrailingAnchor).isActive = true
        mapView.delegate = self
        mapView.voiceAssistanceEnabled = false
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
    }
    
    
    deinit {
        print("MapViewContriller deinit")
    }
    
    func showAlert(title: String, message: String) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            DispatchQueue.main.async { [weak self] in
                if let strongSelf = self {
                    let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
                    alert.addAction(UIAlertAction.init(title: "OK", style: .cancel, handler: nil))
                    strongSelf.present(alert, animated: true)
                }
            }
        }
    }
}

extension MapViewController: BEMapAssistDelegate {
    func didRequestedForPreview(_ searchHelper: BESearchHelper) {
        mapView.preview()
    }
    func didRequestedForNavigation(_ searchHelper: BESearchHelper) {
        mapView.navigate()
    }
    func didReset(for searchHelper: BESearchHelper) {
        routePoints = []
        routeFloors = []
        mapView.reset()
    }
    func searchHelper(_ searchHelper: BESearchHelper, didRequestedforRoute points: [BEPoint]) {
        let wayPoints: BEPoints? = points.count <= 2 ? nil : Array(points[1 ..< points.count-1])
        let routeFloorList = mapView.getRoute(from: points[0], to: points[points.count-1], wayPoints: wayPoints)
        if routeFloorList.count > 0 {
            mapView.showRouteOnFloor(on: routeFloorList[0])
            routePoints = points
            routeFloors = routeFloorList
            searchHelper.didPlotRouteWith(points: points, floorList: routeFloorList)
        }
    }
    func searchHelper(_ searchHelper: BESearchHelper, didSelectPoint point: BEPoint) {
        mapView.select(point: point)
    }
    func searchHelper(_ searchHelper: BESearchHelper, didRequestedforResults text: String) {
        mapView.findMapPoints(searchText: text)
    }
    func searchHelper(_ searchHelper: BESearchHelper, didRequestedToShowRouteOn floor: BEFloor) {
        mapView.showRouteOnFloor(on: floor)
    }
}

extension MapViewController: BeCoDelegate {
    func beco(_ beCo: BeCo, didFailedWith error: Error) {
    }
    
    func beco(didFindSites sites: BESites, around location: CLLocation) {
        let mapSites: BESites = sites.filter({$0.identifier == UserDefaults.standard.string(forKey: "SITEID")})
        if mapSites.count > 0 {
            mapView.setSite(mapSites[0])
        } else if sites.count > 0 {
            mapView.setSite(sites[0])
        }
    }
}

extension MapViewController: BEViewDelegate {
    func becoView(_ mapView: BEView, didLoadWith site: BESite) {
        let allPoints = mapView.getPoints()
        mapPoints = Dictionary(uniqueKeysWithValues: allPoints.map{ ($0.pointId, $0) })
        if locationPointIDs.count > 1 {
            if let pointA = mapPoints[locationPointIDs[0]], let pointB = mapPoints[locationPointIDs[1]] {
                let routeFloors = mapView.getRoute(from: pointA, to: pointB)
                if routeFloors.count > 0 {
                    mapView.showRouteOnFloor(on: routeFloors.first!)
                }
            }
        }
    }
    
    func becoView(_ mapView: BEView, didFailedWith error: Error) {
        switch error {
        case BEError.BERoutingError,BEError.BERoutingErrorNoValidPath:
            let alert = UIAlertController(title: "Routing is not possible", message: "Please provide a valid source and destination", preferredStyle: .alert)
            alert.addAction(UIAlertAction.init(title: "OK", style: .cancel, handler: nil))
            present(alert, animated: true)
        default:
            print("BEView failed: \(error)")
        }
    }
    
    func becoView(_ mapView: BEView, didUpdateUserLocation point: BEPoint) {
        serchHelper?.currentLocation = point
        if let message = proximityMessages[point.name] {
            showAlert(title: point.name, message: message)
        }
    }
    
    func becoView(_ mapView: BEView, didSelectedPoint point: BEPoint) {
        print("Did select point with id: \(point.pointId)")
        serchHelper?.selectPoint(point: point)
    }
    
    func becoView(_ mapView: BEView, didFindResult results: BEPoints, forText searchText: String) {
        serchHelper?.updateSearchList(points: results)
    }
    
    func becoView(_ mapView: BEView, didRouteFrom source: BEPoint, to destination: BEPoint) {
    }
    
    func becoView(_ mapView: BEView, didStartPreviewFrom source: BEPoint, to destination: BEPoint) {
        serchHelper?.clearScreen()
    }
    
    func becoView(_ mapView: BEView, didEndPreviewWith source: BEPoint, destination: BEPoint) {
        serchHelper?.showNavigationInforViewWith(points: routePoints)
        serchHelper?.didPlotRouteWith(points: routePoints, floorList: routeFloors)
    }
    
    func becoView(_ mapView: BEView, didStartNavigatingFrom source: BEPoint, to destination: BEPoint) {
        serchHelper?.clearScreen()
    }
    
    func becoView(_ mapView: BEView, didEndNavigationWith source: BEPoint, destination: BEPoint) {
        mapView.reset()
        serchHelper?.resetScreen()
    }
    
    func becoView(_ mapView: BEView, didDeviatedTo point: BEPoint) {
        let alert = UIAlertController(title: "You are not in the path.", message: "Do you want to reroute?", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "Reroute", style: .destructive, handler:{ (UIAlertAction)in
            if let destination = self.routePoints.last {
                let routeFloorList = mapView.getRoute(from: point, to: destination/*, wayPoints: wayPoints*/)
                if routeFloorList.count > 0 {
                    mapView.navigate()
                }
            }
        }))
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler:{ (UIAlertAction)in
            alert.dismiss(animated: true)
        }))
        present(alert, animated: true)
    }
}
