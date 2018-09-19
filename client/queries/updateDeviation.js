import gql from 'graphql-tag';

const updateDeviation = gql `
    mutation updateDeviation($status: String, $id: ID!) {
        updateDeviation(status: $status, id: $id) {
            id
            status
        }
    }
`;

export default updateDeviation