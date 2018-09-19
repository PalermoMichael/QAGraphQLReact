import gql from 'graphql-tag';

const addLotToDeviation = gql`
    mutation addLotToDeviation($contents: String, $deviationId: ID) {
        addLotToDeviation(contents: $contents, deviationId: $deviationId) {
            id
            lots {
                id
                contents
            }
        }
    }
`;

export default addLotToDeviation;