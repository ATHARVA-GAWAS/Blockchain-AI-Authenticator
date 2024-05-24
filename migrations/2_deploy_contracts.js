// migrations/2_deploy_contracts.js
const AIAuth = artifacts.require("AIAuth");

module.exports = function(deployer) {
  deployer.deploy(AIAuth);
};
