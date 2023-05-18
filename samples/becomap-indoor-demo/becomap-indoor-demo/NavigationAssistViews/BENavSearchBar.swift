//
//  BENavSearchBar.swift
//  MapAssistView
//
//  Created by test on 29/10/19.
//  Copyright © 2019 GlobeCo Technologies Pvt Ltd. All rights reserved.
//

import UIKit
import beCoMapIndoor

let BE_MAX_POINT_COUNT = 5
let BE_POINT_LABEL_LIST: [String] = ["A","B","C","D","E"]

protocol BENavSearchBarDelegate : NSObjectProtocol  {
    func navSearchBar(_ navSearchBar: BENavSearchBar, didAdd point: BEPoint?, at index: Int)
    func navSearchBar(_ navSearchBar: BENavSearchBar, didRemove point: BEPoint?, at index: Int)
    func navSearchBar(_ navSearchBar: BENavSearchBar, didChangedOrder points: BEPoints)
    func navSearchBar(_ navSearchBar: BENavSearchBar, didCompleteSearch points: BEPoints)
    func navSearchBar(_ navSearchBar: BENavSearchBar, didRequestedForSearchFor index: Int)
    func didCanceledSearch(for navSearchBar: BENavSearchBar)
}

class BENavSearchBar: UIView {
    
    weak var delegate: BENavSearchBarDelegate?
    var pointsList: [BEPoint?] = [nil,nil] {
        didSet {
            let flinalPoints = pointsList.filter { $0 != nil }
            if flinalPoints.count >= 2 {
                showSupportView()
            } else {
                hideSupportView()
            }
            descriptionLabel.text = "\(flinalPoints.count) \(flinalPoints.count > 1 ? "Points" : "Point") selected."
        }
    }
    
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var pointListTable: UITableView!
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet var supportView: UIView!
    @IBOutlet var tableViewBottomSpacing: NSLayoutConstraint!
    
    // MARK: - Initialization
    @objc public override init(frame: CGRect) {
        super.init(frame: frame)
        didLoadView()
    }
    @objc public required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        didLoadView()
    }
    private func didLoadView() {
        Bundle.main.loadNibNamed("BENavSearchBar", owner: self, options: nil)
        addSubview(contentView)
        contentView.frame = self.bounds
        contentView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
        
        let nib = UINib.init(nibName: "BENavSearchCell", bundle: nil)
        pointListTable.register(nib, forCellReuseIdentifier: "BENavSearchCell")
        pointListTable.showsHorizontalScrollIndicator = false
        pointListTable.showsVerticalScrollIndicator = false
        
        hideSupportView()
    }
    
    // MARK: - Access Methods
    func addPointAtIndex(index: Int, point: BEPoint?)  {
        var newIndex = index
        if pointsList.count > newIndex {
            pointsList[newIndex] = point
        } else if pointsList.count < BE_MAX_POINT_COUNT {
            pointsList.append(point)
            newIndex = pointsList.count-1 
        } else {
            return
        }
        refreshPointList()
        delegate?.navSearchBar(self, didAdd: point, at: newIndex)
        if pointsList.count != 2 && pointsList[pointsList.count-1] != nil && pointsList.count < BE_MAX_POINT_COUNT {
            addPointAtIndex(index: pointsList.count, point: nil)
        }
    }
    func setPoints(routePoints: [BEPoint]) {
        var points: [BEPoint?] = routePoints
        while points.count < 2 {
            points.append(nil)
        }
        pointsList = points
        refreshPointList()
    }
    func removePointAtIndex(index: Int)  {
        guard pointsList.count > index else {
            return
        }
        let objectToDelete = pointsList[index]
        pointsList.remove(at: index)
        refreshPointList()
        delegate?.navSearchBar(self, didRemove: objectToDelete, at: index)
    }
    func cancelSearch() {
        pointsList = [nil,nil]
        refreshPointList()
    }
    func showSupportView() {
        supportView.isHidden = false
        tableViewBottomSpacing.constant = 54
    }
    func hideSupportView() {
        supportView.isHidden = true
        tableViewBottomSpacing.constant = 4
    }
    func refreshPointList() {
        UIView.transition(with: pointListTable, duration: 0.35,  options: .transitionCrossDissolve, animations: {
            self.pointListTable.reloadData()
        })
    }
    func showView() {
        show()
    }
    func hideView() {
        hide()
    }
    
    // MARK: - Actions
    @IBAction func doneSearchTapped(_ sender: Any) {
        let finalList = pointsList.filter { $0 != nil }
        pointsList = finalList
        refreshPointList()
        delegate?.navSearchBar(self, didCompleteSearch: finalList as! [BEPoint])
    }
    @IBAction func backButtonTapped(_ sender: Any) {
        cancelSearch()
        delegate?.didCanceledSearch(for: self)
    }
}

extension BENavSearchBar: UITableViewDelegate, UITableViewDataSource {
    // MARK: - UITableViewDataSource
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return pointsList.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "BENavSearchCell", for: indexPath) as! BENavSearchCell
        cell.selectionStyle = .none
        cell.cellIndex = indexPath.row
        cell.delegate = self
        if indexPath.row == 0 {
            cell.currentLocImage.isHidden = false
            cell.currentLocImage.image = UIImage.init(named: "ico_be_current_loc")
            cell.pointIndexLabel.isHidden = true
            cell.rightButton.isHidden = pointsList.count <= 2
            cell.rightButton.setImage(UIImage.init(named: "ico_be_close_icon"), for: .normal)
        } else if indexPath.row == pointsList.count-1 {
            cell.currentLocImage.isHidden = false
            cell.currentLocImage.image = UIImage.init(named: "ico_be_Destination")
            cell.pointIndexLabel.isHidden = true
            cell.rightButton.isHidden = false
            if pointsList.count == 2 {
                cell.rightButton.setImage(UIImage.init(named: "ico_be_PointAdd"), for: .normal)
            } else if pointsList[pointsList.count-1] != nil {
                cell.rightButton.setImage(UIImage.init(named: "ico_be_close_icon"), for: .normal)
            } else {
                cell.rightButton.isHidden = true
            }
        } else {
            cell.currentLocImage.isHidden = true
            cell.pointIndexLabel.isHidden = false
            cell.pointIndexLabel.text = BE_POINT_LABEL_LIST[indexPath.row-1]
            cell.rightButton.isHidden = false
            cell.rightButton.setImage(UIImage.init(named: "ico_be_close_icon"), for: .normal)
        }
        
        if let point = pointsList[indexPath.row] {
            cell.pointNameLabel.text = point.name
            cell.pointNameLabel.textColor = UIColor.init(named: "BEBlack", in: nil, compatibleWith: nil)
        } else {
            cell.pointNameLabel.text = "Where to go?"
            cell.pointNameLabel.textColor = UIColor.init(named: "BECoolGray", in: nil, compatibleWith: nil)
        }
        return cell
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        delegate?.navSearchBar(self, didRequestedForSearchFor: indexPath.row)
    }
    func scrollToBottom() {
        pointListTable.scrollToBottom()
    }
}

extension BENavSearchBar: BECellelegate {
    // MARK: - BECellelegate
    func didSelectButton(index: Int, tag: Int) {
        if pointsList.count == 2 && index == 1 {
            addPointAtIndex(index: index+1, point: nil)
            scrollToBottom()
            return
        }
        if index == pointsList.count-1 && pointsList[index] != nil{
            addPointAtIndex(index: index, point: nil)
        } else {
            removePointAtIndex(index: index)
        }
        refreshPointList()
    }
}
