Pod::Spec.new do |spec|
  spec.name         = "beCoMapIndoor"
  spec.version      = "0.0.5"
  spec.summary      = "Navigation experience made simple.."
  spec.description  = "Our solutions are designed to minimise effort. We make sure our services help users to reachdestinations quicker and without confusion. Offering better control and visibility through our mapbased advanced solutions, we help organisations achieve goals with minimum loss of time and money."
  spec.homepage     = "https://becomap.com"
  spec.license      = { :type => "MIT", :text => "The MIT License (MIT) \n Copyright (c) 2019 GlobeCo Technologies Pvt Ltd \n All rights reserved GlobeCo Technologies Pvt Ltd \n\n The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. \n THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN SOFTWARE." }
  spec.homepage         = 'https://github.com/iBeCo/beCoMapIndoor'
  spec.author             = { "GlobeCo Technologies Pvt Ltd" => "hello@becomap.com" }
  spec.platform     = :ios
  spec.ios.deployment_target = '13.0'
  spec.source           = { :git => 'https://github.com/iBeCo/beCoMapIndoor.git', :tag => "0.0.5" }
  spec.dependency 'SwiftProtobuf', '~> 1.21.0'
  spec.swift_version = "5.0"
end
