//
//  HomeViewController.swift
//  becomap-indoor-demo
//
//  Created by Mithin on 07/08/23.
//

import UIKit

class HomeViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func showMap(_ sender: UIButton) {
        let controller = self.storyboard?.instantiateViewController(withIdentifier: "MapViewController") as! MapViewController
        switch sender.tag {
        case 1:
            let parkingloc = ["1f28f3dc-ad93-5512-bbc2-66c20fabf0a5","0bfda356-1ac0-5d5e-982c-e9dca852c891"]
            controller.locationPointIDs = parkingloc
        case 2:
            let points: [String] = ["1f28f3dc-ad93-5512-bbc2-66c20fabf0a5","0bfda356-1ac0-5d5e-982c-e9dca852c891"]
            controller.locationPointIDs = points
        default:
            break
        }
        self.navigationController?.pushViewController(controller, animated: true)
    }

}
