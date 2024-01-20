// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.9;

import "./../interfaces/IAlpDeployer.sol";
import "./../interfaces/IFactory.sol";
import "./ALP.sol";

/**
 * @title Alp deploying functionality
 **/
abstract contract AlpDeployer is IAlpDeployer {
    struct Parameters {
        address factory;
        address token;
        string name;
        uint8 decimals;
    }

    Parameters public override parameters;

    /**
     * @dev Deploys a alp with the given parameters by transiently setting
     * the parameters storage slot and then clearing it after deploying the alp.
     * @param factory The contract address of the factory
     * @param token The token of the alp
     * @param name The name of the alp
     * @return alp Address of a new alp
     */
    function deploy(
        address factory,
        address token,
        string memory name,
        uint8 decimals
    ) internal returns (address alp) {
        parameters = Parameters({
            factory: factory,
            token: token,
            name: name,
            decimals: decimals
        });
        alp = address(
            new ALP{salt: keccak256(abi.encode(token))}(
                IFactory(factory).resolver()
            )
        );

        ALP(alp).transferOwnership(msg.sender);

        delete parameters;
    }

    // LINE_SALT_PROD_{1695991730}
}
