import gql from 'graphql-tag';

const deleteDeviation = gql`
    mutation DeleteDeviation($id: ID) {
        deleteDeviation(id: $id) {
            id
        }
    }
`

export default deleteDeviation;