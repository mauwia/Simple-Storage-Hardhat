const { ethers, run } = require("hardhat");

async function main() {
  let simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  let simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(simpleStorage.address,network.config.chainId && process.env.ETHERSCAN_API);
  if(network.config.chainId==4 && process.env.ETHERSCAN_API){
    console.log("heree")
    await simpleStorage.deployTransaction.wait(3)
    await verify(simpleStorage.address,[])
  }
  let currentValue=await simpleStorage.retrieve()
  console.log(currentValue)

  const txResponse=await simpleStorage.store(7)
  await txResponse.wait(1)
   currentValue=await simpleStorage.retrieve()
  console.log(currentValue)


}
async function verify(contractAddress, args) {
  console.log("verify");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgsParams: args,
    });
  } catch (error) {
    if(error.message.toLowerCase().includes("already verified")){
      console.log("already verified")
    }else{
      console.log(error)
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
