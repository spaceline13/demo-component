export const fetchData = () =>{
    return fetch('https://edge-staging.sitecore-staging.cloud/api/graphql/v1', {
        method: 'POST',
        headers: {
            'x-gql-token': 'K0VNcXpkZHZDZTFBYkJWVjl2aFdLeHpBYkxodWVscXN4cXBHbWQ4bEV0TT18aGMtY29tcG9uZW50cy0wY2UxMA==',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: '{\n' +
                'allTestTeaserText {\n' +
                '  results {\n' +
                '          id \n' +
                '          name \n' +
                '          __sysCreatedAt\n' +
                '          title\n' +
                '          subheadline\n' +
                '          description\n' +
                '          buttonLabel\n' +
                '          image1 {\n' +
                '              results{\n' +
                '                  id\n' +
                '                  name\n' +
                '                  fileUrl\n' +
                '                  fileType\n' +
                '              }\n' +
                '          }' +
                '    }\n' +
                '}\n' +
                '}'
        })
    }).then(res=>res.json()).then(res=>({items: res.data.allTestTeaserText.results}))
}