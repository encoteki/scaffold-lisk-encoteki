import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, getOrNull } = hre.deployments;

  // read previously deployed impls from the registry
  const daoImpl = await getOrNull("DAOImplementation");
  const bpImpl = await getOrNull("BusinessProposalImplementation");

  if (!daoImpl) throw new Error("DAOImplementation not found. Run with --tags DAOImplementation first.");
  if (!bpImpl)
    throw new Error("BusinessProposalImplementation not found. Run with --tags BusinessProposalImplementation first.");

  // Constructor args
  // const DAO_IMPL_ADDRESS = daoImpl.address;
  // const BP_IMPL_ADDRESS = bpImpl.address;
  // const ERC721_ADDRESS = "0x905181635f2FEB3c62f6eF216106eF06c01b449E";

  const DAO_IMPL_ADDRESS = "0xB6b899b2343Dd703CD70d719bccf1c82E0979f0C";
  const BP_IMPL_ADDRESS = "0xc25FA8c40Ef178a62502dB2C7153b24a64F6250b";
  const ERC721_ADDRESS = "0x905181635f2FEB3c62f6eF216106eF06c01b449E";

  const result = await deploy("ProposalFactory", {
    from: deployer,
    contract: "ProposalFactory",
    args: [DAO_IMPL_ADDRESS, BP_IMPL_ADDRESS, ERC721_ADDRESS],
    log: true,
    autoMine: true,
  });

  console.log(`👋 ProposalFactory deployed at: ${result.address}`);
};

export default deployFactory;
// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags ProposalFactory
deployFactory.tags = ["ProposalFactory"];
