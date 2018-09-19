//"Dollar Sign, Type, Name, Dollar Sign"
import gql from 'graphql-tag';

const addDeviation = gql `
    mutation addDeviation( $title: String,
                           $client: Int,
                           $owner: String,
                           $classification: String,
                           $department: String,
                           $status: String,
                           $deviationtype: String,
                           $occurencedate: String,
                           $datediscovered: String,
                           $dateassigned: String
                        ){
            addDeviation( title: $title,
                          client: $client,
                          owner: $owner,
                          classification: $classification,
                          department: $department,
                          status: $status,
                          deviationtype: $deviationtype,
                          occurencedate: $occurencedate,
                          datediscovered: $datediscovered,
                          dateassigned: $dateassigned
                        ){
                          title
                          client
                          owner
                          classification
                          department
                          status
                          deviationtype
                          occurencedate
                          datediscovered,
                          dateassigned
                        }
                    }`;

export default addDeviation;