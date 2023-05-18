//
//  BESearchHelper.swift
//  MapAssistView
//
//  Created by test on 24/10/19.
//  Copyright © 2019 GlobeCo Technologies Pvt Ltd. All rights reserved.
//

import Foundation
import UIKit
import beCoMapIndoor

@objc public protocol BEMapAssistDelegate : NSObjectProtocol  {
    func searchHelper(_ searchHelper: BESearchHelper, didRequestedforRoute points: [BEPoint])
    func searchHelper(_ searchHelper: BESearchHelper, didRequestedforResults text: String)
    func searchHelper(_ searchHelper: BESearchHelper, didSelectPoint point: BEPoint)
    func searchHelper(_ searchHelper: BESearchHelper, didRequestedToShowRouteOn floor: BEFloor)
    func didRequestedForPreview(_ searchHelper: BESearchHelper)
    func didRequestedForNavigation(_ searchHelper: BESearchHelper)
    func didReset(for searchHelper: BESearchHelper)
}

@objc public final class BESearchHelper: NSObject {
    
    var currentLocation: BEPoint?
    weak var delegate: BEMapAssistDelegate?
    private weak var parentViewController: UIViewController?
    private weak var view: UIView? {
        get {
            return parentViewController?.view
        }
    }
    private lazy var searchListView: BESearchListView = { [weak self] in
        var searchList: BESearchListView = BESearchListView()
        searchList.translatesAutoresizingMaskIntoConstraints = false
        searchList.isHidden = true
        return searchList
    }()
    private lazy var searchBar: BEMapSearchBar = { [weak self] in
        var searchView: BEMapSearchBar = BEMapSearchBar()
        searchView.translatesAutoresizingMaskIntoConstraints = false
        return searchView
    }()
    private lazy var navigationSearchBar: BENavSearchBar = { [weak self] in
        var searchView: BENavSearchBar = BENavSearchBar()
        searchView.translatesAutoresizingMaskIntoConstraints = false
        searchView.isHidden = true
        return searchView
    }()
    private lazy var pointAssistView: BEPointAssistView = { [weak self] in
        var view: BEPointAssistView = BEPointAssistView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.isHidden = true
        return view
    }()
    private lazy var navigationAssistView: BENavigationAssistView = { [weak self] in
        var view: BENavigationAssistView = BENavigationAssistView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.isHidden = true
        return view
    }()
    private lazy var navigationInfoView: BENavigationInfoView = { [weak self] in
        var view: BENavigationInfoView = BENavigationInfoView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.isHidden = true
        return view
    }()
    
    var navSearchBarHeight: CGFloat {
        let rowHeight = 48
        let supportViewHeight = (navigationSearchBar.pointsList.filter { $0 != nil }.count) >= 2 ? 50 : 0
        let minHight = CGFloat((2*rowHeight)+23)
        let maxHeight = CGFloat((3*rowHeight)+23+50+(rowHeight/2))
        let actualHeight = CGFloat((navigationSearchBar.pointsList.count*rowHeight)+23+supportViewHeight)
        return actualHeight < minHight ? minHight : (actualHeight > maxHeight ? maxHeight : actualHeight)
    }
    private var navSearchBarHeightContrain: NSLayoutConstraint?
    
    ///searchIndex represents the index for point
    ///searchIndex -2: Not searching
    ///searchIndex -1: Normal Search
    ///searchIndex >= 0: Navigation Search, value represents the index
    private var searchIndex: Int = -2
    
    
    // MARK: - Initialization
    @objc public init(with parent: UIViewController) {
        parentViewController = parent
        super.init()
        setSearchHelperContrains()
        NotificationCenter.default.addObserver(self, selector: #selector(rotated), name: UIDevice.orientationDidChangeNotification, object: nil)
    }
    private func setSearchHelperContrains() {
        if let parentView = view {
            searchBar.delegate = self
            parentView.addSubview(searchBar)
            searchBar.topAnchor.constraint(equalTo: parentView.safeTopAnchor, constant: -44).isActive = true
            searchBar.leadingAnchor.constraint(equalTo: parentView.safeLeadingAnchor).isActive = true
            searchBar.trailingAnchor.constraint(equalTo: parentView.safeTrailingAnchor).isActive = true
            searchBar.heightAnchor.constraint(equalToConstant: 107).isActive = true
             
            navigationSearchBar.delegate = self
            parentView.addSubview(navigationSearchBar)
            let leadingSpace = NSLayoutConstraint(item: navigationSearchBar, attribute: .leading, relatedBy: .equal, toItem: parentView, attribute: .leading, multiplier: 1.0, constant: 0)
            let trailingSpace = NSLayoutConstraint(item: navigationSearchBar, attribute: .trailing, relatedBy: .equal, toItem: parentView, attribute: .trailing, multiplier: 1.0, constant: 0)
            let topSpace = NSLayoutConstraint(item: navigationSearchBar, attribute: .top, relatedBy: .equal, toItem: parentView, attribute: .topMargin, multiplier: 1.0, constant: 0)
            navSearchBarHeightContrain = NSLayoutConstraint(item: navigationSearchBar, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute,multiplier: 1, constant: navSearchBarHeight)
            NSLayoutConstraint.activate([leadingSpace,trailingSpace,topSpace,navSearchBarHeightContrain!])
            
            searchListView.delegate = self
            parentView.addSubview(searchListView)
            searchListView.topAnchor.constraint(equalTo: searchBar.safeBottomAnchor).isActive = true
            searchListView.leadingAnchor.constraint(equalTo: parentView.safeLeadingAnchor).isActive = true
            searchListView.trailingAnchor.constraint(equalTo: parentView.safeTrailingAnchor).isActive = true
            searchListView.bottomAnchor.constraint(equalTo: parentView.safeBottomAnchor).isActive = true
            
            pointAssistView.delegate = self
            parentView.addSubview(pointAssistView)
            pointAssistView.bottomAnchor.constraint(equalTo: parentView.safeBottomAnchor).isActive = true
            pointAssistView.leadingAnchor.constraint(equalTo: parentView.safeLeadingAnchor).isActive = true
            pointAssistView.trailingAnchor.constraint(equalTo: parentView.safeTrailingAnchor).isActive = true
            pointAssistView.heightAnchor.constraint(equalToConstant: 140).isActive = true
            
            navigationAssistView.delegate = self
            parentView.addSubview(navigationAssistView)
            navigationAssistView.bottomAnchor.constraint(equalTo: parentView.safeBottomAnchor).isActive = true
            navigationAssistView.leadingAnchor.constraint(equalTo: parentView.safeLeadingAnchor).isActive = true
            navigationAssistView.trailingAnchor.constraint(equalTo: parentView.safeTrailingAnchor).isActive = true
            navigationAssistView.heightAnchor.constraint(equalToConstant: 140).isActive = true
            
            navigationInfoView.delegate = self
            parentView.addSubview(navigationInfoView)
            navigationInfoView.topAnchor.constraint(equalTo: parentView.safeTopAnchor).isActive = true
            navigationInfoView.leadingAnchor.constraint(equalTo: parentView.safeLeadingAnchor).isActive = true
            navigationInfoView.trailingAnchor.constraint(equalTo: parentView.safeTrailingAnchor).isActive = true
            navigationInfoView.heightAnchor.constraint(equalToConstant: 170).isActive = true
        }
    }
    
    deinit {
        print("Search helper deinit")
    }
    
    @objc func rotated() {
        if UIDevice.current.orientation.isLandscape {
        }
        if UIDevice.current.orientation.isPortrait {
        }
    }
    
    // MARK: - Access Methods
    @objc public func selectPoint(point: BEPoint) {
        showSearchBar(with: point)
        showPointAssistView(point: point)
        searchListView.hideView()
        navigationSearchBar.hideView()
        navigationSearchBar.cancelSearch()
        navigationAssistView.hideView()
        navigationInfoView.hideView()
        delegate?.searchHelper(self, didSelectPoint: point)
    }
    @objc public func updateSearchList(points: [BEPoint]) {
        searchListView.loadPointsList(points: points)
    }
    @objc public func didPlotRouteWith(points: [BEPoint], floorList:[BEFloor]) {
        showNavigationAssistView(routePoints: points, floorList: floorList)
    }
    @objc public func resetScreen() {
        searchIndex = -2
        showSearchBar()
        searchListView.hideView()
        navigationSearchBar.hideView()
        navigationSearchBar.cancelSearch()
        pointAssistView.hideView()
        navigationAssistView.hideView()
        navigationInfoView.hideView()
        delegate?.didReset(for: self)
    }
    @objc public func clearScreen() {
        searchBar.hideView()
        searchListView.hideView()
        navigationSearchBar.hideView()
        pointAssistView.hideView()
        navigationAssistView.hideView()
        navigationInfoView.hideView()
    }
    
    @objc public func showNavigationOption(points: [BEPoint]) {
        showNavigationInforViewWith(points: points)
    }
}

extension BESearchHelper: BESearchBarDelegate {
    @objc public func showSearchBar(with point: BEPoint? = nil, editingEnabled: Bool = false) {
        searchBar.showView()
        searchBar.setPoint(point: point)
        if editingEnabled {
            showSearchList()
        } else {
            hideSearchList()
        }
    }
    func searchBar(_ searchBar: BEMapSearchBar, searchFieldDidChangeCarecter string: String) {
        delegate?.searchHelper(self, didRequestedforResults: string)
    }
    func searchBarDidBeginEditing(_ searchBar: BEMapSearchBar) {
        showSearchList()
    }
    func searchBarDidEndEditing(_ searchBar: BEMapSearchBar) {
        hideSearchList()
        if searchIndex >= 0 {
            showNavigationBar()
        } else {
            showSearchBar()
        }
    }
    func searchBarShouldNavigate(_ searchBar: BEMapSearchBar) {
        showNavigationBar()
    }
    func searchBarDidClear(_ searchBar: BEMapSearchBar) {
        if searchIndex < 0 {
            pointAssistView.hideView()
        }
    }
}

extension BESearchHelper: BENavSearchBarDelegate {
    
    @objc public func showNavigationBar(destination: BEPoint? = nil) {
        navigationSearchBar.showView()
        if destination != nil {
            navigationSearchBar.addPointAtIndex(index: navigationSearchBar.pointsList.count-1, point: destination)
        }
        if navigationSearchBar.pointsList[0] == nil {
            navigationSearchBar.addPointAtIndex(index: 0, point: currentLocation)
        }
    }
    
    @objc public func showNavigationBarWith(points: BEPoints = []) {
        navigationSearchBar.setPoints(routePoints: points)
        navigationSearchBar.showView()
        setNavigationSearchBarHeight()
    }
    private func setNavigationSearchBarHeight() {
        UIView.animate(withDuration: 0.2, delay: 0.0, options: UIView.AnimationOptions.curveEaseIn, animations: {
            self.navSearchBarHeightContrain?.constant = self.navSearchBarHeight
            self.navigationSearchBar.layoutIfNeeded()
        }, completion: nil)
    }
    private func requestForReroute() {
        let finalList = navigationSearchBar.pointsList.filter { $0 != nil }
        if finalList.count > 1 {
            delegate?.searchHelper(self, didRequestedforRoute: finalList as! [BEPoint])
        }
    }
    
    // MARK: - BENavSearchBarDelegate
    func navSearchBar(_ navSearchBar: BENavSearchBar, didAdd point: BEPoint?, at index: Int) {
        setNavigationSearchBarHeight()
        if let _ = point {
             requestForReroute()
        }
    }
    func navSearchBar(_ navSearchBar: BENavSearchBar, didRemove point: BEPoint?, at index: Int) {
        setNavigationSearchBarHeight()
        if let _ = point {
             requestForReroute()
        }
    }
    func navSearchBar(_ navSearchBar: BENavSearchBar, didChangedOrder points: BEPoints) {
        requestForReroute()
    }
    func navSearchBar(_ navSearchBar: BENavSearchBar, didCompleteSearch points: BEPoints) {
        navigationSearchBar.hideView()
        showNavigationInforViewWith(points: points)
        setNavigationSearchBarHeight()
    }
    func navSearchBar(_ navSearchBar: BENavSearchBar, didRequestedForSearchFor index: Int) {
        navigationSearchBar.hideView()
        if let point = navigationSearchBar.pointsList[index] {
            showSearchBar(with: point, editingEnabled: true)
        } else {
            showSearchBar(editingEnabled: true)
        }
        searchIndex = index
    }
    func didCanceledSearch(for navSearchBar: BENavSearchBar) {
        resetScreen()
        setNavigationSearchBarHeight()
    }
}

extension BESearchHelper: BESearchListDelegate {
    // MARK: - BESearchListDelegate
    func searchlist(_ searchlist: BESearchListView, didLoad pointList: [BEPoint]) {
        //print("Did load search BESearchListView")
    }
    
    func searchlist(_ searchlist: BESearchListView, didSelected point: BEPoint) {
        if searchIndex >= 0 {
            showNavigationBar()
            navigationSearchBar.addPointAtIndex(index: searchIndex, point: point)
        } else {
            selectPoint(point: point)
        }
        hideSearchList()
    }
    
    private func showSearchList() {
        searchListView.showView()
        searchBar.enableSearchMode()
    }
    private func hideSearchList() {
        searchListView.hideView()
        searchBar.disableSearchMode()
    }
}

extension BESearchHelper: BEPointAssistDelegate {
    private func showPointAssistView(point: BEPoint) {
        pointAssistView.show()
        navigationAssistView.hide()
        pointAssistView.setPoint(point: point)
    }
    
    // MARK: - BEPointAssistDelegate
    func pointAssist(_ pointAssist: BEPointAssistView, didRequestedForDirectionTo point: BEPoint) {
        showNavigationBar(destination: point)
        navigationInfoView.hideView()
        pointAssistView.hideView()
    }
    
    func pointAssistDidCancel(_ pointAssist: BEPointAssistView) {
        resetScreen()
    }
}

extension BESearchHelper: BENavigationAssistDelegate {
    private func showNavigationAssistView(routePoints: [BEPoint], floorList:[BEFloor]) {
        pointAssistView.hideView()
        navigationAssistView.show()
        navigationAssistView.setRouteWith(routePoints: routePoints, floorList: floorList, navigationEnabled: (currentLocation != nil))
    }
    
    // MARK: - BENavigationAssistDelegate
    func navigationAssistDidCancel(_ navigationAssist: BENavigationAssistView) {
        resetScreen()
    }
    
    func navigationAssistDidRequestedForNavigation(_ navigationAssist: BENavigationAssistView) {
        delegate?.didRequestedForNavigation(self)
        navigationAssistView.hide()
    }
    
    func navigationAssistDidRequestedForPreview(_ navigationAssist: BENavigationAssistView) {
        delegate?.didRequestedForPreview(self)
        navigationAssistView.hide()
    }
    
    func navigationAssist(_ navigationAssist: BENavigationAssistView, didRequestedToShowRouteOn floor: BEFloor) {
        delegate?.searchHelper(self, didRequestedToShowRouteOn: floor)
    }
}

extension BESearchHelper: BENavigationInfoViewDelegate {
    
    func showNavigationInforViewWith(points: [BEPoint]) {
        navigationInfoView.setRouteWith(routePoints: points)
        navigationInfoView.showView()
    }
    
    // MARK: - BENavigationInfoViewDelegate
    func navInfoView(_ navInfoView: BENavigationInfoView, didRequestedForEditWith points: [BEPoint]) {
        showNavigationBarWith(points: points)
        navigationInfoView.hideView()
    }
    func didCancelednavigation(for navInfoView: BENavigationInfoView) {
        resetScreen()
    }
}
