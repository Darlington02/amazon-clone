const Ecommerce = artifacts.require("Ecommerce");

module.exports = function (deployer) {
  deployer.deploy(Ecommerce);
};
