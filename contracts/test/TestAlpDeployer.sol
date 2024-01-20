// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./../interfaces/IAlpDeployer.sol";
import "./../interfaces/IFactory.sol";

import "./../alp/ALP.sol";

contract TestAlpDeployer is IAlpDeployer {
    struct Parameters {
        address factory;
        address token;
        string name;
        uint8 decimals;
    }

    event PoolDeployed(address pool);

    Parameters public override parameters;

    function deploy(
        address factory,
        address token,
        uint8 decimals
    ) external returns (address pool) {
        parameters = Parameters({
            factory: factory,
            token: token,
            name: "",
            decimals: decimals
        });
        pool = address(
            new ALP{salt: keccak256(abi.encode(token))}(
                IFactory(factory).resolver()
            )
        );
        ALP(pool).transferOwnership(msg.sender);

        emit PoolDeployed(pool);
        delete parameters;
    }
}
