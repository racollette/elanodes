import React from "react";

export const fetchValidators = async () => {
    // const validators = await fetch("https://elanodes.com/api/node-metrics")
    // const result = await validators.json();
    // return result.result

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "method": "listproducers"
          })
    };

    const validators = await fetch("https://api-testnet.elastos.io/ela", requestOptions)
    const result = await validators.json();

    return result.result.producers
}

export const fetchHeight = async () => {
    const fetchHeight = await fetch("https://blockchain-testnet.elastos.org/api/v1/newblock/")
    const result = await fetchHeight.json();

    return result.height
}