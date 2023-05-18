// swift-tools-version: 5.8
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "beCoMapIndoor",
    platforms: [
        .iOS(.v13)
    ],
    products: [
        .library(
            name: "beCoMapIndoor",
            targets: ["beCoMapIndoor"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-protobuf.git", from: "1.21.0"),
    ],
    targets: [
        .binaryTarget(name: "beCoMapIndoor", path: "./Sources/beCoMapIndoor.xcframework"),
    ]
)
