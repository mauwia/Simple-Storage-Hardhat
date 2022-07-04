const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorageFactory,simpleStorage
  beforeEach(async()=>{
    simpleStorageFactory=await ethers.getContractFactory("SimpleStorage")
    simpleStorage=await simpleStorageFactory.deploy()
  })
  it("Should return the new greeting once it's changed", async function () {
    let currentValue= await simpleStorage.retrieve()
    let expectedValue="0"
    assert.equal(currentValue.toString(),expectedValue)
  });
  it("Should update when we call store", async function () {
    let expectedValue="7"
    let txResponse=await simpleStorage.store(7)
    txResponse.wait(1)
    let currentValue= await simpleStorage.retrieve()

    assert.equal(currentValue.toString(),expectedValue)
  });
});
