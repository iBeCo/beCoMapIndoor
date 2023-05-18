//
//  BENavigationAssistView.swift
//  MapAssistView
//
//  Created by test on 18/11/19.
//  Copyright © 2019 GlobeCo Technologies Pvt Ltd. All rights reserved.
//

import UIKit
import beCoMapIndoor

protocol BENavigationAssistDelegate : NSObjectProtocol  {
    func navigationAssistDidCancel(_ navigationAssist: BENavigationAssistView)
    func navigationAssistDidRequestedForNavigation(_ navigationAssist: BENavigationAssistView)
    func navigationAssistDidRequestedForPreview(_ navigationAssist: BENavigationAssistView)
    func navigationAssist(_ navigationAssist: BENavigationAssistView, didRequestedToShowRouteOn floor: BEFloor)
}

class BENavigationAssistView: UIView {
    
    weak var delegate: BENavigationAssistDelegate?
    var points: BEPoints = [] {
        didSet {
            guard points.count > 0 else {
                pointNameLabel.text = "Unknown point"
                floorNameLabel.text = "Unknown floor"
                return
            }
            pointNameLabel.text = points[points.count-1].name
            floorNameLabel.text = points[points.count-1].floor.floorDescription
        }
    }
    var floors: [BEFloor] = [] {
        didSet {
            if floors.count > 1 {
                floorListViewHeight.constant = 80
                assistViewHeight.constant = 222
                floorSwitcherView.isHidden = false
                addFloowSwitcher()
            } else {
                floorListViewHeight.constant = 0
                assistViewHeight.constant = 142
                floorSwitcherView.isHidden = true
                floorSwitcher?.removeFromSuperview()
                floorSwitcher = nil
            }
        }
    }
    
    @IBOutlet weak var contentView: UIView!
    @IBOutlet var pointNameLabel: UILabel!
    @IBOutlet var floorNameLabel: UILabel!
    
    @IBOutlet var floorSwitcherView: UIView!
    @IBOutlet var floorSwitcheContentView: UIView!
    private var floorSwitcher: UISegmentedControl? 
    @IBOutlet weak var startNavBtn: UIButton!
    
    @IBOutlet var floorListViewHeight: NSLayoutConstraint!
    @IBOutlet var assistViewHeight: NSLayoutConstraint!
    @IBOutlet weak var previewBtnTrailingConstraint: NSLayoutConstraint!
    
    
    // MARK: - Initialization
    override init(frame: CGRect) {
        super.init(frame: frame)
        didLoadView()
    }
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        didLoadView()
    }
    
    private func didLoadView() {
        Bundle.main.loadNibNamed("BENavigationAssistView", owner: self, options: nil)
        addSubview(contentView)
        contentView.frame = self.bounds
        contentView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
    }
    
    func setRouteWith(routePoints: [BEPoint], floorList:[BEFloor], navigationEnabled: Bool = false) {
        points = routePoints
        floors = floorList
        if navigationEnabled {
            startNavBtn.isHidden = false
            previewBtnTrailingConstraint.constant = 108
        } else {
            startNavBtn.isHidden = true
            previewBtnTrailingConstraint.constant = 7
        }
    }
    
    private func addFloowSwitcher() {
        if let _ = floorSwitcher {
            floorSwitcher?.removeFromSuperview()
            floorSwitcher = nil
        }
        let view: UISegmentedControl = UISegmentedControl(items : floors.map { $0.label })
        view.tintColor = UIColor.init(named: "BEThemaBlue", in: nil, compatibleWith: nil)
        view.selectedSegmentIndex = 0
        view.addTarget(self, action: #selector(switchFloor(_:)), for: .valueChanged)
        view.translatesAutoresizingMaskIntoConstraints = false
        floorSwitcheContentView.addSubview(view)
        view.bottomAnchor.constraint(equalTo: floorSwitcheContentView.safeBottomAnchor).isActive = true
        view.leadingAnchor.constraint(equalTo: floorSwitcheContentView.safeLeadingAnchor).isActive = true
        view.widthAnchor.constraint(equalToConstant: CGFloat(floors.count*46)).isActive = true
        floorSwitcher = view
    }
    func showView() {
        show()
    }
    func hideView() {
        hide()
        points.removeAll()
    }

    @IBAction func startNavTapped(_ sender: Any) {
        delegate?.navigationAssistDidRequestedForNavigation(self)
    }
    @IBAction func previewTapped(_ sender: Any) {
        delegate?.navigationAssistDidRequestedForPreview(self)
    }
    @IBAction func cancelTapped(_ sender: Any) {
        delegate?.navigationAssistDidCancel(self)
    }
    @IBAction func switchFloor(_ sender: UISegmentedControl) {
        delegate?.navigationAssist(self, didRequestedToShowRouteOn: floors[sender.selectedSegmentIndex])
    }
}
