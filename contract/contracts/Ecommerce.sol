// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Ecommerce{

    address public owner;
    mapping(uint => Product) public products;
    mapping(uint => Transactions) public transactions;

    // this struct stores seller's products
    struct Product{
        address payable seller;
        uint productID;
        string productName;
        uint productPrice;
        string productCategory;
        string productDescription;
        string productImage;
        uint productQuantity;
        bool deleted;
    }
    uint[] public productIds;

    // this struct stores the store transactions
    struct Transactions{
        uint transactionID;
        address payable buyerAddress;
        address payable sellerAddress;
        string purchasedProductName;
        uint transactionAmount;
        string userName;
        string userAddress;
        bool completed;
    }
    uint[] public transactionIds;


    constructor() {
        owner = msg.sender;
    }


    // modifier to restrict access to only owners
    modifier onlyOwner{
        require(msg.sender == owner, "This function can only be performed by the owner");
        _;
    }

    // this function can be used to create products in the ecommerce store
    function createProduct(string memory _productName, uint _productPrice, string memory _productCategory, string memory _productDescription, string memory _productImage, uint _productQuantity) public {
        // generate random productIds and multiply them together to get a very random productId
        uint _productIdA = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % 1000;

        uint _productIdB = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % 50;

        uint _productIdC = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % 30;

        uint _productId = _productIdA * _productIdB + _productIdC;
        
        products[_productId] = Product(payable(msg.sender), _productId, _productName, _productPrice, _productCategory, _productDescription, _productImage, _productQuantity, false);
        productIds.push(_productId);
    }

    // this function can be used for deleting products in the store
    function deleteProduct(uint _productID) public onlyOwner {
        products[_productID].deleted = true;
    }

    // this function can be used to purchase products in the cart and store the money in the escrow
    function purchaseProduct(uint[] memory productArray, string memory _userName, string memory _userAddress) public payable {
        for(uint i=0; i < productArray.length; i++){

            uint _purchasedProductId = (productArray[i])/10;
            uint _transactionId = uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
            msg.sender))) % 1000 * _purchasedProductId;

            address payable _sellerAddress = products[_purchasedProductId].seller;
            string memory _purchasedProductName = products[_purchasedProductId].productName;
            uint _purchasedProductPrice = (products[_purchasedProductId].productPrice) * 10**18;

            _sellerAddress.transfer(_purchasedProductPrice);

            transactions[_transactionId] = Transactions(_transactionId, payable(msg.sender), payable(_sellerAddress), _purchasedProductName, _purchasedProductPrice, _userName, _userAddress, false);
            transactionIds.push(_transactionId);      

        }   
    }

    function productArrayLength() public view returns(uint){
        return productIds.length;
    }

    function transactionArrayLength() public view returns(uint){
        return transactionIds.length;
    }
}