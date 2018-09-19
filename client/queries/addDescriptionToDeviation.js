import gql from 'graphql-tag';

const addDescriptionToDeviation = gql`
    mutation addDescriptionToDeviation($text: String, $deviationId: ID) {
        addDescriptionToDeviation(text: $text, deviationId: $deviationId) {
            id
            description {
                id
                text
            }
        }
    }
`;

export default addDescriptionToDeviation;