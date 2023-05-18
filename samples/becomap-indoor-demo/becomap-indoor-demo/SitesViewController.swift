//
//  SitesViewController.swift
//  beCoMapDemo
//
//  Created by SayOne Technologies on 16/04/20.
//  Copyright © 2020 GlobeCo Technologies Pvt Ltd. All rights reserved.
//

import UIKit
import beCoMapIndoor
import CoreLocation

class SitesViewController: UIViewController {
    
    var mapSites: BESites = []
    var siteImages = [#imageLiteral(resourceName: "ernakulam_medical_college"), #imageLiteral(resourceName: "alappuzha_medical_college"), #imageLiteral(resourceName: "amrita_hospital"), #imageLiteral(resourceName: "aster_medcity"), #imageLiteral(resourceName: "kasaragod-hospital-2"), #imageLiteral(resourceName: "kims_hospital_kochi")]
    let beCoManager = BeCo.sharedInstance()
    
    @IBOutlet weak var sitesTable: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let latitude: CLLocationDegrees = 37.2
        let longitude: CLLocationDegrees = 22.9
        let location: CLLocation = CLLocation(latitude: latitude,  longitude: longitude)
        
        beCoManager.delegate = self
        beCoManager.getSiteDetails(around: location)
        
        let nib = UINib.init(nibName: "SiteTableViewCell", bundle: nil)
        sitesTable.register(nib, forCellReuseIdentifier: "SiteTableViewCell")
        sitesTable.tableFooterView = UIView(frame: .zero)
    }
    
//    override func viewDidAppear(_ animated: Bool) {
//        super.viewDidAppear(animated)
//        sitesTable.reloadData()
//    }
}

extension SitesViewController: BeCoDelegate {
    func beco(_ beCo: BeCo, didFailedWith error: Error) {
        
    }
    
    func beco(didFindSites sites: BESites, around location: CLLocation) {
        mapSites = sites
        sitesTable.reloadData()
    }
}

extension SitesViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return mapSites.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let site = mapSites[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: "SiteTableViewCell", for: indexPath) as! SiteTableViewCell
        cell.siteNameLabel.text = site.name
        cell.siteAddressLabel.text = site.address
        cell.siteImageView.image = siteImages[indexPath.row]
        cell.selectionStyle = .none
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let site = mapSites[indexPath.row]
        if let vc = UIStoryboard.init(name: "Main", bundle: Bundle.main).instantiateViewController(withIdentifier: "MapViewController") as? MapViewController {
            vc.site = site
            self.navigationController?.pushViewController(vc, animated: true)
        }
    }
}

