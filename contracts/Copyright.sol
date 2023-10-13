// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Copyright {
    struct Image {
        uint _id;
        address user;
        bytes32 image;
        uint timestamp;
    }

    uint id;
    mapping(string => Image) imagesMap;

    function addImage(address _user, string memory _imageName) public returns (string memory) {
        // Check if the image with the given name already exists
        require(imagesMap[_imageName]._id == 0, "Image already exists Copyright");

        id++;
        Image storage newImage = imagesMap[_imageName];
        newImage._id = id;
        newImage.user = _user;
        newImage.image = keccak256(abi.encodePacked(_imageName));
        newImage.timestamp = block.timestamp;

        return "Image added successfully";
    }

    function getImage(string memory _imageName) public view returns (uint, address, bytes32, uint) {
        Image storage image = imagesMap[_imageName];
        require(image._id > 0, "Image not found");
        return (image._id, image.user, image.image, image.timestamp);
    }
}