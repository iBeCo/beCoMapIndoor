//
//  BEMapSearchBar.swift
//  MapAssistView
//
//  Created by test on 24/10/19.
//  Copyright © 2019 GlobeCo Technologies Pvt Ltd. All rights reserved.
//

import UIKit
import beCoMapIndoor

protocol BESearchBarDelegate : NSObjectProtocol  {
    func searchBar(_ searchBar: BEMapSearchBar, searchFieldDidChangeCarecter string: String)
    func searchBarDidBeginEditing(_ searchBar: BEMapSearchBar)
    func searchBarDidEndEditing(_ searchBar: BEMapSearchBar)
    func searchBarShouldNavigate(_ searchBar: BEMapSearchBar)
    func searchBarDidClear(_ searchBar: BEMapSearchBar)
}

class BEMapSearchBar: UIView {
    
    weak var delegate: BESearchBarDelegate?
    var navButtonEnabled: Bool = true
    @IBOutlet weak var searchBarView: BEShadowView!
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var navButton: UIButton!
    @IBOutlet weak var searchField: UITextField!
    @IBOutlet weak var leftButton: UIButton!
    
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
        Bundle.main.loadNibNamed("BEMapSearchBar", owner: self, options: nil)
        addSubview(contentView)
        contentView.frame = self.bounds
        contentView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self, name: UIDevice.orientationDidChangeNotification, object: nil)
    }
    
    // MARK: - Access Methods
    public func setPoint(point: BEPoint? = nil) {
        searchField.text = point?.name
        if point == nil {
            enableNavButton()
        } else {
            enableClearButton()
        }
    }
    private func enableClearButton() {
        navButtonEnabled = false
        navButton.backgroundColor = UIColor.white
        navButton.setImage(UIImage.init(named: "ico_be_close_icon"), for: .normal)
    }
    private func enableNavButton() {
        navButtonEnabled = true
        navButton.backgroundColor = UIColor.init(named: "BEThemaBlue", in: nil, compatibleWith: nil)
        navButton.setImage(UIImage.init(named: "ico_be_right_arrow"), for: .normal)
    }
    func enableSearchMode() {
        backgroundColor = UIColor.white
        searchBarView.borderColor = UIColor.init(named: "BELightGray", in: nil, compatibleWith: nil)
        searchBarView.shadowColor = UIColor.clear
        leftButton.setImage(UIImage.init(named: "ico_be_back_icon"), for: .normal)
        searchField.becomeFirstResponder()
    }
    func disableSearchMode() {
        backgroundColor = UIColor.clear
        searchBarView.borderColor = UIColor.white
        searchBarView.shadowColor = UIColor.black
        leftButton.setImage(UIImage.init(named: "ico_be_search_icon"), for: .normal)
        searchField.endEditing(true)
    }
    func showView(editingEnabled: Bool = false) {
        if isHidden {
            show()
        }
        if editingEnabled {
            searchField.becomeFirstResponder()
        } else {
            searchField.endEditing(true)
        }
    }
    func hideView() {
        if !isHidden {
            hide()
        }
        setPoint(point: nil)
        searchField.endEditing(true)
    }
    
    // MARK: - Actions
    @IBAction func navButtonTapped(_ sender: UIButton) {
        if navButtonEnabled {
            delegate?.searchBarShouldNavigate(self)
        } else {
            searchField.text = nil
            enableNavButton()
            delegate?.searchBarDidClear(self)
        }
    }
    @IBAction func leftButtonTapped(_ sender: Any) {
        delegate?.searchBarDidEndEditing(self)
    }
    
    // MARK: - TextField Delegates
    @IBAction func textFieldDidChange(_ sender: UITextField) {
        if let currentText = sender.text, currentText.count > 0 {
            delegate?.searchBar(self, searchFieldDidChangeCarecter: currentText)
            enableClearButton()
        } else {
            enableNavButton()
            delegate?.searchBarDidClear(self)
        }
    }
}

extension BEMapSearchBar: UITextFieldDelegate {
    func textFieldDidBeginEditing(_ textField: UITextField) {
        delegate?.searchBarDidBeginEditing(self)
    }
    func textFieldDidEndEditing(_ textField: UITextField) {
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.endEditing(true)
        return true
    }
}
