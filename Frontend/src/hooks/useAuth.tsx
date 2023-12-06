import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { Button } from '@mui/material';
import axios from 'axios';

const apiEndpoint = 'https://localhost:7256/api/messages/protected';

function MyComponent() {
    const [data, setData] = useState('');
    const { instance, accounts } = useMsal();

    const fetchData = () => {
        const request = {
            scopes: ["user.read"], // 必要なスコープを設定
            account: accounts[0]
        };

        instance.acquireTokenSilent(request).then(response => {
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${response.accessToken}`
            }

            fetch(apiEndpoint, {
                    method: "GET",
                    headers: headers

                }).then(response => {
                    // このブロックの中ではPromiseではなくて、通常の値として扱える
                    console.log(response);
                    return response; // returnしてもPromiseに包まれる
                }).catch(error => {
                    console.log(error);
                });


        }).catch(error => {
            console.error(error);
        });
    };

    return <Button onClick={fetchData}>コンテンツ</Button>;
}

export default MyComponent;