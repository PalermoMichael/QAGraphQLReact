import gql from 'graphql-tag';

const deleteLot = gql `
    mutation DeleteLot($id: ID) {
        deleteLot(id: $id) {            
                id
                contents
            }
        }
`

export default deleteLot;