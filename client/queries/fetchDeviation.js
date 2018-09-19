import gql from 'graphql-tag';

const fetchDeviationQuery = gql `
    query fetchDeviationsQuery($id: ID!) {
        deviation(id: $id) {
            id
            title
            client
            owner
            classification
            department
            status
            deviationtype
            occurencedate
            datediscovered
            dateassigned
            lots {
                id
                contents
            }
            description {
                id
                text
            }
        }
    }
`;

export default fetchDeviationQuery;